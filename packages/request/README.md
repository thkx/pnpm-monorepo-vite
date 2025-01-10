## @pnpm-monorepo-vite/request

## Usage

```typescript
import { message } from "ant-design-vue";
import server, { useMessage } from "@pnpm-monorepo-vite/request";

useMessage(message)

const { request, cancelAllRequest, cancelRequest } = server({ baseURL: import.meta.env.BASE_URL, })
```

