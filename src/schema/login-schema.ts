import { z } from "zod";

export const signSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Nama wajib diisi").max(30),
  password: z.string().min(6).max(20)
})

export type signInForm = z.infer<typeof signSchema>
