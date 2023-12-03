import { z } from "zod";

export const schema = z.object({
  fullname: z.string().optional(),
  email: z.string().email("Precisa ser um email válido").optional(),
  cellphone: z
    .string()
    .min(11, "Numero tem que ser de 11 a 12 digitos")
    .max(12, "Numero tem que ser de 11 a 12 digitos")
    .optional(),
  password: z
    .string()
    .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
    .regex(
      /(?=.*?[?!;:*&$@#])/,
      "É necessário pelo menos um caractere especial"
    )
    .optional(),
});

type data = z.infer<typeof schema>;
export type EditData = Partial<data>;
