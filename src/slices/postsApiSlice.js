// frontend/src/slices/postsApiSlice.js
import { apiSlice } from "../services/apiSlice";
import { API_BASE_URL } from "../config/constants";
const POSTS_URL = `${API_BASE_URL}/posts`;

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (room) => ({
        url: `${POSTS_URL}?room=${room}`,
        method: "GET",
      }),
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: data, // Directly pass the data object
        headers: {
          "Content-Type": "application/json", // This is correct and necessary
        },
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
    }),
    updatePost: builder.mutation({
      query: (postId, data) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
