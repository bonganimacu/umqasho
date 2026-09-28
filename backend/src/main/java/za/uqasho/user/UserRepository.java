package za.uqasho.user;

import java.util.Optional;
import java.util.UUID;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<AppUser, UUID> {
    boolean existsByEmailIgnoreCase(String email);
    Optional<AppUser> findByEmailIgnoreCase(String email);
    long countByRole(UserRole role);
    long countByRoleAndStatus(UserRole role, UserStatus status);
    long countByRoleAndStatusAndRejectionReasonIsNull(UserRole role, UserStatus status);
    long countByRoleAndStatusAndRejectionReasonIsNotNull(UserRole role, UserStatus status);
    List<AppUser> findByRoleAndStatusOrderByCreatedAtAsc(UserRole role, UserStatus status);

        @Query("""
                select user from AppUser user
                where (:role is null or user.role = :role)
                    and (:status is null or user.status = :status)
                    and (:search = '' or lower(concat(user.firstName, ' ', user.lastName, ' ', user.email)) like concat('%', :search, '%'))
                """)
        Page<AppUser> searchAdminUsers(@Param("role") UserRole role,
                                                                     @Param("status") UserStatus status,
                                                                     @Param("search") String search,
                                                                     Pageable pageable);
}
