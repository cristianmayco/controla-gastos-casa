import React, { useState, useEffect } from 'react';
import { ContaForm as IContaForm } from '../types/Conta';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

interface ContaFormProps {
    initialData?: IContaForm;
    onSubmit: (data: IContaForm) => void;
}

export const ContaForm: React.FC<ContaFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState<IContaForm>({
        nome: '',
        valor: 0,
        dataVencimento: new Date().toISOString().split('T')[0],
        dataLembrete: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pago: false,
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date: Date | null, field: 'dataVencimento' | 'dataLembrete') => {
        if (date) {
            setFormData(prev => ({
                ...prev,
                [field]: date.toISOString().split('T')[0]
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome da Conta"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Valor"
                            name="valor"
                            type="number"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                            inputProps={{ min: 0, step: "0.01" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Data de Vencimento"
                            value={formData.dataVencimento ? new Date(formData.dataVencimento) : null}
                            onChange={(date) => handleDateChange(date, 'dataVencimento')}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Data do Lembrete"
                            value={formData.dataLembrete ? new Date(formData.dataLembrete) : null}
                            onChange={(date) => handleDateChange(date, 'dataLembrete')}
                            slotProps={{
                                textField: {
                                    fullWidth: true
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="pago"
                                    checked={formData.pago}
                                    onChange={handleChange}
                                />
                            }
                            label="Conta Paga"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {initialData ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>
    );
};
