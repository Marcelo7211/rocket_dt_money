import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg'
import entradaImg from '../../assets/entradas.svg'
import saidaImg from '../../assets/saidas.svg'


Modal.setAppElement('#root');

interface NewTransitionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;

}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransitionModalProps) {

    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            amount,
            category,
            title,
            type
        })

        onRequestClose();

        setCategory('');
        setTitle('');
        setAmount(0);
        setType('deposit');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt='fechar modal' />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input
                    type="text"
                    placeholder='Titulo'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder='Valor'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activitColor='green'
                    >
                        <img src={entradaImg} alt='entrada imagem' />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activitColor='red'
                    >
                        <img src={saidaImg} alt='entrada imagem' />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    type="text"
                    placeholder='Categoria'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>

            </Container>
        </Modal>
    )
}