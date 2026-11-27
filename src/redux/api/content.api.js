import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utills/url'

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllContent: build.query({
            query: () => '/content/getAllContent',
            // providesTags: ['course']
        }),
        addContent: build.mutation({
            query: (data) => {
                console.log("ffff", data);

                const fd = new FormData()
                fd.append("category_id", data.category_id);
                fd.append("course_id", data.course_id);
                fd.append("section_id", data.section_id);
                fd.append("type", data.type);
                fd.append("name", data.name);
                fd.append("order", data.order);
                fd.append("description", data.description);
                fd.append("content_file", data.content_file);


                return {
                    url: '/content/postContent',
                    method: 'POST',
                    body: fd
                }
            },
            // invalidatesTags:['course']

            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                 
                    contentApi.util.updateQueryData('getAllContent', undefined, (draft) => {

                        const temp_id = crypto.randomUUID();

                        const updatedData = { ...data, _id: temp_id }

                        draft?.data?.push(updatedData)

                        console.log("data", data);


                        // Object.assign(draft, patch)
                    }),
                )
                try {
                    const { data } = await queryFulfilled

                    contentApi.util.updateQueryData('getAllContent', undefined, (draft) => {

                        const index = draft?.data?.findIndex(v => v._id == temp_id)


                        Object.assign(draft?.data[index], data?.data)
                    })
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },

        }),
        deleteContent: build.mutation({
            query: ({ _id }) => ({
                url: `/content/deleteContent/${_id}`,
                method: 'DELETE'
            }),
            // invalidatesTags:['course']

            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {



                const patchResult = dispatch(

                    contentApi.util.updateQueryData('getAllContent', undefined, (draft) => {

                        const index = draft?.data?.findIndex(v => v._id == _id)

                        draft?.data?.splice(index, 1)

                        // Object.assign(draft, patch)
                    }),
                )
                try {
                    await queryFulfilled

                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },

        }),
        editContent: build.mutation({
            query: (data) => {

                const fd = new FormData()
                fd.append("category_id", data.category_id);
                fd.append("course_id", data.course_id);
                fd.append("section_id", data.section_id);
                fd.append("type", data.type);
                fd.append("name", data.name);
                fd.append("order", data.order);
                fd.append("description", data.description);
                if (data.content_file && typeof data.content_file !== "string") {
                    fd.append("content_file", data.content_file);
                }

                return ({
                    url: `/content/updateContent/${data._id}`,
                    method: 'PUT',
                    body: fd
                })


            },
            // invalidatesTags:['course']

        })
    })
})

export const {
    useGetAllContentQuery,
    useAddContentMutation,
    useDeleteContentMutation,
    useEditContentMutation
} = contentApi