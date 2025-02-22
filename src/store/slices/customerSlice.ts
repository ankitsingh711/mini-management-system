import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    paymentStatus: 'all' | 'pending' | 'completed';
    sortBy: 'name' | 'dueDate' | 'amount';
    sortOrder: 'asc' | 'desc';
  };
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    paymentStatus: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  },
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<CustomerState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setLoading,
  setError,
  setFilters,
} = customerSlice.actions;

export default customerSlice.reducer;