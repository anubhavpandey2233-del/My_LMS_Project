import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utills/url"
import axios from "axios"

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async () => {

        try {
            const response=await axios.get(BASE_URL + 'category/getAllCategory')

            // const response = await fetch(BASE_URL + 'category/getAllCategory')
            // const cData = await response.json()

            // console.log(cData);

            console.log("responsedata",response);
            

            return response.data.data
            // return cData.data
        } catch (error) {
            console.log(error);

        }


    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (data) => {

        console.log(data);

        try {

            const response=await axios.delete(`${BASE_URL}category/deleteCategory/${data._id}`)

            // const response = await fetch(`${BASE_URL}category/deleteCategory/${data._id}`, {
            //     method: "DELETE"
            // })
            // const delData = await response.json()

            return response.data._id
        } catch (error) {
            console.log(error);

        }


    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (data) => {
        console.log(data);

        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)


        for (let i = 0; i < data?.category_img?.length; i++) {
            formData.append("category_img", data?.category_img[i])

            console.log("data?.category_img[i]data?.category_img[i]data?.category_img[i]", data?.category_img[i]);

        }

        console.log("data.category_imgdata.category_imgdata.category_img", data.category_img);


        try {

            const response=await axios.post(BASE_URL + 'category/postCategory',formData)

            // const response = await fetch(BASE_URL + 'category/postCategory', {
            //     method: "POST",
            //     body: formData,

            // })
            // const addData = await response.json()
            // return addData.data

            return response?.data
        } catch (error) {
            console.log(error);

        }


    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (data) => {

        try {

            const response=await axios.put(`${BASE_URL}category/updateCategory/${data._id}`)

            // const response = await fetch(`${BASE_URL}category/updateCategory/${data._id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // })
            // const updateData = await response.json();

            return response.data

        } catch (error) {
            console.log(error);

        }
    }
)

export const searchCategory = createAsyncThunk(
    'category/searchCategory',
    async (data) => {

        const response=await axios(`${BASE_URL}category/searchbyname/${data}`)

        // const response = await fetch(`${BASE_URL}category/searchbyname/${data}`)

        // const searchData = await response.json()

        // console.log(searchData);

        return response.data
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.category = state.category.filter((v) => v._id !== action.payload)
        })


        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.category.push(action.payload)
        })


        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const index = state.category.findIndex(
                (v) => v._id === action.payload._id
            );
            console.log(index);

            state.category[index] = action.payload

        })

        builder.addCase(searchCategory.fulfilled, (state, action) => {
            state.category = action.payload
        })


    }
})

export default categorySlice.reducer;