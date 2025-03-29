package com.cristianmayco.controlagastoscasa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ControlaGastosCasaApplication {
    public static void main(String[] args) {
        SpringApplication.run(ControlaGastosCasaApplication.class, args);
    }
}
