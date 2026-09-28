package za.uqasho.admin;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, UUID> {
    Optional<UserSubscription> findFirstByUserIdOrderByStartedAtDesc(UUID userId);
    List<UserSubscription> findByUserIdOrderByStartedAtDesc(UUID userId);
    List<UserSubscription> findAllByOrderByStartedAtDesc();
}
