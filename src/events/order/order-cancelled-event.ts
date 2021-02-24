import { Subjects } from "../subjects";

export interface OrderCancelledEvent{
	subject: Subjects.OrderCancelled

	data: {
		id: string,
		products: Array<{id: string, quantity: number}>,
		userId: string
	}
}