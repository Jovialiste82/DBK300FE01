// frontend/src/slices/adminPostsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";
const ADMIN_POSTS_URL = `${API_BASE_URL}/admin/posts`;

export const adminPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Adding an admin-specific action to hide a post
    hidePost: builder.mutation({
      query: (postId) => ({
        url: `${ADMIN_POSTS_URL}/${postId}`,
        method: "PATCH", // Using PATCH to indicate a partial update
        body: {
          isHidden: true, // Assuming the backend expects this payload to hide the post
        },
      }),
    }),
    // You can add more admin-specific endpoints here as needed
  }),
});

export const {
  useHidePostMutation, // Exporting the hook to use in components
} = adminPostsApiSlice;
