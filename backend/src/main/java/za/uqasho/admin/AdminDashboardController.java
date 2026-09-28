package za.uqasho.admin;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
    private final AdminDashboardService dashboard;

    public AdminDashboardController(AdminDashboardService dashboard) {
        this.dashboard = dashboard;
    }

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        return dashboard.dashboard();
    }

    @GetMapping("/verifications")
    public List<VerificationQueueItem> verificationQueue() {
        return dashboard.verificationQueue();
    }

    @PutMapping("/verifications/{landlordId}")
    public VerificationQueueItem decideVerification(
        @PathVariable UUID landlordId,
        @Valid @RequestBody VerificationDecisionRequest request,
        Authentication authentication
    ) {
        return dashboard.decideVerification(landlordId, request, authentication.getName());
    }
}
