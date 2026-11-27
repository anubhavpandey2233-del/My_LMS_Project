import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utills/url'

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllCourse: build.query({
            query: () => '/course/getAllCourse',
            // providesTags:['course']

        }),
        addCourse: build.mutation({
            query: (data) => {
                console.log("ffff", data);

                const fd = new FormData()
                fd.append("category_id", data.category_id);
                fd.append("name", data.name);
                fd.append("description", data.description);
                fd.append("fees", data.fees);
                fd.append("level", data.level);
                fd.append("language", data.language);

                for (let i = 0; i < data.course_img?.length; i++) {
                    fd.append("course_img", data.course_img[i]);
                }

                return {
                    url: '/course/postCourse',
                    method: 'POST',
                    body: fd
                }
            },
            // invalidatesTags:['course']

            async onQueryStarted(data, { dispatch, queryFulfilled }) {

                const temp_id = crypto.randomUUID();

                const patchResult = dispatch(
                    // id=undefined -- koi id nhi milega
                    // draft= storeall data
                    courseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {

                        const updatedData = { ...data, _id: temp_id }

                        draft?.data?.push(updatedData)

                        console.log("data", data);


                        // Object.assign(draft, patch)
                    }),
                )
                try {
                    const { data } = await queryFulfilled
                    console.log("data", data);

                    dispatch(
                        courseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {

                            const index = draft?.data?.findIndex(v => v._id == temp_id)

                            console.log("index", index);



                            Object.assign(draft?.data[index], data?.data)
                        })

                    )
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
        deleteCourse: build.mutation({
            query: ({ _id }) => ({
                url: `/course/deleteCourse/${_id}`,
                method: 'DELETE'
            }),
            // invalidatesTags:['course']

            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {



                const patchResult = dispatch(

                    courseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {

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
        editCourse: build.mutation({
            query: (data) => {

                const fd = new FormData()
                fd.append("category_id", data.category_id);
                fd.append("name", data.name);
                fd.append("description", data.description);
                fd.append("fees", data.fees);
                fd.append("level", data.level);
                fd.append("language", data.language);

                for (let i = 0; i < data.course_img?.length; i++) {
                    fd.append("course_img", data.course_img[i]);
                }

                return ({
                    url: `/course/updateCourse/${data._id}`,
                    method: 'PUT',
                    body: fd
                })


            },
            // invalidatesTags:['course']

            async onQueryStarted(data, { dispatch, queryFulfilled }) {

                

                const patchResult = dispatch(

                    courseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {

                        const index = draft?.data?.findIndex(v => v._id ==data?._id)

                        console.log("index", index);



                        Object.assign(draft?.data[index], data)


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

        })
    })
})

export const {
    useGetAllCourseQuery,
    useAddCourseMutation,
    useDeleteCourseMutation,
    useEditCourseMutation
} = courseApi