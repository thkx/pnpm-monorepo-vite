## @pnpm-monorepo-vite/utils

## Usage

```typescript
import { isArray } from "@pnpm-monorepo-vite/utils";

isArray([1, 2]); // true
```

## API

```typescript
declare const isArray: (arg: unknown) => boolean;
declare const isHttp: (url: string | string[]) => boolean;
declare const isString: (str: unknown) => boolean;
declare const isExternal: (path: string) => boolean;
declare const isUrl: (url: string) => boolean;
declare const isUrlPort: (url: string) => boolean;
declare const isDomain: (domain: string) => boolean;
declare const isVersion: (version: string) => boolean;
declare const is24H: (time: string) => boolean;
declare const isPhoneNumber: (str: string) => boolean;
declare const isChineseIdCard: (str: string) => boolean;
declare const isEmail: (email: string) => boolean;
declare const isMAC: (mac: string) => boolean;
declare const isIPv4: (ip: string) => boolean;
```
