package za.uqasho.admin;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record SubscriptionPlanResponse(
    UUID id,
    String name,
    BigDecimal price,
    SubscriptionPlan.BillingCycle billingCycle,
    String description,
    Instant createdAt
) {
}
