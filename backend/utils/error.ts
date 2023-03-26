export class CustomError extends Error {
  status = 400
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export const createError = (status: any, message: any) => {
  return new CustomError(status, message)
}
