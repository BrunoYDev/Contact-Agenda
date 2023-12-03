import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url('public/peakpx.jpg');
  align-items: center;
  justify-content: center;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 700px;
    height: 500px;
    border: 2px solid transparent;
    border-radius: 40px 5px 40px 5px;
    /* background-color: var(--color-gray-200); */
    backdrop-filter: blur(5px);
    -webkit-box-shadow: -4px 19px 21px 7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -4px 19px 21px 7px rgba(0, 0, 0, 0.75);
    box-shadow: -4px 19px 21px 7px rgba(0, 0, 0, 0.75);
  }

  header {
    display: flex;
    border: 10px solid var(--color-gray-200);
    border-radius: 40px 5px 40px 5px;
    justify-content: center;
    gap: 500px;
    height: 50px;
    padding: 40px;
    align-items: center;
    h1 {
      color: var(--color-gray-200);
      font-weight: 700;
      font-size: 40px;
    }
  }

  main {
    display: flex;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
    button {
      width: 300px;
      height: 50px;
      outline: none;
      border: 1px solid transparent;
      border-radius: 20px;
      background-color: var(--color-blue-400);
      color: white;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
