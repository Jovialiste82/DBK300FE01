// frontend/src/services/apiSlice.js
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://192.168.0.213:5000", // Use the network IP here
    baseUrl: "", // Use an empty string to use relative URLs
    // Include credentials with every request
    credentials: "include", // Use "same-origin" if your API is on the same origin
  }),
  tagTypes: ["user", "post", "capsule"],
  endpoints: (builder) => ({}),
});
