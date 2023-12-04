import { Contacts } from "../../pages/dashboard";
import { api } from "../../services/api";
import { ModalEditContact } from "../editContactsInfosModal";
import { Container } from "./style";
import { toast } from "react-toastify";

interface CardProps {
  contact: Contacts;
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  toggleModalEditContact: () => void;
  isModalOpen: boolean;
  isEditContactModal: boolean;
}

export const Card = ({
  contact,
  setContacts,
  toggleModalEditContact,
  isModalOpen,
  isEditContactModal,
}: CardProps) => {
  const newDay = new Date(contact.registerDate).getDate();
  const newMonth = new Date(contact.registerDate).getMonth();
  const newYear = new Date(contact.registerDate).getFullYear();

  const newDate = `${newDay}/${newMonth}/${newYear}`;

  const excludeContact = async () => {
    try {
      await api.delete(`/contacts/${contact.id}`);
      const response = await api.get("/contacts");
      setContacts(response.data);
      toast.success("Usuario Deletado com sucesso!", {
        autoClose: 1500,
        theme: "dark",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <Container>
      <p id="name">Nome: <span>{contact.fullname}</span></p>
      <p id="number">Numero: <span>{contact.cellphone}</span></p>
      <p id="email">E-mail: <span>{contact.email}</span></p>
      <p id="registerDate">Data de registro: <span>{newDate}</span></p>
      <div>
      <button id="editButton" type="button" onClick={() => toggleModalEditContact()}>
        Editar
      </button>
      <button id="excludeButton" type="button" onClick={() => excludeContact()}>
        Excluir
      </button>
      </div>
      {isModalOpen && isEditContactModal ? (
        <ModalEditContact
          contactId={contact.id}
          setContacts={setContacts}
          toggleModalEditContact={toggleModalEditContact}
        />
      ) : null }
    </Container>
  );
};
