import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/UserHook";
import { Modal } from "../Modal";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal = ({ toggleModal }: LoginModalProps) => {
  const { signIn } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submit = (data: LoginData) => {
    signIn(data);
  };
  return (
    <Modal toggleModal={toggleModal}>
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="loginemail">E-mail</label>
        <input type="email" id="loginemail" {...register("email")} />
        {errors?.email?.message && <p>{errors.email.message}</p>}

        <label htmlFor="loginpassword">Senha</label>
        <input type="password" id="loginpassword" {...register("password")} />
        {errors?.password?.message && <p>{errors.password.message}</p>}

        <button type="submit">Entrar</button>
      </form>
    </Modal>
  );
};
