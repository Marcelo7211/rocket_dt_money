import { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

import Modal from 'react-modal'

interface HeaderProps {
    onOpenNewTransitionModal: () => void;
}

export function Header({ onOpenNewTransitionModal }: HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransitionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}