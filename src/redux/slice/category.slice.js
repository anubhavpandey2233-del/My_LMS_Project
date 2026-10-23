import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utills/url"

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async () => {

        try {
            const response = await fetch(BASE_URL + 'category/getAllCategory')
            const cData = await response.json()

            console.log(cData);


            return cData.data
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
            const response = await fetch(`${BASE_URL}category/deleteCategory/${data._id}`, {
                method: "DELETE"
            })
            const delData = await response.json()

            return delData.data._id
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
        formData.append("category_img", data.category_img)

        try {
            const response = await fetch(BASE_URL + 'category/postCategory', {
                method: "POST",
                body: formData,

            })
            const addData = await response.json()
            return addData.data
        } catch (error) {
            console.log(error);

        }


    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (data) => {

        try {
            const response = await fetch(`${BASE_URL}category/updateCategory/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const updateData = await response.json();

            return updateData.data

        } catch (error) {
            console.log(error);

        }
    }
)

export const searchCategory = createAsyncThunk(
    'category/searchCategory',
    async (data) => {
        const response = await fetch(`${BASE_URL}category/searchbyname/${data}`)

        const searchData = await response.json()

        console.log(searchData);

        return searchData.data
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