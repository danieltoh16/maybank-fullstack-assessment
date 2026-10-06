package com.maybank.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maybank.backend.dto.CustomerRequest;
import com.maybank.backend.dto.CustomerResponse;
import com.maybank.backend.dto.ExchangeRateResponse;
import com.maybank.backend.service.CustomerService;
import com.maybank.backend.service.ExchangeRateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final ExchangeRateService exchangeRateService;

    public CustomerController(
            CustomerService customerService,
            ExchangeRateService exchangeRateService) {

        this.customerService = customerService;
        this.exchangeRateService = exchangeRateService;
    }

    @GetMapping
    public ResponseEntity<Page<CustomerResponse>> getAllCustomers(
            @RequestParam(defaultValue = "0") int page) {

        return ResponseEntity.ok(customerService.getAllCustomers(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(customerService.createCustomer(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequest request) {

        return ResponseEntity.ok(
                customerService.updateCustomer(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/exchange-rate")
    public ResponseEntity<ExchangeRateResponse> getExchangeRate(
            @PathVariable Long id,
            @RequestParam(defaultValue = "USD") String quote) {

        return ResponseEntity.ok(
                exchangeRateService.getExchangeRate(id, quote));
    }
}