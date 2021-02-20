import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserRoles } from "../prototypes"
import { NextFunction, Request, Response } from "express";

export function authRole(role: UserRoles){
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.currentUser?.role !== role){
			throw new NotAuthorizedError()
		}

		next();
	}
}