package za.uqasho.admin;

import java.time.Instant;
import java.util.UUID;

public record VerificationQueueItem(
    UUID id,
    String firstName,
    String lastName,
    String email,
    String status,
    String rejectionReason,
    Instant submittedAt
) {
}
