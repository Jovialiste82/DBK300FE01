// frontend/src/slices/adminCouponsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";

const ADMIN_COUPONS_URL = `${API_BASE_URL}/admin/coupons`;

export const adminCouponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get count of all coupons
    getCouponsCount: builder.query({
      query: () => ({
        url: `${ADMIN_COUPONS_URL}/count`,
        method: "GET",
      }),
    }),

    // Create a coupon
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: `${ADMIN_COUPONS_URL}/create`,
        method: "POST",
        body: couponData, // Assuming `couponData` is already an object with the right structure
      }),
    }),

    // Freeze a coupon
    freezeCoupon: builder.mutation({
      query: (label) => ({
        url: `${ADMIN_COUPONS_URL}/freeze`,
        method: "PATCH",
        body: { label }, // Assuming the backend identifies the coupon to freeze by its `label`
      }),
    }),

    // ... other endpoints as needed ...
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useGetCouponsCountQuery,
  useCreateCouponMutation,
  useFreezeCouponMutation,
} = adminCouponsApiSlice;
