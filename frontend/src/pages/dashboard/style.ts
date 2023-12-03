import styled from 'styled-components';


export const Container = styled.div `
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: url('assets/peakpx.jpg');

    header {
        border-bottom: 2px solid black;
        display: flex;
        justify-content: center;
        gap: 500px;
        height: 50px;
        padding: 30px;
        align-items: center;
        h2 {
            font-size: 30px;
            font-weight: 600;
            text-transform: uppercase;
            span {
                font-size: 20px;
                text-transform: uppercase;
            }
        }
        div {
            display: flex;
            gap: 20px;
            align-items: center;
            button {
                color: white;
                background-color: var(--color-blue-600);
                padding: 10px;
                border: 0px solid transparent;
                height: 40px;
                border-radius: 10px;
                outline: none;
                font-weight: 600;
            }
            #logout{
                background-color: red;
                border: 0px solid transparent;
                width: 40px;
                height: 30px;
                padding: 0px;
                border-radius: 20px;
                outline: none;
            }
        }
    }

    main {
        display: flex;
        padding: 50px;
        flex-direction: column;
        gap: 20px;
        overflow-y: auto;
        overflow-x: hidden;
    }
`

export const Board = styled.ul `
    /* background-color: var(--color-blue-300); */
    height: 100%;
    width: 100%;
    display: flex;
    margin-left: 100px;
    gap: 20px;
    padding: 10px;
    list-style: none;
    flex-wrap: wrap;

`