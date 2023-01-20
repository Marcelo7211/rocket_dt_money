import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface TransactionalProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string

}


type TransactionInput = Omit<TransactionalProps, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: TransactionalProps[];
    createTransaction: (ttrasaction: TransactionInput) => Promise<void>;
}

interface TransactionalProviderProps {
    children: ReactNode;

}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);


export function TransactionsProvider({ children }: TransactionalProviderProps) {

    const [transactions, setTransactions] = useState<TransactionalProps[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(({ data }) => {
                setTransactions(data.transactions)
            });
    }, [])

    async function createTransaction(trasaction: TransactionInput) {
        const response = await api.post('/transactions', { ...trasaction, createdAt: new Date() })
        const { transaction } = response.data;

        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}


export function useTransactions() {
    const context =  useContext(TransactionsContext);

    return context;
}