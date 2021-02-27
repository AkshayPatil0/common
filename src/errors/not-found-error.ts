import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {

	statusCode= 404;

	constructor(public src: string) {
		super(`${src} not found`)
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{message: `${this.src} not found`}]
	}
}