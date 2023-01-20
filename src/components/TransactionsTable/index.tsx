import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


interface TransactionalProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string

}

export function TransactionsTable() {

    const {transactions} = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction: TransactionalProps) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                        {transaction.type === 'withdraw'? '-':''}
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transaction.amount)}
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>

    )
}