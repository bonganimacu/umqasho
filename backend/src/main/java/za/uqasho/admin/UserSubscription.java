package za.uqasho.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "user_subscriptions")
public class UserSubscription {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false, updatable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private SubscriptionPlan plan;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @Column(nullable = false, updatable = false)
    private Instant startedAt;

    @Column(nullable = true)
    private Instant expiresAt;

    protected UserSubscription() {
    }

    public UserSubscription(UUID userId, SubscriptionPlan plan) {
        this.userId = userId;
        this.plan = plan;
        this.status = Status.ACTIVE;
        this.startedAt = Instant.now();
    }

    @PrePersist
    void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (startedAt == null) startedAt = Instant.now();
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public SubscriptionPlan getPlan() { return plan; }
    public Status getStatus() { return status; }
    public Instant getStartedAt() { return startedAt; }
    public Instant getExpiresAt() { return expiresAt; }

    public void activate() { this.status = Status.ACTIVE; }
    public void suspend() { this.status = Status.SUSPENDED; }
    public void cancel() { this.status = Status.CANCELLED; }

    public enum Status {
        ACTIVE,
        SUSPENDED,
        CANCELLED
    }
}
