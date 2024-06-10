import { Request, Response, NextFunction } from "express";
import { BusinessError, NotFoundError, UnauthorizedError } from "../Helpers/Errors";
import { HttpStatusCode } from "../Helpers/HttpStatusCode";

export const errorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction) => {
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

  if (error instanceof NotFoundError) statusCode = HttpStatusCode.NOT_FOUND;

  if (error instanceof UnauthorizedError) statusCode = HttpStatusCode.UNATHORIZED;

  if (error instanceof BusinessError) statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY;

  return res
    .status(statusCode)
    .json(responseErrorFormatter(error));
}

export function responseErrorFormatter(error: Error) {
  return {
    name: error.name,
    message: error.message
  }
}