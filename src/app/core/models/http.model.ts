type Decimal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface CustomHttpError {
  message: string;
  statusCode: `${Decimal}${Decimal}${Decimal}`;
  readonly type: 'custom';
}

export interface ClientError extends CustomHttpError {
  statusCode: `4${Decimal}${Decimal}`;
}

export interface ServerError extends CustomHttpError {
  statusCode: `5${Decimal}${Decimal}`;
}

export interface Errors {
  unAuthorized?: boolean;
  notFound?: boolean;
  anotherError?: boolean;
  noConnection?: true;
  notExist?: true;
  badRequest?: true;
  isAlreadyExist?: true;
  serverError?: true;
}
