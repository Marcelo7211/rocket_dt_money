import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; // espaçamento entre cada uma das 3 colunas
    margin-top: -10rem;

    div {
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        strong {
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            line-height: 3rem;
            font-weight: 500;
        }

        &.highlight-background {
            background: var(--green);
            color: #FFF

        }
    }
`;