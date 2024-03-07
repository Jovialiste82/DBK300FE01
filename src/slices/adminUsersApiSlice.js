// frontend/src/slices/adminUsersApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";

const ADMIN_USERS_URL = `${API_BASE_URL}/admin/users`;

export const adminUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Freeze user account
    freezeUserAccount: builder.mutation({
      // Use `query` for a standard request
      query: (username) => ({
        url: `${ADMIN_USERS_URL}/freeze`,
        method: "POST",
        body: { username },
      }),
    }),

    // Reset user password
    resetUserPassword: builder.mutation({
      // Use `query` for a standard request
      query: () => ({
        url: `${ADMIN_USERS_URL}/reset-password`,
        method: "POST",
        // Side effects like setting up Sendgrid and Nodemailer should not be here
        // Must add a body or parameters here later for specifying which user's password to reset
      }),
    }),

    // Get user information
    getUserInfo: builder.query({
      // Use `query` for a standard request
      query: (username) => ({
        url: `${ADMIN_USERS_URL}/info`,
        method: "POST",
        body: JSON.stringify({ username }), // Ensure the body is correctly serialized as JSON
        headers: {
          "Content-Type": "application/json", // Ensure you set the correct content type header
        },
      }),
    }),

    // Get users stats
    getUsersStats: builder.query({
      // Use `query` for a standard request
      query: () => ({
        url: `${ADMIN_USERS_URL}/stats`,
        method: "GET",
        // No body here since it's a GET request. If you need to send data, consider query parameters
      }),
    }),

    // ... other endpoints ...
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useFreezeUserAccountMutation,
  useResetUserPasswordMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useGetUsersStatsQuery,
} = adminUsersApiSlice;
