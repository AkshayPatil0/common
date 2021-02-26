import { Subjects } from "../subjects";

export interface ProductUpdatedEvent{
	subject: Subjects.ProductUpdated;
	data: {
		id: string,
		title: string,
		price: number,
		vendor: any,
		stock: number,
		version: number
	}
}
