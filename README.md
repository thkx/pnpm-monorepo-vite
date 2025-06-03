# pnpm-monorepo-vite

由 `pnpm` + `TypeScript` + `Vite` 通过 `pnpm-workspace` 实现 `monorepo`

## 指定项目安装
```bash
pnpm i xxx --filter aaa
```

## 全局共享安装三分库
```bash
pnpm i @pnpm-monorepo-vite/xxx --workspace -w # (@pnpm-monorepo-vite/xxx 为对应 package.json name 的值)

pnpm add xxx -w # (xxx 表示三方库)
```

## 全局共享 `packages` 中的自定义库
```bash
# 自动
pnpm i @pnpm-monorepo-vite/xxx --workspace -w

# 手动
1. 在根目录下 package.json 的 "dependencies": {} 中增加 "@pnpm-monorepo-vite/xxx": "workspace:^"
2. 在根目录执行 pnpm i
```

## `pnpm` 创建 `apps`
```bash
# 创建 React + typescript 项目
pnpm create vite --template react-ts apps/react

# 创建 Vue + typescript 项目
pnpm create vite --template vue-ts apps/view
```

## `pnpm` 创建 `packages`
```bash
pnpm create ts /packages/xxx
```

## 🚀 开发

```bash
# 配置
1. node 版本 16+
2. pnpm 版本 8.x

# 进入项目目录
cd pnpm-monorepo-vite

# 安装依赖
pnpm i

# 构建packages插件
pnpm build:packages

# 安装插件到全局
pnpm i

# 启动服务
pnpm app:admin
```

## 📦️ 多环境打包

```bash
# 构建预发布环境
pnpm app:admin:build # (或者 pnpm app:xxx:build)

# 构建正式环境
pnpm app:admin:build # (或者 pnpm app:xxx:build)
```


## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中