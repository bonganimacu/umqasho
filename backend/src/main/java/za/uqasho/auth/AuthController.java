package za.uqasho.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import za.uqasho.user.UserRole;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/tenant")
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationResponse registerTenant(@Valid @RequestBody RegistrationRequest request) {
        return authService.register(request, UserRole.TENANT);
    }

    @PostMapping("/register/landlord")
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationResponse registerLandlord(@Valid @RequestBody RegistrationRequest request) {
        return authService.register(request, UserRole.LANDLORD);
    }

    @PostMapping("/login")
    public RegistrationResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
