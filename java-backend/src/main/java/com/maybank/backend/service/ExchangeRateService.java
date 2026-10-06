package com.maybank.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.maybank.backend.dto.ExchangeRateResponse;

@Service
public class ExchangeRateService {

    private final RestClient restClient;

    public ExchangeRateService(RestClient restClient) {
        this.restClient = restClient;
    }

    public ExchangeRateResponse getExchangeRate(Long customerId, String quote) {

        ExchangeRateResponse response = restClient
                .get()
                .uri("/v2/rate/MYR/{quote}", quote)
                .retrieve()
                .body(ExchangeRateResponse.class);

        response.setCustomerId(customerId);
        response.setBaseCurrency("MYR");
        response.setQuoteCurrency(quote);

    return response;
}
}