import axios from 'axios';
import { Conta, ContaForm } from '../types/Conta';

const API_URL = 'http://localhost:8080/api/contas';

export const contaService = {
    listarTodas: async (): Promise<Conta[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    listarNaoPagas: async (): Promise<Conta[]> => {
        const response = await axios.get(`${API_URL}/nao-pagas`);
        return response.data;
    },

    buscarPorId: async (id: number): Promise<Conta> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    criar: async (conta: ContaForm): Promise<Conta> => {
        const response = await axios.post(API_URL, conta);
        return response.data;
    },

    atualizar: async (id: number, conta: ContaForm): Promise<Conta> => {
        const response = await axios.put(`${API_URL}/${id}`, conta);
        return response.data;
    },

    deletar: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

    marcarComoPaga: async (id: number): Promise<Conta> => {
        const response = await axios.put(`${API_URL}/${id}/pagar`);
        return response.data;
    }
};
