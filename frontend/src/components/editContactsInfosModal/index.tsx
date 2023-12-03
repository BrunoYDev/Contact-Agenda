import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { EditData, schema } from "./EditContactSchema";
import { api } from "../../services/api";
import { Contacts } from "../../pages/dashboard";
import { Modal } from "../Modal";
import { toast } from "react-toastify";

interface ModalEditContactProps {
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  contactId: string;
  toggleModalEditContact: () => void;
}

export const ModalEditContact = ({
  toggleModalEditContact,
  setContacts,
  contactId,
}: ModalEditContactProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditData>({
    resolver: zodResolver(schema),
  });

  const editContact = async (data: EditData) => {
    Object.keys(data).forEach((key) => {
      const validKey = key as keyof typeof data;
      if (data[validKey] === "") {
        delete data[validKey];
      }
    });
    try {
      await api.patch(`/contacts/${contactId}`, { ...data });
      const response = await api.get('/contacts')
      setContacts(response.data);
      toast.success("Contato editado com sucesso!", {
        autoClose: 1500,
        theme: "dark",
      });
      toggleModalEditContact();
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <Modal toggleModal={toggleModalEditContact}>
      <form onSubmit={handleSubmit(editContact)}>
        <label htmlFor="fullname">Nome Completo</label>
        <input type="text" id="fullname" {...register("fullname")} />
        {errors?.fullname?.message && <p>{errors.fullname.message}</p>}

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />
        {errors?.email?.message && <p>{errors.email.message}</p>}

        <label htmlFor="cellphone">Numero de telefone</label>
        <input type="text" id="cellphone" {...register("cellphone")} />
        {errors?.cellphone?.message && <p>{errors.cellphone.message}</p>}

        <button type="submit">Editar Contato</button>
      </form>
    </Modal>
  );
};
