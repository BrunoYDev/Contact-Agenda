import { useForm } from "react-hook-form";
import { RegisterData, schema } from "./RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/UserHook";
import { Modal } from "../Modal";

interface RegisterModal {
  toggleModal: () => void;
}

export const RegisterModal = ({toggleModal}: RegisterModal) => {
  const { registerUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: RegisterData) => {
    registerUser(data);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <h2>Cadastrar-se</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="fullname">Nome Completo</label>
        <input type="text" id="fullname" {...register("fullname")} />
        {errors?.fullname?.message && <p>{errors.fullname.message}</p>}

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />
        {errors?.email?.message && <p>{errors.email.message}</p>}

        <label htmlFor="cellphone">Numero de telefone</label>
        <input type="text" id="cellphone" {...register("cellphone")} />
        {errors?.cellphone?.message && <p>{errors.cellphone.message}</p>}

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register("password")} />
        {errors?.password?.message && <p>{errors.password.message}</p>}

        <label htmlFor="confirm">Confirme a senha</label>
        <input type="password" id="confirm" {...register("confirm")} />
        {errors?.confirm?.message && <p>{errors.confirm.message}</p>}

        <button type="submit">Cadastrar-se</button>
      </form>
    </Modal>
  );
};
