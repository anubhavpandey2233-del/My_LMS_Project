import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utills/url'

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllContent: build.query({
            query: () => '/content/getAllContent'
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
            }
        }),
        deleteContent: build.mutation({
            query: ({ _id }) => ({
                url: `/content/deleteContent/${_id}`,
                method: 'DELETE'
            })
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


            }

        })
    })
})

export const {
    useGetAllContentQuery,
    useAddContentMutation,
    useDeleteContentMutation,
    useEditContentMutation
} = contentApi