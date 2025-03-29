import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ContaForm } from './components/ContaForm';
import { ContaList } from './components/ContaList';
import { contaService } from './services/contaService';
import { Conta, ContaForm as IContaForm } from './types/Conta';

const App: React.FC = () => {
  const [contas, setContas] = useState<Conta[]>([]);
  const [contaParaEditar, setContaParaEditar] = useState<Conta | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarContas();
  }, []);

  const carregarContas = async () => {
    try {
      const data = await contaService.listarTodas();
      setContas(data);
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
    }
  };

  const handleSubmit = async (formData: IContaForm) => {
    try {
      if (contaParaEditar) {
        await contaService.atualizar(contaParaEditar.id!, formData);
      } else {
        await contaService.criar(formData);
      }
      setContaParaEditar(null);
      setMostrarFormulario(false);
      await carregarContas();
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
    }
  };

  const handleEdit = (conta: Conta) => {
    setContaParaEditar(conta);
    setMostrarFormulario(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await contaService.deletar(id);
      await carregarContas();
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  };

  const handlePagar = async (id: number) => {
    try {
      await contaService.marcarComoPaga(id);
      await carregarContas();
    } catch (error) {
      console.error('Erro ao marcar conta como paga:', error);
    }
  };

  const handleCancelar = () => {
    setContaParaEditar(null);
    setMostrarFormulario(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Controle de Gastos Casa
        </Typography>
        {!mostrarFormulario && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMostrarFormulario(true)}
          >
            Nova Conta
          </Button>
        )}
      </Box>

      {mostrarFormulario && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {contaParaEditar ? 'Editar Conta' : 'Nova Conta'}
          </Typography>
          <ContaForm
            initialData={contaParaEditar || undefined}
            onSubmit={handleSubmit}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelar}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
          </Box>
        </Paper>
      )}

      <ContaList
        contas={contas}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPagar={handlePagar}
      />
    </Container>
  );
};

export default App;
