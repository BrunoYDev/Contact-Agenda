import { z } from "zod";

export const schema = z
  .object({
    fullname: z.string().min(1, "Campo deve ser preenchido!"),
    email: z.string().email("Campo deve conter um email válido!"),
    cellphone: z
      .string()
      .min(11, "Numero deve conter entre 11 a 12 caracteres!")
      .max(12, "Numero deve conter entre 11 a 12 caracteres!"),
    password: z
      .string()
      .min(8, "A senha é obrigatória e precisa de mínimo 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(
        /(?=.*?[?!;:*&$@#])/,
        "É necessário pelo menos um caractere especial"
      ),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => confirm === password, {
    message: "As senhas não são iguais",
    path: ["confirm"],
  });

export type RegisterData = z.infer<typeof schema>;
