package za.uqasho.admin;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import za.uqasho.auth.RegistrationRequest;
import za.uqasho.user.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
    "uqasho.admin.username=admin",
    "uqasho.admin.password=Password@123"
})
class SubscriptionAdminFlowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository users;

    @Autowired
    private SubscriptionPlanRepository subscriptionPlans;

    @Autowired
    private UserSubscriptionRepository userSubscriptions;

    @BeforeEach
    void setUp() {
        userSubscriptions.deleteAll();
        subscriptionPlans.deleteAll();
        users.deleteAll();
    }

    @Test
    void adminCanCreatePlanAndAssignSubscriptionToTenant() throws Exception {
        mockMvc.perform(post("/api/auth/register/tenant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new RegistrationRequest(
                    "Ava",
                    "Smith",
                    "subscription-user@example.com",
                    "+27761234570",
                    "Password@123",
                    null,
                    null
                ))))
            .andExpect(status().isCreated());

        mockMvc.perform(get("/api/admin/users")
                .with(httpBasic("admin", "Password@123"))
                .param("search", "subscription-user"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].email").value("subscription-user@example.com"));

        mockMvc.perform(post("/api/admin/subscriptions/plans")
                .with(httpBasic("admin", "Password@123"))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Premium Landlord\",\"price\":299.00,\"billingCycle\":\"MONTHLY\",\"description\":\"Highest visibility and premium support\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Premium Landlord"));

        mockMvc.perform(post("/api/admin/subscriptions/users/{userId}/assign?planName=Premium%20Landlord", users.findByEmailIgnoreCase("subscription-user@example.com").orElseThrow().getId())
                .with(httpBasic("admin", "Password@123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("ACTIVE"));

        mockMvc.perform(get("/api/admin/subscriptions")
                .with(httpBasic("admin", "Password@123")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].planName").value("Premium Landlord"));
    }
}
