package za.uqasho.admin;

import java.time.Instant;
import java.util.UUID;

public record AdminAuditSummary(UUID id, String adminUsername, String action, String targetType, UUID targetId, String description, Instant createdAt) {
}
