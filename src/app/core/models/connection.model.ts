export class Connection {
  connectionName: string;
  description: string | null;
  adapterId: string;
  adapter: Adapter;
  clientId: string;
  client: Client;
  dbConnectionDetail: DbConnectionDetail[];
  id: string;
  userId: string;
}

export class Adapter {
  name: string;
  description: string;
  adapterTypeId: string;
  adapterType: string | null;
  externalConnection: any[];
  id: string;
  userId: string;
}

export class Client {
  name: string;
  description: string;
  createdAt: string;
  externalConnection: any[];
  id: string;
  userId: string;
}

export class DbConnectionDetail {
  variableName: string;
  variableValue: string ='';
  description: string | null;
  dbConnectionId: string;
  dbConnection: any;
  id: string;
  userId: string;
}
