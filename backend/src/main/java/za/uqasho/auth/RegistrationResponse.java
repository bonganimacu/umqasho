package za.uqasho.auth;

import java.time.Instant;
import java.util.UUID;
import za.uqasho.user.UserRole;
import za.uqasho.user.UserStatus;

public record RegistrationResponse(UUID id, String firstName, String lastName, String email, UserRole role, UserStatus status, Instant createdAt) {
}
