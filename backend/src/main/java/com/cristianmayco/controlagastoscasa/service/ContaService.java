package com.cristianmayco.controlagastoscasa.service;

import com.cristianmayco.controlagastoscasa.dto.ContaDTO;
import com.cristianmayco.controlagastoscasa.model.Conta;
import com.cristianmayco.controlagastoscasa.repository.ContaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class ContaService {

    private final ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    @Transactional(readOnly = true)
    public List<Conta> listarTodasContas() {
        return contaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Conta> listarContasNaoPagas() {
        return contaRepository.findByPagoOrderByDataVencimentoDesc(false);
    }

    @Transactional(readOnly = true)
    public Conta buscarPorId(Long id) {
        return contaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada"));
    }

    @Transactional
    public Conta salvar(ContaDTO contaDTO) {
        Conta conta = new Conta();
        BeanUtils.copyProperties(contaDTO, conta);
        
        if (conta.getDataLembrete() == null) {
            conta.setDataLembrete(conta.getDataVencimento().minusDays(10));
        }
        
        return contaRepository.save(conta);
    }

    @Transactional
    public Conta atualizar(Long id, ContaDTO contaDTO) {
        Conta contaExistente = buscarPorId(id);
        BeanUtils.copyProperties(contaDTO, contaExistente, "id");
        return contaRepository.save(contaExistente);
    }

    @Transactional
    public void deletar(Long id) {
        if (!contaRepository.existsById(id)) {
            throw new EntityNotFoundException("Conta não encontrada");
        }
        contaRepository.deleteById(id);
    }

    @Transactional
    public Conta marcarComoPaga(Long id) {
        Conta conta = buscarPorId(id);
        conta.setPago(true);
        conta.setDataPagamento(LocalDate.now());
        return contaRepository.save(conta);
    }

    @Transactional(readOnly = true)
    public List<Conta> buscarContasParaLembrete(LocalDate data) {
        return contaRepository.findContasParaLembrete(data);
    }

    @Transactional(readOnly = true)
    public List<Conta> buscarContasVencidas(LocalDate data) {
        return contaRepository.findContasVencidas(data);
    }
}
