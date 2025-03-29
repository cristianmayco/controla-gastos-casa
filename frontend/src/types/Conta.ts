export interface Conta {
    id?: number;
    nome: string;
    valor: number;
    dataVencimento: string;
    dataLembrete?: string;
    dataPagamento?: string;
    pago: boolean;
}

export interface ContaForm extends Omit<Conta, 'id'> {
    id?: number;
}
