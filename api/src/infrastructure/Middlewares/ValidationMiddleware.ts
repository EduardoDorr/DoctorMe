import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { UnauthorizedError } from "../Helpers/Errors";
import { HttpStatusCode } from "../Helpers/HttpStatusCode";
import {responseErrorFormatter} from "../Middlewares/ErrorHandlingMiddleware";
import { decodeFromBase64 } from "../Helpers/SecurityHelper";

export function validateBody(schema: ObjectSchema) {
  return validatePayload(schema, "body");
}

export function validateParams(schema: ObjectSchema) {
  return validatePayload(schema, "params");
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    const error = new UnauthorizedError("Missing authorization header");

    return res
      .status(HttpStatusCode.UNATHORIZED)
      .json(responseErrorFormatter(error));
  }

  const token = req.headers.authorization.split(' ')[1];
  const user: any = decodeFromBase64(token);

  if (!user) {
    const error = new UnauthorizedError("Invalid token");

    return res
      .status(HttpStatusCode.UNATHORIZED)
      .json(responseErrorFormatter(error));
  }

  next();
}

function validatePayload(schema: any, key: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[key]);

    if (error) {
      const message = "Invalid payload";

      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message, error: error.message });
    }

    next();
  }
}