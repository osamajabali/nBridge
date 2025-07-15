export class AdapterResponse {
    name: string;
    description: string;
    adapterTypeId: string;
    externalConnection: string;
    id: string;
    adapterType: AdapterType;
}
export class AdapterType {
    id: string;
    name: string;
    description: string;
    adapters: any[];
    userId: string;
    adapterTypeId: string;
}

export class AdapterPayload {
    name: string;
    description: string;
    adapterTypeId: string;
}