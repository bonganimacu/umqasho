# Uqasho API

Spring Boot API foundation for Uqasho.

## Local database

```bash
docker compose up -d postgres
```

Set `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` when running outside the included local database defaults.

## Registration endpoints

- `POST /api/auth/register/tenant`
- `POST /api/auth/register/landlord`

Registration validates names, email, South African phone format, and password length. Passwords are stored as BCrypt hashes. Landlord accounts start as `PENDING_VERIFICATION`.

Build with Maven after installing Java 21 and Maven:

```bash
mvn test
```
