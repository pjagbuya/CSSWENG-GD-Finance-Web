import { z } from 'zod';

// Database Schemas //

export const ActivityIncomeSchema = z.object({
  ai_id: z
    .string({
      required_error: 'Please enter Activity Income ID.',
    })
    .min(1),
  ai_name: z
    .string({
      required_error: 'Please enter Activity Income name.',
    })
    .min(1),
  ai_date: z
    .string({
      required_error: 'Please enter Activity Income date.',
    })
    .date(),
  ai_notes: z.string().optional(),
  prepared_staff_id: z
    .string({
      required_error: 'Please enter Prepared staff ID.',
    })
    .min(1),
  certified_staff_id: z
    .string({
      required_error: 'Please enter Certified staff ID.',
    })
    .min(1),
  noted_staff_id: z
    .string({
      required_error: 'Please enter Noted staff ID.',
    })
    .min(1),
  form_list_id: z
    .string({
      required_error: 'Please enter Form list ID.',
    })
    .min(1),
});

export const CategorySchema = z.object({
  category_id: z.string({ required_error: 'Please enter Category ID.' }).min(1),
  category_name: z
    .string({ required_error: 'Please enter Category name.' })
    .min(1),
  category_type: z.enum(['expense', 'revenue']),
  event_id: z.string({ required_error: 'Please enter Event ID.' }).min(1),
  transaction_list_id: z
    .string({ required_error: 'Please enter Transaction list ID.' })
    .min(1),
});


export const StaffSchema = z.object({
  staff_name: z.string({
    required_error: 'Please enter Staff name.',
  }),
  staff_position: z.string({
    required_error: 'Please enter Staff position.',
  }),
  // staff_list_id: z.string({
  //   required_error: 'Please enter Staff list ID.',
  // }),
});

export const ExpenseStatementSchema = z.object({
  es_id: z
    .string({
      required_error: 'Please enter Expense statement ID.',
    })
    .min(1),
  es_name: z
    .string({
      required_error: 'Please enter Expense statement name.',
    })
    .min(1),
  es_date: z
    .string({
      required_error: 'Please enter Expense statement date.',
    })
    .date(),
  receipt_link: z
    .string({
      required_error: 'Please enter Receipt link.',
    })
    .min(1),
  es_to: z
    .string({
      required_error: 'Please enter Expense statement to.',
    })
    .min(1),
  es_from: z
    .string({ required_error: 'Please enter Expense statement from.' })
    .min(1),
  es_notes: z.string().optional(),
  category_id: z
    .string({
      required_error: 'Please enter Category ID.',
    })
    .min(1),
  prepared_staff_id: z
    .string({
      required_error: 'Please enter Prepared staff ID.',
    })
    .min(1),
  certified_staff_id: z
    .string({
      required_error: 'Please enter Certified staff ID.',
    })
    .min(1),
  noted_staff_id: z
    .string({
      required_error: 'Please enter Noted staff ID.',
    })
    .min(1),
  form_list_id: z
    .string({
      required_error: 'Please enter Form list ID.',
    })
    .min(1),
});

export type staffType = z.infer<typeof StaffSchema>;

export const FormListSchema = z.object({
  form_list_id: z
    .string({
      required_error: 'Please enter Form list ID.',
    })
    .min(1),
  form_list_type: z.enum(['FT', 'RS', 'ES', 'AI']),
  form_list_name: z
    .string({
      required_error: 'Please enter Form list name.',
    })
    .min(1),
});

export const FundTransferSchema = z.object({
  ft_id: z
    .string({
      required_error: 'Please enter Fund transfer ID.',
    })
    .min(1),
  ft_name: z
    .string({
      required_error: 'Please enter Fund transfer name.',
    })
    .min(1),
  ft_date: z
    .string({
      required_error: 'Please enter Fund transfer date.',
    })
    .date(),
  ft_reason: z
    .string({
      required_error: 'Please enter Fund transfer reason.',
    })
    .min(1),
  ft_amount: z.coerce.number({
    required_error: 'Please enter Fund transfer amount.',
  }),
  ft_to: z.string({ required_error: 'Please enter Fund transfer to.' }).min(1),
  ft_from: z
    .string({ required_error: 'Please enter Fund transfer from.' })
    .min(1),
  ft_on: z.string({ required_error: 'Please enter Fund transfer on.' }).min(1),
  receipt_link: z
    .string({
      required_error: 'Please enter Receipt link.',
    })
    .min(1),
  prepared_staff_id: z
    .string({
      required_error: 'Please enter Prepared staff ID.',
    })
    .min(1),
  certified_staff_id: z
    .string({
      required_error: 'Please enter Certified staff ID.',
    })
    .min(1),
  noted_staff_id: z
    .string({
      required_error: 'Please enter Noted staff ID.',
    })
    .min(1),
  form_list_id: z
    .string({
      required_error: 'Please enter Form list ID.',
    })
    .min(1),
});

export const GdscEventSchema = z.object({
  event_id: z
    .string({
      required_error: 'Please enter Event ID.',
    })
    .min(1),
  event_name: z
    .string({
      required_error: 'Please enter Event name.',
    })
    .min(1),
  ft_form_list_id: z
    .string({
      required_error: 'Please enter FT Form list ID.',
    })
    .min(1),
  rs_form_list_id: z
    .string({
      required_error: 'Please enter RS Form list ID.',
    })
    .min(1),
  es_form_list_id: z
    .string({
      required_error: 'Please enter ES Form list ID.',
    })
    .min(1),
  ai_form_list_id: z
    .string({
      required_error: 'Please enter AI Form list ID.',
    })
    .min(1),
});

export const ItemListSchema = z.object({
  item_list_id: z
    .string({
      required_error: 'Please enter Item list ID.',
    })
    .min(1),
});

export const ItemSchema = z.object({
  item_id: z
    .string({
      required_error: 'Please enter Item ID.',
    })
    .min(1),
  item_list_id: z
    .string({
      required_error: 'Please enter Item list ID.',
    })
    .min(1),
  item_name: z
    .string({
      required_error: 'Please enter Item name.',
    })
    .min(1),
  item_units: z.coerce
    .number()
    .int({
      message: 'Item units must be a valid integer.',
    })
    .optional(),
  item_price: z.string().optional(),
  item_amount: z.coerce.number().optional(),
  item_date: z
    .string({ required_error: 'Please enter Item date.' })
    .date()
    .optional(),
  item_payment_details: z
    .string({
      required_error: 'Please enter Payment details.',
    })
    .min(1),
});

export const RevenueStatementSchema = z.object({
  rs_id: z
    .string({
      required_error: 'Please enter Revenue statement ID.',
    })
    .min(1),
  rs_name: z
    .string({
      required_error: 'Please enter Revenue statement name.',
    })
    .min(1),
  rs_date: z
    .string({
      required_error: 'Please enter Revenue statement date.',
    })
    .date(),
  receipt_link: z
    .string({
      required_error: 'Please enter Receipt link.',
    })
    .min(1),
  rs_to: z
    .string({ required_error: 'Please enter Revenue statement to.' })
    .min(1),
  rs_from: z
    .string({ required_error: 'Please enter Revenue statement from.' })
    .min(1),
  rs_notes: z.string().optional(),
  category_id: z
    .string({
      required_error: 'Please enter Category ID.',
    })
    .min(1),
  prepared_staff_id: z
    .string({
      required_error: 'Please enter Prepared staff ID.',
    })
    .min(1),
  certified_staff_id: z
    .string({
      required_error: 'Please enter Certified staff ID.',
    })
    .min(1),
  noted_staff_id: z
    .string({
      required_error: 'Please enter Noted staff ID.',
    })
    .min(1),
  form_list_id: z
    .string({
      required_error: 'Please enter Form list ID.',
    })
    .min(1),
});

export const StaffListSchema = z.object({
  staff_list_id: z
    .string({
      required_error: 'Please enter Staff list ID.',
    })
    .min(1),
});

export const TransactionSchema = z.object({
  transaction_id: z
    .string({ required_error: 'Please enter Transaction ID.' })
    .min(1),
  transaction_name: z
    .string({
      required_error: 'Please enter Transaction name.',
    })
    .min(1),
  transaction_note: z.string().optional(),
  transaction_date: z
    .string({ required_error: 'Please enter Transaction date.' })
    .date(),
  transaction_list_id: z
    .string({ required_error: 'Please enter Transaction list ID.' })
    .min(1),
  item_list_id: z
    .string({ required_error: 'Please enter Item list ID.' })
    .min(1),
});

export const TransactionListSchema = z.object({
  transaction_list_id: z
    .string({
      required_error: 'Please enter Transaction list ID.',
    })
    .min(1),
});

export const UserSchema = z.object({
  user_id: z.string({ required_error: 'Please enter User ID.' }).min(1),
  user_name: z.string({ required_error: 'Please enter User name.' }).min(1),
  user_password: z
    .string({ required_error: 'Please enter User password.' })
    .min(6),
  staff_id: z.string({ required_error: 'Please enter Staff ID.' }).min(1),
});

// Form Schemas //

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
  unit_count: z.coerce
    .number({
      required_error: 'Please enter a unit count.',
    })
    .int()
    .min(1),
  unit_price: z.coerce
    .number({ required_error: 'Please enter a unit price.' })
    .min(1),
});

export const AddRevenueFormSchema = z.object({
  date: z.string({ required_error: 'Please enter a date.' }).date(),

  category: z.string({ required_error: 'Please enter a category.' }).min(1),
  amount: z.coerce.number({ required_error: 'Please enter an amount.' }).min(1),
});

export const UserFormSchema = z.object({
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

export const AddUserFormSchema = UserFormSchema.omit({
  role: true
})

export type addUserType = z.infer<typeof AddUserFormSchema>

export const CreateEventSchema = z.object({
  event_name: z
    .string({
      required_error: 'Please enter an event name.',
    })
    .min(1),
});

export const EditUserFormSchema = AddUserFormSchema.omit({
  password: true,
}).extend({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

export const LoginForm = UserFormSchema.pick({
  email: true,
  password: true,
});

export const UpdateExpenseFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  notes: z.string(),
  acc_to: z.string({
    required_error: 'Please enter the account transferred to.',
  }),
});

export const UpdateRevenueFormSchema = z.object({
  receipts_link: z
    .string({ required_error: 'Receipts Link is required.' })
    .url({ message: 'Please enter a valid URL.' }),
  notes: z.string(),
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
});
