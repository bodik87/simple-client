import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Notes"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://localhost:5005/server" ||
      "https://simple-server-ue0u.onrender.com/server",
  }),
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: () => `notes`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Notes", id })),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
    }),
    getNote: builder.query({
      query: (id) => `note/${id}`,
    }),
    createNote: builder.mutation({
      query(body) {
        return {
          url: `create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query(data) {
        const body = data;
        return {
          url: `update`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),
    deleteNote: builder.mutation({
      query(body) {
        return {
          url: `delete`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = notesApi;
