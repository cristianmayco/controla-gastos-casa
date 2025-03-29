package com.cristianmayco.controlagastoscasa.controller;

import com.cristianmayco.controlagastoscasa.dto.ContaDTO;
import com.cristianmayco.controlagastoscasa.model.Conta;
import com.cristianmayco.controlagastoscasa.service.ContaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contas")
public class ContaController {

    private final ContaService contaService;

    public ContaController(ContaService contaService) {
        this.contaService = contaService;
    }

    @GetMapping
    public ResponseEntity<List<Conta>> listarTodasContas() {
        return ResponseEntity.ok(contaService.listarTodasContas());
    }

    @GetMapping("/nao-pagas")
    public ResponseEntity<List<Conta>> listarContasNaoPagas() {
        return ResponseEntity.ok(contaService.listarContasNaoPagas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conta> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(contaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Conta> criar(@Valid @RequestBody ContaDTO contaDTO) {
        return ResponseEntity.ok(contaService.salvar(contaDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conta> atualizar(@PathVariable Long id, @Valid @RequestBody ContaDTO contaDTO) {
        return ResponseEntity.ok(contaService.atualizar(id, contaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        contaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/pagar")
    public ResponseEntity<Conta> marcarComoPaga(@PathVariable Long id) {
        return ResponseEntity.ok(contaService.marcarComoPaga(id));
    }
}
