import type { TableColumnsType } from 'ant-design-vue';

export type ProColumnItem<T = any> = ({
    name: string;
    dataIndex: string;
    key: string
    tip?: string;
    rules?: { [key: string]: any }[];
    valueEnum?: { [key: string]: any };
} & T) | TableColumnsType;

