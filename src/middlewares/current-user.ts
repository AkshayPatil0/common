import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRoles } from "../prototypes";

interface UserPayload{
	email: string,
	id: string,
	role: UserRoles
}

declare global{
	namespace Express{
		interface Request{
			currentUser?: UserPayload
		}
	}
}

export function currentUser(req: Request, res: Response, next: NextFunction){

	if (!req.session?.jwt){
		return next();
	}

	try{
		const userPayload = (jwt.verify(req.session.jwt, process.env.JWT_KEY!)) as UserPayload
		req.currentUser = userPayload
	} catch(err){}
	
	next()
}