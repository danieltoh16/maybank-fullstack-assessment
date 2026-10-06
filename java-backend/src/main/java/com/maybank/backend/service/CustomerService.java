package com.maybank.backend.service;

import org.springframework.data.domain.Page;

import com.maybank.backend.dto.CustomerRequest;
import com.maybank.backend.dto.CustomerResponse;

public interface CustomerService {

    Page<CustomerResponse> getAllCustomers(int page);

    CustomerResponse getCustomerById(Long id);

    CustomerResponse createCustomer(CustomerRequest request);

    CustomerResponse updateCustomer(Long id, CustomerRequest request);

    void deleteCustomer(Long id);
}