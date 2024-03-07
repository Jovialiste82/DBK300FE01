// frontend/src/slices/postsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";
const CAPSULES_URL = `${API_BASE_URL}/capsules`;

export const capsulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCapsules: builder.query({
      query: () => ({
        url: CAPSULES_URL,
        method: "GET",
      }),
      providesTags: ["capsule"],
    }),
    // getCapsuleById: builder.query({
    //   query: (capsuleId) => ({
    //     url: `${CAPSULES_URL}/${capsuleId}`,
    //     method: "GET",
    //   }),
    // }),
    addCapsule: builder.mutation({
      query: (data) => ({
        url: CAPSULES_URL,
        method: "POST",
        body: data, // Directly pass the data object
      }),
    }),
    deleteCapsule: builder.mutation({
      query: (capsuleId) => ({
        url: `${CAPSULES_URL}/${capsuleId}`,
        method: "DELETE",
      }),
    }),
    // unlockCapsule: builder.mutation({
    //   query: (capsuleId) => ({
    //     url: `${CAPSULES_URL}/${capsuleId}`,
    //     method: "PUT",
    //   }),
    // }),
  }),
});

export const {
  useGetCapsulesQuery,
  // useGetCapsuleByIdQuery, // Uncomment if using
  useAddCapsuleMutation,
  useDeleteCapsuleMutation,
  // useUnlockCapsuleMutation, // Uncomment if using
} = capsulesApiSlice;
