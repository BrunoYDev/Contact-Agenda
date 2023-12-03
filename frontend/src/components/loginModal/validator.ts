import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Campo deve conter um email válido!"),
  password: z.string().min(1, "Por favor preencha a senha"),
});

export type LoginData = z.infer<typeof schema>