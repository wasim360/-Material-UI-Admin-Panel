import { api } from 'Utils/http';

export const activityApi = api.injectEndpoints({
  endpoints: (build) => ({
    createActivity: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `/activities/lookup/create`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['activity'],
    }),
    getActivtyById: build.query<any, number>({
      query: (id) => `/activities/lookup/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'activity', id }],
      // transformResponse: (response) => {
      //   return response;
      // },
      extraOptions: { maxRetries: 1 },
    }),

    getAllActivitise: build.query<any, void>({
      query: () => ({
        url: '/activities/lookup/manage',
      }),
      extraOptions: { maxRetries: 2 },

      providesTags: ['activity'],
    }),
    uploadingImage: build.mutation<any, Partial<any>>({
      query: (payload) => {
        return {
          url: `/activity/image_upload`,
          method: 'PATCH',
          body: payload,
        };
      },
    }),

    updateActicity: build.mutation<any, Partial<any>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/activities/lookup/update/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (activity) => [{ type: 'activity', id: activity?.id }],
    }),
    deleteActivity: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/activities/lookup/delete/${id}`,
          method: 'DELETE',
          extraOptions: { maxRetries: 0 },
        };
      },
      invalidatesTags: (activity) => [{ type: 'activity', id: activity?.id }],
    }),
  }),
});

export const {
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useGetActivtyByIdQuery,
  useGetAllActivitiseQuery,
  useUpdateActicityMutation,
  useUploadingImageMutation,
} = activityApi;
