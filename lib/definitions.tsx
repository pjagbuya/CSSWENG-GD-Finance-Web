import { z } from "zod"

export const UserSchema = z.object({
  email: z.string({
    required_error: 'Please enter your email.'
  }).email(),
  password: z.string({
    required_error: 'Please enter your password.'
  }).min(6, `Password must be at least 6 characters`),
  first_name: z.string({
    required_error: 'Please enter your first name.'
  }),
  last_name: z.string({
    required_error: 'Please enter your last name.'
  }),
  role: z.enum(['admin', 'member'])
})

export const EventSchema = z.object({
  name: z.string({
    required_error: 'Please enter an event name.'
  })
})

export const LoginForm = UserSchema.pick({ email: true, password: true })
