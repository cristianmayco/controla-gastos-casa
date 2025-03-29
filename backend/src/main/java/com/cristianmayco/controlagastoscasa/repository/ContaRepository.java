package com.cristianmayco.controlagastoscasa.repository;

import com.cristianmayco.controlagastoscasa.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {
    
    @Query("SELECT c FROM Conta c WHERE c.pago = false AND c.dataVencimento <= :data")
    List<Conta> findContasVencidas(LocalDate data);

    @Query("SELECT c FROM Conta c WHERE c.pago = false AND c.dataLembrete = :data")
    List<Conta> findContasParaLembrete(LocalDate data);

    List<Conta> findByPagoOrderByDataVencimentoDesc(boolean pago);
}
