export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    outstandingAmount: number;
    dueDate: string;
    paymentStatus: 'pending' | 'completed';
    createdAt: string;
  }
  
  export interface Notification {
    id: string;
    type: 'payment_received' | 'payment_overdue' | 'customer_added';
    message: string;
    createdAt: string;
    read: boolean;
  }