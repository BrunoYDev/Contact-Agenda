import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: var(--color-gray-900);
    padding: 20px;
    box-shadow: 0  0 25px 0 rgba(0,0,0,.25);
    width: 100%;
    max-width: 700px;
    min-height: 300px;
    max-height: 700px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 30px;
      align-self: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      font-size: 20px;
      font-weight: 500;

      button {
        width: 200px;
        height: 50px;
        outline: none;
        border: 1px solid transparent;
        background-color: var(--color-blue-800);
        font-size: 20px;
        font-weight: 500;
        color: var(--color-gray-200);
        border-radius: 10px;
      }

      input {
        height: 30px;
        font-size: 30px;
        outline: none;
        border: 2px solid var(--color-blue-500);
        background-color: transparent;
        color: var(--color-gray-200);
      }

      #buttonContainer {
        display: flex;
        justify-content: space-between;
        #excludeUser {
          background-color: red;
        }
      }
    }
  }
`