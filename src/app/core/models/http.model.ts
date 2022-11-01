export interface CustomHttpError {
  message: string;
}

export interface ClientError extends CustomHttpError {
  statusCode: `4${number}${number}`;
}

export interface ServerError extends CustomHttpError {
  statusCode: `5${number}${number}`;
}
