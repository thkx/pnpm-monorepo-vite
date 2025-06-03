import StorageProxy, { StorageLike } from "../index";

class MyStorage implements StorageLike {
    private store: Record<string, any> = {};

    setItem(key: string, value: any): void {
        this.store[key] = value;
    }

    getItem<T = any>(key: string): T {
        return this.store[key] || null;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};  // 清空所有存储项
    }
}

// 创建自定义存储对象
const myStorage = new MyStorage();

// 创建 StorageProxy 实例
const proxy = StorageProxy.getInstance(myStorage, {
    ttl: 5000,  // 设置数据超时为5秒
});

// 存储一个对象
const user = { name: 'Alice', age: 30 };
proxy.storage.setItem('user', user);

// 获取数据并指定类型
const storedUser = proxy.storage.getItem<{ name: string; age: number }>('user');
console.log(storedUser);  // 输出：{ name: 'Alice', age: 30 }

// 等待数据超时
setTimeout(() => {
    const expiredUser = proxy.storage.getItem<{ name: string; age: number }>('user');
    console.log(expiredUser);  // 输出：null（数据已过期）
}, 6000);

// describe("sum", () => {
//     test("exports", () => {
//         expect(sum).toBeTruthy();
//     });
//     test("works", () => {
//         expect(sum(1, 2)).toEqual(3);
//     });
// });
