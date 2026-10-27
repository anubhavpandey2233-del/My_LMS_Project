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

const courseSlice = createSlice({
    name: 'course',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.course = action.payload
        })
    }
})

export default courseSlice.reducer;