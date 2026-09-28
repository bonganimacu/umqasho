package za.uqasho.admin;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import za.uqasho.user.AppUser;
import za.uqasho.user.UserRepository;

@Service
public class SubscriptionAdminService {
    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionRepository subscriptionRepository;
    private final UserRepository users;

    public SubscriptionAdminService(SubscriptionPlanRepository planRepository,
                                   UserSubscriptionRepository subscriptionRepository,
                                   UserRepository users) {
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.users = users;
    }

    @Transactional
    public SubscriptionPlanResponse createPlan(SubscriptionPlanRequest request) {
        if (planRepository.findByNameIgnoreCase(request.name().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A subscription plan with that name already exists");
        }

        SubscriptionPlan plan = new SubscriptionPlan(
            request.name().trim(),
            request.price().setScale(2, java.math.RoundingMode.HALF_UP),
            request.billingCycle(),
            request.description().trim()
        );

        SubscriptionPlan saved = planRepository.save(plan);
        return toPlanResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<SubscriptionPlanResponse> findPlans() {
        return planRepository.findAll().stream().map(this::toPlanResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<UserSubscriptionResponse> findSubscriptions() {
        return subscriptionRepository.findAllByOrderByStartedAtDesc().stream().map(this::toSubscriptionResponse).toList();
    }

    @Transactional
    public UserSubscriptionResponse assignSubscription(UUID userId, String planName) {
        AppUser user = users.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String normalizedPlanName = normalizePlanName(planName);
        SubscriptionPlan plan = planRepository.findByNameIgnoreCase(normalizedPlanName)
            .or(() -> planRepository.findAll().stream()
                .filter(existing -> normalizePlanName(existing.getName()).equals(normalizedPlanName))
                .findFirst())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscription plan not found"));

        UserSubscription active = subscriptionRepository.findFirstByUserIdOrderByStartedAtDesc(userId)
            .orElse(null);
        if (active != null && active.getStatus() == UserSubscription.Status.ACTIVE) {
            active.suspend();
            subscriptionRepository.save(active);
        }

        UserSubscription subscription = new UserSubscription(user.getId(), plan);
        subscriptionRepository.save(subscription);

        return toSubscriptionResponse(subscription);
    }

    private String normalizePlanName(String planName) {
        if (planName == null) {
            return "";
        }

        try {
            return URLDecoder.decode(planName.trim(), StandardCharsets.UTF_8)
                .replaceAll("\\s+", " ")
                .trim();
        } catch (IllegalArgumentException e) {
            return planName.trim().replaceAll("\\s+", " ");
        }
    }

    private SubscriptionPlanResponse toPlanResponse(SubscriptionPlan plan) {
        return new SubscriptionPlanResponse(plan.getId(), plan.getName(), plan.getPrice(), plan.getBillingCycle(), plan.getDescription(), plan.getCreatedAt());
    }

    private UserSubscriptionResponse toSubscriptionResponse(UserSubscription subscription) {
        return new UserSubscriptionResponse(
            subscription.getId(),
            subscription.getUserId(),
            subscription.getPlan().getName(),
            subscription.getStatus().name(),
            subscription.getStartedAt(),
            subscription.getExpiresAt()
        );
    }
}
