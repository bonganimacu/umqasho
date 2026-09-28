package za.uqasho.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "admin_audit_logs")
public class AdminAuditLog {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false, length = 120, updatable = false)
    private String adminUsername;

    @Column(nullable = false, length = 60, updatable = false)
    private String action;

    @Column(nullable = false, length = 60, updatable = false)
    private String targetType;

    @Column(nullable = false, updatable = false)
    private UUID targetId;

    @Column(nullable = false, length = 1000, updatable = false)
    private String description;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    protected AdminAuditLog() {
    }

    public AdminAuditLog(String adminUsername, String action, String targetType, UUID targetId, String description) {
        this.adminUsername = adminUsername;
        this.action = action;
        this.targetType = targetType;
        this.targetId = targetId;
        this.description = description;
    }

    @PrePersist
    void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (createdAt == null) createdAt = Instant.now();
    }
}
