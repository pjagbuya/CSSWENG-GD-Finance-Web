import { z } from 'zod';

export const UserSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email.',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please enter your password.',
    })
    .min(6, `Password must be at least 6 characters`),
  first_name: z
    .string({
      required_error: 'Please enter your first name.',
    })
    .min(1, `Please enter your first name.`),
  last_name: z
    .string({
      required_error: 'Please enter your last name.',
    })
    .min(1, `Please enter your last name.`),
  role: z.enum(['chief', 'member']),
});

export const UserSchemaEdit = UserSchema.omit({ password: true }).extend({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

export type userType = z.infer<typeof UserSchema>;

export const PaymentSchema = z.object({
  payment_id: z.string({
    required_error: 'Please enter Payment ID.',
  }),
  payment_date: z.string({
    required_error: 'Please enter Payment date.',
  }),
  payment_detail: z.string({
    required_error: 'Please enter Payment detail.',
  }),
});

export const ItemListSchema = z.object({
  item_list_id: z.string({
    required_error: 'Please enter Item list ID.',
  }),
  item_list_type: z.enum(['revenue', 'expense']),
  item_list_name: z.string({
    required_error: 'Please enter Item list name.',
  }),
});

export const ItemSchema = z.object({
  item_id: z.string({
    required_error: 'Please enter Item ID.',
  }),
  item_name: z.string({
    required_error: 'Please enter Item name.',
  }),
  item_price: z.string({
    required_error: 'Please enter Item price.',
  }),
  item_amount: z.number().int({
    message: 'Item amount must be a valid integer.',
  }),
  item_note: z.string({
    required_error: 'Please enter Item note.',
  }),
  item_list_id: z.string({
    required_error: 'Please enter Item list ID.',
  }),
  payment_id: z.string({
    required_error: 'Please enter Payment ID.',
  }),
});

export const TransactionListSchema = z.object({
  transaction_list_id: z.string({
    required_error: 'Please enter Transaction list ID.',
  }),
  transaction_list_type: z.enum(['transaction', 'date']),
  transaction_list_name: z.string({
    required_error: 'Please enter Transaction list name.',
  }),
});

export const TransactionSchema = z.object({
  transaction_id: z.string({
    required_error: 'Please enter Transaction ID.',
  }),
  item_id: z.number().int(),
  contact_no: z.number().int(),
  transaction_list_id: z.string({
    required_error: 'Please enter Transaction list ID.',
  }),
});

export const TransactionDateSchema = z.object({
  transaction_date_id: z.string({
    required_error: 'Please enter Transaction date ID.',
  }),
  transaction_note: z.string({
    required_error: 'Please enter Transaction note.',
  }),
  transaction_list_id: z.string({
    required_error: 'Please enter Transaction list ID.',
  }),
});

export const TransactionDetailsSchema = z.object({
  td_id: z.string({
    required_error: 'Please enter Transaction details ID.',
  }),
  transaction_amount: z.number().int({
    message: 'Transaction amount must be a valid integer.',
  }),
  transaction_from_list_id: z.string({
    required_error: 'Please enter Transaction from list ID.',
  }),
  transaction_to_list_id: z.string({
    required_error: 'Please enter Transaction to list ID.',
  }),
  transaction_date_list_id: z.string({
    required_error: 'Please enter Transaction date list ID.',
  }),
});

export const StaffSchema = z.object({
  staff_id: z.string({
    required_error: 'Please enter Staff ID.',
  }),
  staff_name: z.string({
    required_error: 'Please enter Staff name.',
  }),
  staff_position: z.string({
    required_error: 'Please enter Staff position.',
  }),
  staff_list_id: z.string({
    required_error: 'Please enter Staff list ID.',
  }),
});

export const FormListSchema = z.object({
  form_list_id: z.string({
    required_error: 'Please enter Form list ID.',
  }),
  form_list_type: z.enum(['FT', 'RS', 'ES', 'AI']),
  form_list_name: z.string({
    required_error: 'Please enter Form list name.',
  }),
});

export const ActivityIncomeSchema = z.object({
  ai_id: z.string({
    required_error: 'Please enter Activity Income ID.',
  }),
  ai_name: z.string({
    required_error: 'Please enter Activity Income name.',
  }),
  ai_date: z.string({
    required_error: 'Please enter Activity Income date.',
  }),
  revenue_list_id: z.string({
    required_error: 'Please enter Revenue list ID.',
  }),
  expense_list_id: z.string({
    required_error: 'Please enter Expense list ID.',
  }),
  prepared_staff_id: z.string({
    required_error: 'Please enter Prepared staff ID.',
  }),
  certified_staff_id: z.string({
    required_error: 'Please enter Certified staff ID.',
  }),
  noted_staff_id: z.string({
    required_error: 'Please enter Noted staff ID.',
  }),
});

export const ExpenseStatementSchema = z.object({
  id: z.string({
    required_error: 'Please enter Expense statement ID.',
  }),
  es_name: z.string({
    required_error: 'Please enter Expense statement name.',
  }),
  es_date: z.string({
    required_error: 'Please enter Expense statement date.',
  }),
  expense_list_id: z.string({
    required_error: 'Please enter Expense list ID.',
  }),
  receipt_link: z.string({
    required_error: 'Please enter Receipt link.',
  }),
  td_id: z.string({
    required_error: 'Please enter TD ID.',
  }),
  es_notes: z.string({
    required_error: 'Please enter ES notes.',
  }),
  prepared_staff_id: z.string({
    required_error: 'Please enter Prepared staff ID.',
  }),
  certified_staff_id: z.string({
    required_error: 'Please enter Certified staff ID.',
  }),
  noted_staff_id: z.string({
    required_error: 'Please enter Noted staff ID.',
  }),
});

export const CreateExpenseFormSchema = z.object({
  es_name: z
    .string({
      required_error: 'Please enter expense statement name.',
    })
    .min(1),
  es_category: z
    .string({
      required_error: 'Please enter expense statement category.',
    })
    .min(1),
});

export const EditExpenseFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  transferred_to: z
    .string({ required_error: 'Transferred To is required.' })
    .min(1),
  transferred_on: z
    .string({
      required_error: 'Transferred On is required and must be a valid date.',
    })
    .date(),
  notes: z.string(),
  prepared_by: z.string({ required_error: 'Prepared By is required.' }).min(1),
});

export const RevenueStatementSchema = z.object({
  rs_id: z.string({
    required_error: 'Please enter Revenue statement ID.',
  }),
  rs_name: z.string({
    required_error: 'Please enter Revenue statement name.',
  }),
  rs_date: z.string({
    required_error: 'Please enter Revenue statement date.',
  }),
  revenue_list_id: z.string({
    required_error: 'Please enter Revenue list ID.',
  }),
  receipt_link: z.string({
    required_error: 'Please enter Receipt link.',
  }),
  td_id: z.string({
    required_error: 'Please enter TD ID.',
  }),
  rs_notes: z.string({
    required_error: 'Please enter RS notes.',
  }),
  prepared_staff_id: z.string({
    required_error: 'Please enter Prepared staff ID.',
  }),
  certified_staff_id: z.string({
    required_error: 'Please enter Certified staff ID.',
  }),
  noted_staff_id: z.string({
    required_error: 'Please enter Noted staff ID.',
  }),
});

export const CreateRevenueFormSchema = z.object({
  rs_name: z
    .string({
      required_error: 'Please enter expense statement name.',
    })
    .min(1),
  rs_category: z
    .string({
      required_error: 'Please enter expense statement category.',
    })
    .min(1),
});

export const FundTransferSchema = z.object({
  ft_id: z.string({
    required_error: 'Please enter Fund transfer ID.',
  }),
  ft_name: z.string({
    required_error: 'Please enter Fund transfer name.',
  }),
  ft_date: z.string({
    required_error: 'Please enter Fund transfer date.',
  }),
  ft_reason: z.string({
    required_error: 'Please enter Fund transfer reason.',
  }),
  receipt_link: z.string({
    required_error: 'Please enter Receipt link.',
  }),
  td_id: z.string({
    required_error: 'Please enter TD ID.',
  }),
  prepared_staff_id: z.string({
    required_error: 'Please enter Prepared staff ID.',
  }),
  certified_staff_id: z.string({
    required_error: 'Please enter Certified staff ID.',
  }),
  noted_staff_id: z.string({
    required_error: 'Please enter Noted staff ID.',
  }),
});

export const GdscEventSchema = z.object({
  event_id: z.string({
    required_error: 'Please enter Event ID.',
  }),
  event_name: z.string({
    required_error: 'Please enter Event name.',
  }),
  ft_form_list_id: z.string({
    required_error: 'Please enter FT Form list ID.',
  }),
  rs_form_list_id: z.string({
    required_error: 'Please enter RS Form list ID.',
  }),
  es_form_list_id: z.string({
    required_error: 'Please enter ES Form list ID.',
  }),
  ai_form_list_id: z.string({
    required_error: 'Please enter AI Form list ID.',
  }),
});

export const EventSchema = z.object({
  event_name: z
    .string({
      required_error: 'Please enter an event name.',
    })
    .min(1),
});

export const varSchema = z.object({
  var: z.string({
    required_error: 'Please enter an var.',
  }),
});

export const AddCategoryFormSchema = z.object({
  category_name: z
    .string({
      required_error: 'Please enter a category name.',
    })
    .min(1),
});

export const AddExpenseFormSchema = z.object({
  date: z.string({ required_error: 'Please enter a date.' }).date(),
  item_name: z
    .string({
      required_error: 'Please enter an item name.',
    })
    .min(1),
  category: z.string({ required_error: 'Please enter a category.' }).min(1),
  unit_count: z
    .number({
      required_error: 'Please enter a unit count.',
    })
    .int()
    .min(1),
  unit_price: z.number({ required_error: 'Please enter a unit price.' }).min(1),
  acc_to: z
    .string({
      required_error: 'Please enter the account transferred to.',
    })
    .min(1),
});

export const AddRevenueFormSchema = z.object({
  date: z.string({ required_error: 'Please enter a date.' }).date(),
  acc_from: z
    .string({
      required_error: 'Please enter the account received from.',
    })
    .min(1),
  acc_to: z
    .string({
      required_error: 'Please enter the account transferred to.',
    })
    .min(1),
  category: z.string({ required_error: 'Please enter a category.' }).min(1),
  amount: z.coerce.number({ required_error: 'Please enter an amount.' }).min(1),
});

export const UpdateExpenseFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  notes: z.string(),
});

export const UpdateRevenueFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  notes: z.string(),
});

export const LoginForm = UserSchema.pick({ email: true, password: true });
