package za.uqasho.admin;

public record AdminDashboardResponse(
    long totalUsers,
    long totalTenants,
    long totalLandlords,
    long verifiedLandlords,
    long pendingVerifications,
    long rejectedVerifications
) {
}
