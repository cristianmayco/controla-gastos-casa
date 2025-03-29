package com.cristianmayco.controlagastoscasa.service;

import com.cristianmayco.controlagastoscasa.model.Conta;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class LembreteService {
    private static final Logger logger = LoggerFactory.getLogger(LembreteService.class);
    
    private final ContaService contaService;

    public LembreteService(ContaService contaService) {
        this.contaService = contaService;
    }

    @Scheduled(cron = "0 0 8 * * *") // Executa todos os dias às 8h
    public void verificarLembretes() {
        LocalDate hoje = LocalDate.now();
        List<Conta> contasParaLembrete = contaService.buscarContasParaLembrete(hoje);
        
        for (Conta conta : contasParaLembrete) {
            enviarLembrete(conta);
        }
    }

    @Scheduled(cron = "0 0 20 * * *") // Executa todos os dias às 20h
    public void verificarContasVencidas() {
        LocalDate hoje = LocalDate.now();
        List<Conta> contasVencidas = contaService.buscarContasVencidas(hoje);
        
        for (Conta conta : contasVencidas) {
            notificarContaVencida(conta);
        }
    }

    private void enviarLembrete(Conta conta) {
        // TODO: Implementar integração com serviço de notificação
        logger.info("Lembrete: A conta {} vence em {} dias. Valor: R$ {}", 
            conta.getNome(), 
            conta.getDataVencimento().minusDays(LocalDate.now().toEpochDay()).toEpochDay(),
            conta.getValor());
    }

    private void notificarContaVencida(Conta conta) {
        // TODO: Implementar integração com serviço de notificação
        logger.info("Alerta: A conta {} está vencida desde {}. Valor: R$ {}", 
            conta.getNome(), 
            conta.getDataVencimento(),
            conta.getValor());
    }
}
