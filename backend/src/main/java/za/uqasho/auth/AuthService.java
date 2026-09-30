package za.uqasho.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import za.uqasho.user.AppUser;
import za.uqasho.user.UserRepository;
import za.uqasho.user.UserRole;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    public RegistrationResponse register(RegistrationRequest request, UserRole role) {
        String email = request.email().trim().toLowerCase();
        String phone = request.phone().replaceAll("[\\s-]", "");
        if (phone.matches("^0[6-8][0-9]{8}$")) {
            phone = "+27" + phone.substring(1);
        } else if (phone.matches("^27[6-8][0-9]{8}$")) {
            phone = "+" + phone;
        }
        if (users.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
        }
        if (request.password().contains(email) || request.password().contains(request.firstName().trim().toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is too similar to your personal information");
        }
        AppUser user = new AppUser(request.firstName().trim(), request.lastName().trim(), email,
            phone, passwordEncoder.encode(request.password()), role);
        AppUser saved = users.save(user);
        return new RegistrationResponse(saved.getId(), saved.getFirstName(), saved.getLastName(), saved.getEmail(), saved.getRole(), saved.getStatus(), saved.getCreatedAt());
    }

    public RegistrationResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        AppUser user = users.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        boolean isActiveUser = user.getStatus() == za.uqasho.user.UserStatus.ACTIVE;
        boolean isPendingLandlord = user.getRole() == za.uqasho.user.UserRole.LANDLORD
            && user.getStatus() == za.uqasho.user.UserStatus.PENDING_VERIFICATION;

        if (!isActiveUser && !isPendingLandlord) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is not active");
        }

        return new RegistrationResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole(), user.getStatus(), user.getCreatedAt());
    }
}
