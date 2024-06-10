export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError'
  }
}

export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string){
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string){
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class UnprocessableEntityError extends Error {
  constructor(message: string){
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}