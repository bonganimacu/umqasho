package za.uqasho.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import za.uqasho.user.UserRepository;
import za.uqasho.user.UserStatus;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
    "uqasho.admin.username=admin",
    "uqasho.admin.password=Password@123"
})
class AuthControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository users;

    @BeforeEach
    void setUp() {
        users.deleteAll();
    }

    @Test
    void registerTenantCreatesActiveTenantAccount() throws Exception {
        RegistrationRequest request = new RegistrationRequest(
            "Lungisani",
            "Ngubane",
            "tenant@example.com",
            "+27761234567",
            "Password@123",
            null,
            null
        );

        mockMvc.perform(post("/api/auth/register/tenant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("tenant@example.com"))
            .andExpect(jsonPath("$.role").value("TENANT"))
            .andExpect(jsonPath("$.status").value("ACTIVE"));

        assertThat(users.findByEmailIgnoreCase("tenant@example.com"))
            .isPresent()
            .get()
            .extracting(user -> user.getStatus())
            .isEqualTo(UserStatus.ACTIVE);
    }

    @Test
    void tenantCanLoginWithRegisteredCredentials() throws Exception {
        mockMvc.perform(post("/api/auth/register/tenant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new RegistrationRequest(
                    "Lungisani",
                    "Ngubane",
                    "tenant-login@example.com",
                    "+27761234567",
                    "Password@123",
                    null,
                    null
                ))))
            .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"tenant-login@example.com\",\"password\":\"Password@123\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("tenant-login@example.com"))
            .andExpect(jsonPath("$.role").value("TENANT"));
    }

    @Test
    void landlordCanLoginWhilePendingVerification() throws Exception {
        mockMvc.perform(post("/api/auth/register/landlord")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new RegistrationRequest(
                    "Aisha",
                    "Khan",
                    "landlord-login@example.com",
                    "+27761234569",
                    "Password@123",
                    null,
                    null
                ))))
            .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"landlord-login@example.com\",\"password\":\"Password@123\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("landlord-login@example.com"))
            .andExpect(jsonPath("$.role").value("LANDLORD"))
            .andExpect(jsonPath("$.status").value("PENDING_VERIFICATION"));
    }

    @Test
    void registerLandlordAcceptsLocalSouthAfricanPhoneNumber() throws Exception {
        mockMvc.perform(post("/api/auth/register/landlord")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new RegistrationRequest(
                    "Local",
                    "Number",
                    "local-phone-landlord@example.com",
                    "071 234 5678",
                    "Password@123",
                    null,
                    null
                ))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("local-phone-landlord@example.com"));

        assertThat(users.findByEmailIgnoreCase("local-phone-landlord@example.com"))
            .isPresent()
            .get()
            .extracting(user -> user.getPhone())
            .isEqualTo("+27712345678");
    }

    @Test
    void adminDashboardAllowsLocalFrontendOrigin() throws Exception {
        mockMvc.perform(options("/api/admin/dashboard")
                .header("Origin", "http://localhost:5176")
                .header("Access-Control-Request-Method", "GET")
                .header("Access-Control-Request-Headers", "Authorization,Content-Type"))
            .andExpect(status().isOk())
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5176"));
    }

    @Test
    void adminCanReviewPendingLandlordRegistration() throws Exception {
        RegistrationRequest request = new RegistrationRequest(
            "Aisha",
            "Khan",
            "landlord@example.com",
            "+27761234568",
            "Password@123",
            null,
            null
        );

        mockMvc.perform(post("/api/auth/register/landlord")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("landlord@example.com"))
            .andExpect(jsonPath("$.role").value("LANDLORD"))
            .andExpect(jsonPath("$.status").value("PENDING_VERIFICATION"));

        UUID landlordId = users.findByEmailIgnoreCase("landlord@example.com")
            .orElseThrow()
            .getId();

        mockMvc.perform(get("/api/admin/verifications")
                .with(httpBasic("admin", "Password@123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].email").value("landlord@example.com"))
            .andExpect(jsonPath("$[0].status").value("PENDING"));

        mockMvc.perform(put("/api/admin/verifications/{landlordId}", landlordId)
                .with(httpBasic("admin", "Password@123"))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"decision\":\"APPROVE\",\"reason\":\"\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(landlordId.toString()));

        mockMvc.perform(get("/api/admin/verifications")
                .with(httpBasic("admin", "Password@123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0]").doesNotExist());

        assertThat(users.findByEmailIgnoreCase("landlord@example.com"))
            .isPresent()
            .get()
            .extracting(user -> user.getStatus())
            .isEqualTo(UserStatus.ACTIVE);
    }
}
