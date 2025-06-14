import { z } from "zod";

export const signSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Nama wajib diisi").max(30, "Maksimal email 30 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter").max(20, "Maksimal password 20 karakter")
})

export type signInForm = z.infer<typeof signSchema>
