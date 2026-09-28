package za.uqasho.admin;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record SubscriptionPlanRequest(
    @NotBlank @Size(max = 120) String name,
    @NotNull @DecimalMin(value = "0.00", inclusive = false) BigDecimal price,
    @NotNull SubscriptionPlan.BillingCycle billingCycle,
    @NotBlank @Size(max = 500) String description
) {
}
