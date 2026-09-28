package za.uqasho.admin;

import java.time.Instant;
import java.util.UUID;
import za.uqasho.user.AppUser;

public record AdminUserSummary(UUID id, String firstName, String lastName, String email, String role, String status, Instant joinedAt) {
    public static AdminUserSummary from(AppUser user) {
        return new AdminUserSummary(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole().name(), user.getStatus().name(), user.getCreatedAt());
    }
}
