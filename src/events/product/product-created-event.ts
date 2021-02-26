import { Subjects } from "../subjects";

export interface ProductCreatedEvent{
	subject: Subjects.ProductCreated;
	data: {
		id: string,
		title: string,
		price: number,
		vendor: any,
		stock: number,
		version: number
	}
}
