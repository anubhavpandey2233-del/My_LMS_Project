import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utills/url'

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllCourse: build.query({
            query: () => '/course/getAllCourse'
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
            }
        }),
        deleteCourse: build.mutation({
            query: ({ _id }) => ({
                url: `/course/deleteCourse/${_id}`,
                method: 'DELETE'
            })
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


            }

        })
    })
})

export const {
    useGetAllCourseQuery,
    useAddCourseMutation,
    useDeleteCourseMutation,
    useEditCourseMutation
} = courseApi