import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 0px;
  justify-content: space-between;
  width: 400px;
  height: 400px;
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
  border-radius: 40px 10px 40px 10px;
  -webkit-box-shadow: -4px 19px 21px 7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -4px 19px 21px 7px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 19px 21px 7px rgba(0, 0, 0, 0.75);
  p {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-gray-200);
    text-transform: uppercase;
    span {
      font-size: 20px;
      color: var(--color-gray-100);
      text-decoration: underline;
      text-transform: none;
    }
  }

  div {
    display: flex;
    justify-content: space-around;
  }
  #editButton {
    background-color: var(--color-blue-400);
  }
  #excludeButton {
    background-color: red;
  }
  button {
    color: white;
    font-weight: 600;
    font-size: 20px;
    border: 0px solid transparent;
    border-radius: 10px;
    width: 120px;
    height: 35px;
    align-self: center;
  }
`;
