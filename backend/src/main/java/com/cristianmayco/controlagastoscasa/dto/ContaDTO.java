package com.cristianmayco.controlagastoscasa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ContaDTO {
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser maior que zero")
    private BigDecimal valor;

    @NotNull(message = "A data de vencimento é obrigatória")
    private LocalDate dataVencimento;

    private LocalDate dataLembrete;
    private LocalDate dataPagamento;
    private boolean pago;
}
