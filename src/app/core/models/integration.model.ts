export class IntegrationOperation {
  integrationId!: string;
  integration: any;
  operation: any;
  id!: string;
  operationId: string;
  isSelected: boolean = false;
}

export class Integration {
  name!: string;
  description!: string;
  clientId!: string;
  client: {
    name: string,
    description: string,
    createdAt: string,
    externalConnection: null,
    id: string,
    userId: string
  };
  integrationOperations!: IntegrationOperation[];
  id!: string;
  integrationId!: string;
}

export class OperationRequest {
  operationId: string;
  clientId: string;
  adapterId: string;
  parameters: Parameters;
}

export class Parameters {
  fromDate: string;
  toDate: string;
}

export class ExceutionStatus {
  isSuccess: boolean;
  isFailure: boolean;
  value: string;
  errors: string;
}

export class IntegrationRequest {
  name: string;
  description: string;
  clientId: string;
  operationIds: string[];
  userId : string;
  integrationId : string
};

export class Operation {
  name!: string;
  description!: string;
  endpoint!: string;
  requiredParams!: string;
  integrationOperations: any | null = null;
  id!: string;
}