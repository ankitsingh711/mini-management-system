import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  contact: string;
  outstandingPayment: number;
  paymentDueDate: Date;
  paymentStatus: 'pending' | 'completed';
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  outstandingPayment: { type: Number, required: true },
  paymentDueDate: { type: Date, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

export const Customer = model<ICustomer>('Customer', CustomerSchema);