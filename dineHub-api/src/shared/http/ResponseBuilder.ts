import { injectable } from "inversify";
import { IResponseBuilder, SuccessResponse, ErrorResponse } from "./IResponseBuilder";

@injectable()
export class ResponseBuilder implements IResponseBuilder {
  public success<T>(data: T, message: string, statusCode: number = 200): SuccessResponse<T> {
    return {
      statusCode,
      body: { success: true, message, data },
    };
  }

  public error(message: string, code: string, statusCode: number = 500): ErrorResponse {
    return {
      statusCode,
      body: { success: false, message, error: { code, message } },
    };
  }
}
