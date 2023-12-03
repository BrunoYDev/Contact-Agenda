import { useState } from "react";
import { LoginModal } from "../../components/loginModal";
import { RegisterModal } from "../../components/registerModal";
import { Container } from "./style";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const toggleModalLogin = () => {
    setIsModalOpen(!isModalOpen);
    setIsLoginModal(true);
    setIsRegisterModal(false);
  };

  const toggleModalRegister = () => {
    setIsModalOpen(!isModalOpen);
    setIsRegisterModal(true);
    setIsLoginModal(false);
  };

  return (
    <Container>
      <section>
      <header>
        <h1>Agenda De Contatos</h1>
      </header>
      <main>
        <button type="button" onClick={toggleModalRegister}>
          Cadastrar
        </button>
        <button type="button" onClick={toggleModalLogin}>
          Entrar
        </button>
      </main>
      {isModalOpen && !isRegisterModal && isLoginModal ? (
        <LoginModal toggleModal={toggleModalLogin} />
      ) : isModalOpen && isRegisterModal && !isLoginModal ? (
        <RegisterModal toggleModal={toggleModalRegister} />
      ) : null}
      </section>
    </Container>
  );
};
