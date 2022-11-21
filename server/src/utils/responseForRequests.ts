import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export const responseForRequests = (result: any, res: Response) => {
    if (typeof result === 'string') {
        return res.json({ message: result });
    }

    const responseError = {
        message: result.message,
        property: result.property,
        statusCode: HttpStatus.BAD_REQUEST
    }
    return res.status(HttpStatus.BAD_REQUEST).json(responseError);
}