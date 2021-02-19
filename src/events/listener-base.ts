import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event{
	subject: Subjects;
	data: any
}

export default abstract class Listener<T extends Event>{

	abstract subject: T["subject"];
	abstract queueGroupName: string;
	abstract onMessage(data: T["data"], msg: Message): void;

	protected ackWait = 5000;

	private client: Stan;

	constructor(stan: Stan){
		this.client = stan;
	}

	subscriptionOptions(){
		return this.client
		.subscriptionOptions()
		.setManualAckMode(true)
		.setAckWait(this.ackWait)
		.setDeliverAllAvailable()
		.setDurableName(this.queueGroupName)
	}

	listen(){

		const subscription = this.client.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		)

		subscription.on('message', (msg: Message) => {
			console.log(
				`Message recieved at ${this.subject} / ${this.queueGroupName}`
				)
			const parsedMsg = this.parseMsg(msg)
			this.onMessage(parsedMsg, msg);
		})
	}

	parseMsg(msg: Message){
		try{
			const data = msg.getData()
			return JSON.parse(data.toString());
		}
		catch(err){
			console.error(err)
		}
	}

}
