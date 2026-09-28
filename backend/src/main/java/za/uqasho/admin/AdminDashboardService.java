package za.uqasho.admin;

import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import za.uqasho.admin.VerificationDecisionRequest.Decision;
import za.uqasho.user.AppUser;
import za.uqasho.user.UserRepository;
import za.uqasho.user.UserRole;
import za.uqasho.user.UserStatus;

@Service
public class AdminDashboardService {
    private final UserRepository users;
    private final AdminAuditLogRepository auditLogs;

    public AdminDashboardService(UserRepository users, AdminAuditLogRepository auditLogs) {
        this.users = users;
        this.auditLogs = auditLogs;
    }

    @Transactional(readOnly = true)
    public AdminDashboardResponse dashboard() {
        long landlords = users.countByRole(UserRole.LANDLORD);
        return new AdminDashboardResponse(
            users.count(),
            users.countByRole(UserRole.TENANT),
            landlords,
            users.countByRoleAndStatus(UserRole.LANDLORD, UserStatus.ACTIVE),
            users.countByRoleAndStatusAndRejectionReasonIsNull(UserRole.LANDLORD, UserStatus.PENDING_VERIFICATION),
            users.countByRoleAndStatusAndRejectionReasonIsNotNull(UserRole.LANDLORD, UserStatus.PENDING_VERIFICATION)
        );
    }

    @Transactional(readOnly = true)
    public List<VerificationQueueItem> verificationQueue() {
        return users.findByRoleAndStatusOrderByCreatedAtAsc(UserRole.LANDLORD, UserStatus.PENDING_VERIFICATION)
            .stream()
            .map(this::toQueueItem)
            .toList();
    }

    @Transactional
    public VerificationQueueItem decideVerification(UUID landlordId, VerificationDecisionRequest request, String adminUsername) {
        AppUser landlord = users.findById(landlordId)
            .filter(user -> user.getRole() == UserRole.LANDLORD)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Landlord not found"));

        if (landlord.getStatus() != UserStatus.PENDING_VERIFICATION) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Landlord is not awaiting verification");
        }

        if (request.decision() == Decision.REJECT) {
            String reason = request.reason() == null ? "" : request.reason().trim();
            if (reason.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A rejection reason is required");
            }
            landlord.rejectVerification(reason);
            auditLogs.save(new AdminAuditLog(adminUsername, "LANDLORD_REJECTED", "LANDLORD", landlordId, reason));
        } else {
            landlord.approveVerification();
            auditLogs.save(new AdminAuditLog(adminUsername, "LANDLORD_APPROVED", "LANDLORD", landlordId, "Landlord verification approved"));
        }

        return toQueueItem(users.save(landlord));
    }

    private VerificationQueueItem toQueueItem(AppUser user) {
        String status = user.getRejectionReason() == null ? "PENDING" : "REJECTED";
        return new VerificationQueueItem(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), status, user.getRejectionReason(), user.getCreatedAt());
    }
}
