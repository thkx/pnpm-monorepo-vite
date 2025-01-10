
// class StorageProxy {
//     constructor(storage, config = {}) {
//         if (StorageProxy.instance) {
//             return StorageProxy.instance
//         }

//         this.storage = storage
//         this.config = config

//         // 保存原始方法
//         this.originalSetItem = storage.setItem;
//         this.originalGetItem = storage.getItem;

//         // 提供默认的钩子函数
//         this.beforeSetItem = config.beforeSetItem || ((key, value) => [key, value])
//         this.afterGetItem = config.afterGetItem || ((key, value) => value)

//         // 初始化代理方法
//         this.proxyMethods()

//         // 缓存当前实例
//         StorageProxy.instance = this
//     }

//     proxyMethods() {
//         const { storage, beforeSetItem, afterGetItem, originalGetItem, originalSetItem } = this

//         storage.setItem = function (key, value) {
//             const [newKey, newValue] = beforeSetItem(key, value) || [key, value]
//             if (newKey !== undefined && newValue !== undefined) {
//                 originalSetItem.call(this, newKey, newValue)
//             }
//         }

//         storage.getItem = function (key) {
//             const originalValue = originalGetItem.call(this, key)
//             return afterGetItem(key, originalValue)
//         }
//     }

//     unProxy() {
//         const { storage, originalGetItem, originalSetItem } = this
//         storage.setItem = originalSetItem
//         storage.getItem = originalGetItem
//     }

//     static getInstance(storage, config = {}) {
//         if (!StorageProxy.instance) {
//             new StorageProxy(storage, config)
//         }

//         return StorageProxy.instance
//     }
// }

import type { StorageLike } from './type'

interface StorageConfig {
    beforeSetItem?: (key: string, value: unknown) => [string, unknown] | void;
    afterGetItem?: <T>(key: string, value: string | null) => T | null;
    ttl?: number; // 可选的全局过期时间（单位：毫秒）
    autoCleanInterval?: number; // 自动清理过期缓存的时间间隔（单位：毫秒）
}

interface StorageItem<T> {
    value: T;
    expiresAt: number | null; // 过期时间
    updatedAt: number; // 缓存更新时间
}

class StorageProxy<T extends StorageLike> {
    private _storage!: T;
    // private config!: StorageConfig;
    private originalSetItem!: (key: string, value: string) => void;
    private originalGetItem!: (key: string) => string | null;
    private originalRemoveItem!: (key: string) => void;
    private originalClear!: () => void;
    private ttl!: number;  // 默认过期时间
    private autoCleanInterval: number | undefined; // 自动清理的时间间隔
    private cleanIntervalId: NodeJS.Timeout | number | null = null; // 定时器 ID 用于清理过期缓存项

    private beforeSetItem!: (key: string, value: unknown) => [string, unknown] | void;
    private afterGetItem!: <T>(key: string, value: string | null) => T | null;

    // 静态变量保存唯一实例
    private static instance: StorageProxy<StorageLike> | null = null;

    get storage() {
        return this._storage
    }

    constructor(storage: T, config: StorageConfig = {}) {
        if (StorageProxy.instance) {
            return StorageProxy.instance as StorageProxy<T>;
        }

        // 在构造函数中初始化所有私有属性
        this._storage = storage;
        // this.config = config;

        // 保存原始方法
        this.originalSetItem = storage.setItem.bind(storage);
        this.originalGetItem = storage.getItem.bind(storage);
        this.originalRemoveItem = storage.removeItem.bind(storage);
        this.originalClear = storage.clear.bind(storage);

        // 提供默认的钩子函数
        this.beforeSetItem = config.beforeSetItem || ((key, value) => [key, value]);
        this.afterGetItem = (config.afterGetItem || ((_key, value) => value)) as <T>(key: string, value: string | null) => T | null;

        // 初始化过期时间和自动清理间隔
        this.ttl = config.ttl || 0;  // 全局过期时间
        this.autoCleanInterval = config.autoCleanInterval;

        // 初始化代理方法
        this.proxyMethods();

        // 自动清理过期缓存项（如果配置了定时器）
        if (this.autoCleanInterval) {
            this.startAutoClean();
        }

        // 缓存当前实例
        StorageProxy.instance = this;
    }

    private proxyMethods() {
        const { _storage, beforeSetItem, afterGetItem } = this;

        // 代理 setItem 方法
        _storage.setItem = (key: string, value: unknown, ttl: number = this.ttl): void => {
            const [newKey, newValue] = beforeSetItem(key, value) || [key, value];
            if (newKey !== undefined && newValue !== undefined) {
                const expiresAt = ttl > 0 ? Date.now() + ttl : null; // 如果 ttl 大于 0，则计算过期时间
                const item: StorageItem<unknown> = { value: newValue, expiresAt, updatedAt: Date.now() };
                this.originalSetItem(newKey, this.serialize(item));
            }
        };

        // 代理 getItem 方法
        _storage.getItem = <T>(key: string): T | null => {
            const originalValue = this.originalGetItem(key);
            const item = originalValue ? this.deserialize<StorageItem<T>>(originalValue) : null;

            if (item) {
                if (item.expiresAt && Date.now() > item.expiresAt) {
                    this.removeItem(key);  // 如果过期，则删除该项
                    return null;
                }

                // 如果过期，将更新缓存的过期时间（可以选择覆盖过期时间）
                if (item.expiresAt && item.updatedAt < Date.now() - this.ttl) {
                    const updatedItem: StorageItem<T> = { ...item, expiresAt: Date.now() + this.ttl, updatedAt: Date.now() };
                    this.originalSetItem(key, this.serialize(updatedItem)); // 更新存储项
                }

                return afterGetItem(key, item.value as any);
            }
            return null;
        };

        // 代理 removeItem 方法
        _storage.removeItem = (key: string): void => {
            this.originalRemoveItem(key);
        };

        // 代理 clear 方法
        _storage.clear = (): void => {
            this.originalClear();
        };
    }

    // 序列化数据（如果是对象或数组，则转换为 JSON 字符串）
    private serialize(value: unknown): string {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return String(value);
    }

    // 反序列化存储的数据（如果数据是有效的 JSON 字符串，则将其解析为对象或数组）
    private deserialize<T>(value: string): T {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value as unknown as T;  // 如果解析失败，则返回原始字符串
        }
    }

    // 获取当前实例
    static getInstance<T extends StorageLike>(storage: T, config: StorageConfig = {}): StorageProxy<T> {
        if (!StorageProxy.instance) {
            StorageProxy.instance = new StorageProxy(storage, config);
        }
        return StorageProxy.instance as StorageProxy<T>;
    }

    // 卸载代理，恢复原始方法
    unProxy() {
        const { _storage } = this;
        _storage.setItem = this.originalSetItem;
        _storage.getItem = this.originalGetItem;
        _storage.removeItem = this.originalRemoveItem;
        _storage.clear = this.originalClear;
        if (this.cleanIntervalId) {
            clearInterval(this.cleanIntervalId as number);
        }
    }

    // 清理过期的缓存项
    private clearExpiredItems(): void {
        for (const key in this._storage) {
            const value = this.originalGetItem(key);
            if (value) {
                const item = this.deserialize<StorageItem<unknown>>(value);
                if (item.expiresAt && Date.now() > item.expiresAt) {
                    this.removeItem(key); // 删除过期的项
                }
            }
        }
    }

    // 定时自动清理过期项
    private startAutoClean(): void {
        this.cleanIntervalId = setInterval(() => {
            this.clearExpiredItems(); // 定时清理过期的项
        }, this.autoCleanInterval);
    }

    // 删除指定项
    private removeItem(key: string): void {
        this.originalRemoveItem(key);
    }

    // 获取缓存统计信息
    getCacheStats() {
        let totalItems = 0;
        let expiredItems = 0;

        for (const key in this.storage) {
            const value = this.originalGetItem(key);
            if (value) {
                totalItems++;
                const item = this.deserialize<StorageItem<unknown>>(value);
                if (item.expiresAt && Date.now() > item.expiresAt) {
                    expiredItems++;
                }
            }
        }

        return {
            totalItems,
            expiredItems,
            activeItems: totalItems - expiredItems,
        };
    }
}



// class MyStorage implements StorageLike {
//     private store: Record<string, any> = {};

//     setItem(key: string, value: any): void {
//         this.store[key] = value;
//     }

//     getItem<T = any>(key: string): T {
//         return this.store[key] || null;
//     }

//     removeItem(key: string): void {
//         delete this.store[key];
//     }

//     clear(): void {
//         this.store = {};  // 清空所有存储项
//     }
// }

// // 创建自定义存储对象
// const myStorage = new MyStorage();

// // 创建 StorageProxy 实例
// const proxy = StorageProxy.getInstance(myStorage, {
//     dataTimeout: 5000,  // 设置数据超时为5秒
// });

// // 存储一个对象
// const user = { name: 'Alice', age: 30 };
// proxy.storage.setItem('user', user);

// // 获取数据并指定类型
// const storedUser = proxy.storage.getItem<{ name: string; age: number }>('user');
// console.log(storedUser);  // 输出：{ name: 'Alice', age: 30 }

// // 等待数据超时
// setTimeout(() => {
//     const expiredUser = proxy.storage.getItem<{ name: string; age: number }>('user');
//     console.log(expiredUser);  // 输出：null（数据已过期）
// }, 6000);

export { StorageLike }

export default StorageProxy


