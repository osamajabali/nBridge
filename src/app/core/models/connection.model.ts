export class DbConnectionDetail {
  variableName: string;
  variableValue: string;
  description: string;
}

export class Connection {
  id: string;
  connectionName: string;
  description: string;
  adapterName: string;
  clientName: string;
  adapterId: string;
  clientId: string;
  userId : string;
  dbConnectionDetail: DbConnectionDetail[] = [];
}
