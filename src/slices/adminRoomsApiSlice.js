// frontend/src/slices/adminRoomsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";

const ADMIN_ROOMS_URL = `${API_BASE_URL}/admin/rooms`;

export const adminRoomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data for a specific room
    getRoomsStats: builder.query({
      query: () => `${ADMIN_ROOMS_URL}/stats`,
    }),
    // You can add more admin-specific endpoints here as needed
  }),
});

export const { useGetRoomsStatsQuery } = adminRoomsApiSlice;
