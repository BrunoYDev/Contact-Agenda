import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Contacts } from "../../pages/dashboard";
import { Modal } from "../Modal";
import { AddContact, schema } from "./AddContactSchema";
import { toast } from "react-toastify";

interface ModalAddContactsProps {
  toggleModal: () => void;
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>
  contacts: Contacts[]
}

export const ModalAddContact = ({
  toggleModal,
  setContacts,
  contacts
}: ModalAddContactsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddContact>({
    resolver: zodResolver(schema),
  });


  const addContact = async (data: AddContact) => {
    try {
      const response = await api.post("/contacts", data);
      setContacts([...contacts, {...data, id: response.data.id, clientId: response.data.clientId, registerDate: response.data.registerDate}]);
      toggleModal()
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(addContact)}>
        <label htmlFor="fullname">Nome Completo</label>
        <input type="text" id="fullname" {...register("fullname")} />
        {errors?.fullname?.message && <p>{errors.fullname.message}</p>}

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />
        {errors?.email?.message && <p>{errors.email.message}</p>}

        <label htmlFor="cellphone">Numero de telefone</label>
        <input type="text" id="cellphone" {...register("cellphone")} />
        {errors?.cellphone?.message && <p>{errors.cellphone.message}</p>}

        <button type="submit">Adicionar Contato</button>
      </form>
    </Modal>
  );
};
