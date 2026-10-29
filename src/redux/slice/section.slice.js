
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utills/url"
import axios from "axios"

const initialState = {
    isLoading: false,
    section: [],
    error: null
}

export const fetchSection = createAsyncThunk(
    'section/fetchSection',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'section/getSection')
            console.log("responsedata", response)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteSection = createAsyncThunk(
    'section/deleteSection',
    async (data) => {
        console.log(data)

        try {
            const response = await axios.delete(`${BASE_URL}section/deleteSection/${data._id}`)
            return response.data.data._id
        } catch (error) {
            console.log(error)
        }
    }
)

export const addSection = createAsyncThunk(
    'section/addSection',
    async (data) => {
        console.log(data)

        try {
            const response = await axios.post(
                BASE_URL + 'section/postSection',
                data
            )
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateSection = createAsyncThunk(
    'section/updateSection',
    async (data) => {
        try {
            const response = await axios.put(`${BASE_URL}section/updateSection/${data._id}`,data)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const searchSection = createAsyncThunk(
    'section/searchSection',
    async (data) => {
        try {
            const response = await axios.get(`${BASE_URL}section/searchbyname/${(data)}`)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

const sectionSlice = createSlice({
    name: 'section',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchSection.fulfilled, (state, action) => {
            state.section = action.payload
        })

        builder.addCase(deleteSection.fulfilled, (state, action) => {
            state.section = state.section.filter((v) => v._id !== action.payload)

        })

        builder.addCase(addSection.fulfilled, (state, action) => {
            if (action.payload) {
                state.section.push(action.payload)
            }
        })


        builder.addCase(updateSection.fulfilled, (state, action) => {
            const index = state.section.findIndex(
                (v) => v._id === action.payload._id
            );
            console.log(index);

            state.section[index] = action.payload

        })


        builder.addCase(searchSection.fulfilled, (state, action) => {
            state.section = action.payload
        })
    }
})

export default sectionSlice.reducer
