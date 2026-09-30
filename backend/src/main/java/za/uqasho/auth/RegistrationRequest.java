package za.uqasho.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegistrationRequest(
    @NotBlank @Size(max = 80) String firstName,
    @NotBlank @Size(max = 80) String lastName,
    @NotBlank @Email @Size(max = 255) String email,
    @NotBlank @Pattern(regexp = "^(?:\\+?27\\s?0?[6-8](?:[0-9][\\s-]?){7}[0-9]|0[6-8](?:[0-9][\\s-]?){7}[0-9])$", message = "Enter a valid South African phone number") String phone,
    @NotBlank @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,72}$",
        message = "Password must be 8-72 chars and include uppercase, lowercase, number, and symbol"
    ) String password,
    @Size(max = 120) String preferredArea,
    @Size(max = 160) String businessName
) {
}
