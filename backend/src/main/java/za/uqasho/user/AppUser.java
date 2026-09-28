package za.uqasho.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class AppUser {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false, length = 80)
    private String firstName;

    @Column(nullable = false, length = 80)
    private String lastName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UserStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(columnDefinition = "text")
    private String rejectionReason;

    private Instant verifiedAt;

    protected AppUser() {
    }

    @PrePersist
    void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID();
        }
        if (this.createdAt == null) {
            this.createdAt = Instant.now();
        }
        if (this.status == null) {
            this.status = role == UserRole.LANDLORD ? UserStatus.PENDING_VERIFICATION : UserStatus.ACTIVE;
        }
    }

    public AppUser(String firstName, String lastName, String email, String phone, String passwordHash, UserRole role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.passwordHash = passwordHash;
        this.role = role;
        this.createdAt = Instant.now();
        this.status = role == UserRole.LANDLORD ? UserStatus.PENDING_VERIFICATION : UserStatus.ACTIVE;
    }

    public UUID getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getPasswordHash() { return passwordHash; }
    public UserRole getRole() { return role; }
    public UserStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public String getRejectionReason() { return rejectionReason; }
    public Instant getVerifiedAt() { return verifiedAt; }

    public void approveVerification() {
        this.status = UserStatus.ACTIVE;
        this.rejectionReason = null;
        this.verifiedAt = Instant.now();
    }

    public void rejectVerification(String reason) {
        this.status = UserStatus.PENDING_VERIFICATION;
        this.rejectionReason = reason;
        this.verifiedAt = null;
    }
}
