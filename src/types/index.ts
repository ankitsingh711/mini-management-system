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
  paymentDueDate: string;
  paymentStatus: 'pending' | 'completed' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'payment_received' | 'payment_overdue' | 'new_customer';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}