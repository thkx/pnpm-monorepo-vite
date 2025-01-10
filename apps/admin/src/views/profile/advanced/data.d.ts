export type AdvancedOperation = {
    key: string;
    type: string;
    name: string;
    status: string;
    updatedAt: string;
    memo: string;
};

export interface AdvancedProfileData {
    advancedOperation1?: AdvancedOperation[];
    advancedOperation2?: AdvancedOperation[];
    advancedOperation3?: AdvancedOperation[];
}
