package za.uqasho.admin;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import za.uqasho.user.UserRepository;
import za.uqasho.user.UserRole;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private final UserRepository users;

    public AdminUserController(UserRepository users) {
        this.users = users;
    }

    @GetMapping
    public List<AdminUserSummary> users(
        @RequestParam(required = false) UserRole role,
        @RequestParam(defaultValue = "") String search
    ) {
        return users.searchAdminUsers(role, null, search.trim(), PageRequest.of(0, 100, Sort.by(Sort.Direction.DESC, "createdAt")))
            .map(AdminUserSummary::from)
            .getContent();
    }
}
