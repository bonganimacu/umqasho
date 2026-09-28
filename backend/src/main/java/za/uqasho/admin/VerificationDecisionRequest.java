package za.uqasho.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VerificationDecisionRequest(
    @NotNull Decision decision,
    String reason
) {
    public enum Decision {
        APPROVE,
        REJECT
    }
}
