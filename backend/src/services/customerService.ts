import ElasticClient from "../config/db";

export interface Customer {
  id?: string;
  name: string;
  contact: string;
  outstandingPayment: number;
  dueDate: string;
  status: "pending" | "completed";
}

export const addCustomerService = async (customerData: Customer): Promise<void> => {
  await ElasticClient.index({
    index: "customers",
    document: customerData,
  });
};

export const getCustomersService = async (query?: object): Promise<Customer[]> => {
  const result = await ElasticClient.search<Customer>({
    index: "customers",
    query: query || { match_all: {} },
  });
  return result.hits.hits.map((hit) => hit._source as Customer);
};

export const updateCustomer = async (
  id: string,
  updateData: Partial<Customer>
): Promise<void> => {
  await ElasticClient.update({
    index: "customers",
    id,
    doc: updateData,
  });
};
