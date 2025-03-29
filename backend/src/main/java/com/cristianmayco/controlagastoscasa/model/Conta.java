package com.cristianmayco.controlagastoscasa.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "contas")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(name = "data_vencimento", nullable = false)
    private LocalDate dataVencimento;

    @Column(name = "data_lembrete")
    private LocalDate dataLembrete;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

    @Column(name = "pago")
    private boolean pago;
}
