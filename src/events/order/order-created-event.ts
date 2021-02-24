import { Subjects } from "../subjects";

export interface OrderCreatedEvent{
	subject: Subjects.OrderCreated

	data: {
		id: string,
		products: Array<{id: string, quantity: number}>,
		userId: string
	}
}