export interface TableFormDateType {
    key: string;
    workId?: string;
    name?: string;
    department?: string;
    isNew?: boolean;
    editable?: boolean;
}

export type InternalNamePath = string[];

export interface ErrorField {
    name: InternalNamePath;
    errors: string[];
}

export type Params = {
    name?: string;
    url?: string;
    owner?: string;
    approver?: string;
    dateRange?: string;
    type?: string;
    name2?: string;
    url2?: string;
    owner2?: string;
    approver2?: string;
    dateRange2?: string;
    type2?: string;
    members: TableFormDateType[];
}

export type Key = keyof Omit<Params, 'members'>;
