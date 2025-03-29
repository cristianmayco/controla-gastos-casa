import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';
import { Conta } from '../types/Conta';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface ContaListProps {
    contas: Conta[];
    onEdit: (conta: Conta) => void;
    onDelete: (id: number) => void;
    onPagar: (id: number) => void;
}

export const ContaList: React.FC<ContaListProps> = ({ contas, onEdit, onDelete, onPagar }) => {
    const formatarData = (data: string) => {
        return format(new Date(data), 'dd/MM/yyyy', { locale: ptBR });
    };

    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    if (contas.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    Nenhuma conta cadastrada
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="center">Vencimento</TableCell>
                        <TableCell align="center">Lembrete</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contas.map((conta) => (
                        <TableRow
                            key={conta.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: conta.pago ? 'action.hover' : 'inherit'
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {conta.nome}
                            </TableCell>
                            <TableCell align="right">{formatarValor(conta.valor)}</TableCell>
                            <TableCell align="center">{formatarData(conta.dataVencimento)}</TableCell>
                            <TableCell align="center">
                                {conta.dataLembrete ? formatarData(conta.dataLembrete) : '-'}
                            </TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={conta.pago ? 'Pago' : 'Pendente'}
                                    color={conta.pago ? 'success' : 'warning'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    {!conta.pago && (
                                        <IconButton
                                            onClick={() => conta.id && onPagar(conta.id)}
                                            color="success"
                                            size="small"
                                            title="Marcar como paga"
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => onEdit(conta)}
                                        color="primary"
                                        size="small"
                                        title="Editar"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => conta.id && onDelete(conta.id)}
                                        color="error"
                                        size="small"
                                        title="Excluir"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
