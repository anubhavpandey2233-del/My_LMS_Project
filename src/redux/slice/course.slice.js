import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utills/url"

const initialState = {
    isLoading: false,
    course: [],
    error: null
}

export const fetchCourses = createAsyncThunk(
    'course/fetchCourses',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'course/getAllCourse')

            return response.data.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteCourse = createAsyncThunk(
    'course/deleteCourse',
    async (data) => {
        console.log(data)
        try {
            const response = await axios.delete(`${BASE_URL}course/deleteCourse/${data._id}`)
            console.log("Okk COURse");


            return response.data._id
        } catch (error) {
            console.log(error)
        }
    }
)

export const addCourse = createAsyncThunk(
    'course/addCourse',
    async (data) => {
        const fd = new FormData()
        fd.append("category_id", data.category_id);
        fd.append("name", data.name);
        fd.append("description", data.description);
        fd.append("fees", data.fees);

        for (let i = 0; i < data.course_img?.length; i++) {
            fd.append("course_img", data.course_img[i]);
        }


        try {
            const response = await axios.post(BASE_URL + 'course/postCourse', fd)
            return response.data.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const searchCourse = createAsyncThunk(
    'course/searchByName',
    async (data) => {
        try {
            const response = await axios.get(`${BASE_URL}course//getCourseByName/${data}`)

            return response.data
        } catch (error) {
            console.log(error);
            
        }
    }
)


const courseSlice = createSlice({
    name: 'course',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.course = action.payload
        })
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.course = state.course.filter((v) => v._id !== action.payload)
        })
        builder.addCase(addCourse.fulfilled, (state, action) => {
            if (action.payload) {
                state.course.push(action.payload);
            }
        })
        builder.addCase(searchCourse.fulfilled, (state, action) => {
            state.course = action.payload
        })
    }
})

export default courseSlice.reducer;