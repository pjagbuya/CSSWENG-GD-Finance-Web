import { z } from "zod"

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(['admin', 'member'])
})

export const EventSchema = z.object({
  name: z.string()
})

export const LoginForm = UserSchema.pick({ email: true, password: true })
