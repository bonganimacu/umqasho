package za.uqasho.admin;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/subscriptions")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SubscriptionAdminController {
    private final SubscriptionAdminService service;

    public SubscriptionAdminController(SubscriptionAdminService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserSubscriptionResponse> subscriptions() {
        return service.findSubscriptions();
    }

    @GetMapping("/plans")
    public List<SubscriptionPlanResponse> plans() {
        return service.findPlans();
    }

    @PostMapping("/plans")
    @ResponseStatus(HttpStatus.CREATED)
    public SubscriptionPlanResponse createPlan(@Valid @RequestBody SubscriptionPlanRequest request) {
        return service.createPlan(request);
    }

    @PostMapping("/users/{userId}/assign")
    public UserSubscriptionResponse assignSubscription(@PathVariable UUID userId, @RequestParam String planName) {
        return service.assignSubscription(userId, planName);
    }
}
