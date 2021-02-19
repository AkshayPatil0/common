import { Subjects } from "./subjects";

export interface ProductCreatedEvent{
	subject: Subjects.ProductCreated;
	data: {
		id: string,
		title: string,
		price: string,
		vendor: any
	}
}
