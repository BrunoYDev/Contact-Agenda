import { z } from "zod";

export const schema = z.object({
  fullname: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .email("Precisa ser um email válido")
    .optional()
    .or(z.literal("")),
  cellphone: z
    .string()
    .min(11, "Numero tem que ser de 11 a 12 digitos")
    .max(12, "Numero tem que ser de 11 a 12 digitos")
    .optional()
    .or(z.literal("")),
});

type data = z.infer<typeof schema>;
export type EditData = Partial<data>;
