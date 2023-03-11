import { ApiError } from "@shared/exceptions/api-error";
import express from "express";
import { validationResult } from "express-validator";

interface IBaseDto {
	validate: () => any[];
	from?: (...args: any) => any;
}

interface IOptions {
	withParams?: boolean;
	errorMessage?: string;
}

export const requestMiddleware = <D extends IBaseDto>(dto: D, options?: IOptions) => {
	const middlewares = [...dto.validate(), handleErrorsMiddleware(options?.errorMessage)];

	if ("from" in dto) {
		middlewares.push(requestDataToDtoMiddleware(dto as Required<IBaseDto>, options?.withParams));
	}

	return middlewares;
};

function handleErrorsMiddleware(errorMessage = "") {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(ApiError.BadRequest(errorMessage || "Непредвиденная ошибка", errors.array()));
		} else {
			next();
		}
	};
}

function requestDataToDtoMiddleware<D extends Required<IBaseDto>>(dto: D, withParams = false) {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (withParams) {
			req.body = {
				...req.body,
				...req.params,
			};
		}

		req.body = dto.from(req.body);

		next();
	};
}
