# Maybank Full Stack Assessment — Java Backend

A Spring Boot REST API developed as part of the Maybank Full Stack Developer assessment.

The application provides customer CRUD operations, database persistence using Microsoft SQL Server, pagination, request/response logging, validation, centralized exception handling, and third-party exchange-rate API integration.

---

## Tech Stack

- Java 17
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- Jakarta Bean Validation
- Microsoft SQL Server
- Maven
- REST APIs
- Postman
- Git
- Frankfurter Exchange Rate API

---

## Features

- Customer CRUD operations
- SQL Server database integration
- JPA/Hibernate persistence
- Transaction management with `@Transactional`
- Pagination with 10 records per page
- Request and response logging
- Request validation
- Centralized exception handling
- Structured validation error responses
- Third-party exchange-rate API integration
- DTO-based request/response handling
- Layered application architecture

---

## Project Structure

```text
src/
└── main/
    ├── java/
    │   └── com/
    │       └── maybank/
    │           └── backend/
    │               ├── config/
    │               │   ├── RequestResponseLoggingFilter.java
    │               │   └── RestClientConfig.java
    │               │
    │               ├── controller/
    │               │   └── CustomerController.java
    │               │
    │               ├── dto/
    │               │   ├── CustomerRequest.java
    │               │   ├── CustomerResponse.java
    │               │   └── ExchangeRateResponse.java
    │               │
    │               ├── entity/
    │               │   └── Customer.java
    │               │
    │               ├── exception/
    │               │   ├── GlobalExceptionHandler.java
    │               │   └── ResourceNotFoundException.java
    │               │
    │               ├── repository/
    │               │   └── CustomerRepository.java
    │               │
    │               ├── service/
    │               │   ├── CustomerService.java
    │               │   ├── ExchangeRateService.java
    │               │   └── impl/
    │               │       └── CustomerServiceImpl.java
    │               │
    │               └── JavaBackendApplication.java
    │
    └── resources/
        └── application.properties
```

---

## Prerequisites

- Java 17
- Microsoft SQL Server
- Git
- Postman

The project includes the Maven Wrapper, so Maven does not need to be installed separately.

---

## Database Setup

The application uses Microsoft SQL Server with a database named `TESTDB`.

Create the database:

```sql
CREATE DATABASE TESTDB;
```

The application expects SQL Server to be available locally on port `1433`.

The database username and password are provided through environment variables.

---

## Environment Variables

The application reads database credentials from environment variables.

Set the following:

```text
DB_USERNAME=maybank_app
DB_PASSWORD=<your-password>
```

Database credentials are intentionally not stored in the source code.

Do not commit passwords, `.env` files, or other secrets to the repository.

---

## Running the Application

From the `java-backend` directory:

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

The application runs on:

```text
http://localhost:8080
```

---

## Running Tests

Run the complete test suite:

```powershell
.\mvnw.cmd clean test
```

---

## API Endpoints

Base URL:

```text
http://localhost:8080/api/customers
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/customers?page=0` | Get customers with pagination |
| GET | `/api/customers/{id}` | Get customer by ID |
| POST | `/api/customers` | Create a customer |
| PUT | `/api/customers/{id}` | Update a customer |
| DELETE | `/api/customers/{id}` | Delete a customer |
| GET | `/api/customers/{id}/exchange-rate?quote=USD` | Retrieve an exchange rate from the third-party API |

Pagination returns 10 records per page.

---

## Third-Party API Integration

The application integrates with the Frankfurter Exchange Rate API.

The endpoint:

```text
GET /api/customers/{id}/exchange-rate?quote=USD
```

calls the external exchange-rate service through `ExchangeRateService` and returns the mapped exchange-rate response.

The integration uses Spring's `RestClient`.

---

## Request and Response Logging

API requests and responses are logged through `RequestResponseLoggingFilter`.

Logs are written to:

```text
logs/maybank-backend.log
```

Example:

```text
REQUEST: POST /api/customers
RESPONSE: POST /api/customers 201 ...
```

The `logs/` directory is excluded from source control.

---

## Validation and Error Handling

Customer create and update requests use Jakarta Bean Validation.

Validation includes:

- Required first name
- Required last name
- Valid email format
- Required phone
- Required status

Invalid requests return `400 Bad Request` with field-level validation errors.

Requests for non-existent customers return `404 Not Found`.

---

## Transaction Management

The customer service layer uses Spring's `@Transactional`.

Read operations use:

```java
@Transactional(readOnly = true)
```

Create and update operations use:

```java
@Transactional
```

---

## Architecture

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
SQL Server
```

Third-party integration:

```text
CustomerController
    ↓
ExchangeRateService
    ↓
RestClient
    ↓
Frankfurter API
```

DTOs are used to separate API request/response models from the persistence entity.

---

## Postman

The APIs can be tested using Postman.

The Postman collection is included in:

```text
postman/Maybank_Backend_Postman_Collection.json
```

The test coverage includes:

- Customer creation
- Customer retrieval
- Customer update
- Customer deletion
- Pagination
- Validation errors
- Not-found handling
- Third-party exchange-rate integration
