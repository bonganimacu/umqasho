package za.uqasho.admin;

import java.time.Instant;
import java.util.UUID;

public record UserSubscriptionResponse(
    UUID id,
    UUID userId,
    String planName,
    String status,
    Instant startedAt,
    Instant expiresAt
) {
}
