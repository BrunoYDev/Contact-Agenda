import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Card } from "../../components/Card";
import { Board, Container } from "./style";
import { useUser } from "../../hooks/UserHook";
import { useNavigate } from "react-router-dom";
import { ModalEditUser } from "../../components/editUserInfosModal";
import { jwtDecode } from "jwt-decode";
import { ModalAddContact } from "../../components/addContactsModal";

export interface Contacts {
  id: string;
  fullname: string;
  email: string;
  cellphone: string;
  registerDate: string;
  clientId: string;
}

export interface Client {
  id: string;
  fullname: string;
  email: string;
  cellphone: string;
  registerDate: string;
}

export const Dashboard = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<Client>();
  const { logOut } = useUser();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [isEditContact,setIsEditContact] = useState(false);
  const token = localStorage.getItem("@Agenda:Token");
  const userId = jwtDecode(token!).sub;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/contacts");
        const resUser = await api.get(`/clients/${userId}`);
        setContacts(response.data);
        setUser(resUser.data);
      } catch (error) {
        console.log(error);
        localStorage.clear;
        navigate("/");
      }
    })();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalEditUser = () => {
    setIsEditUser(true);
    toggleModal();
  };
  const toggleModalAddContact = () => {
    setIsEditUser(false);
    toggleModal();
  };

  const toggleModalEdiContact = () => {
    setIsEditContact(!isEditContact);
    toggleModal();
  }

  const reportButton = async () => {
    try {
      setLoading(true);
      const response = await api.get("/clients/report", {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <header>
        <div>
          <h2>Olá, <span>{user?.fullname}</span></h2>
          <button type="button" onClick={() => toggleModalEditUser()}>
            Editar Informações
          </button>
          {!loading ? (
            <button type="button" onClick={() => reportButton()}>
              Relatorio
            </button>
          ) : (
            <button type="button">Carregando..</button>
          )}
        </div>
        <div>
          <button type="button" onClick={() => toggleModalAddContact()}>
            Novo Contato
          </button>
          <button type="button" id="logout" onClick={() => logOut()}>
            Sair
          </button>
        </div>
      </header>
      {isModalOpen && isEditUser && !isEditContact ? (
        <ModalEditUser setUser={setUser} toggleModal={toggleModal} />
      ) : isModalOpen && !isEditUser && !isEditContact ? (
        <ModalAddContact
          contacts={contacts}
          setContacts={setContacts}
          toggleModal={toggleModal}
        />
      ) : null}
      <main>
        <Board>
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              isModalOpen={isModalOpen}
              toggleModalEditContact={toggleModalEdiContact}
              isEditContactModal={isEditContact}
              setContacts={setContacts}
              contact={contact}
            />
          ))}
        </Board>
      </main>
    </Container>
  );
};
