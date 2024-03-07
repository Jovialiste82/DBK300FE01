// frontend/src/slices/postsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";
const COUPONS_URL = `${API_BASE_URL}/coupons`;

export const capsulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateInvitationCode: builder.mutation({
      query: (data) => ({
        url: COUPONS_URL,
        method: "POST",
        body: data, // Directly pass the data object
      }),
    }),
    deleteInvitationCode: builder.mutation({
      query: (codeId) => ({
        url: `${COUPONS_URL}/${codeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGenerateInvitationCodeMutation,
  useDeleteInvitationCodeMutation,
} = capsulesApiSlice;
