import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { EditData, schema } from "./EditUserSchema";
import { api } from "../../services/api";
import { Client } from "../../pages/dashboard";
import { Modal } from "../Modal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/UserHook";

interface ModalEditUserProps {
  toggleModal: () => void;
  setUser: React.Dispatch<React.SetStateAction<Client | undefined>>;
}


export const ModalEditUser = ({ toggleModal, setUser}: ModalEditUserProps) => {
  const token = localStorage.getItem("@Agenda:Token");
  const userId = jwtDecode(token!).sub;
  const { deleteUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditData>({
    resolver: zodResolver(schema),
  });


  const editUser = async (data: EditData) => {
    Object.keys(data).forEach((key) => {
      const validKey = key as keyof typeof data;
      if (data[validKey] === "") {
        delete data[validKey];
      }
    });
    try {
      const response = await api.patch(`/clients/${userId}`, { ...data });
      setUser(response.data);
      toggleModal();
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(editUser)}>
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

        <div id="buttonContainer">
        <button type="submit">Editar usuario</button>
        <button type="button" id="excludeUser" onClick={() => deleteUser()}>Excluir</button>
        </div>
      </form>
    </Modal>
  );
};
