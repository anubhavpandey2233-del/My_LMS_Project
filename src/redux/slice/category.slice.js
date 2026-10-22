import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utills/url';

const initialState = ({
    isLoading: false,
    category: [],
    error: null

})

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async () => {

        console.log("sd");
        const response = await fetch(BASE_URL + 'category/getAllCategory')

        const cData = await response.json();

        console.log(cData);

        return cData.data

    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (_id) => {
        console.log(_id);

        const response = await fetch(`${BASE_URL}category/deleteCategory/${_id}`, {
            method: 'DELETE'

        })
        const delData = await response.json()
        console.log(delData);

        return delData.data._id
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (data) => {
        const response = await fetch(`${BASE_URL}category/postCategory`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            // headers: {
            //     'Content-Type': 'applicataion/json'
            // }
        })

        const addData = await response.json();

        console.log(addData);

        return addData.data;

    })



const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            console.log(action.payload);

            state.category = state.category.filter((v) => v._id != action.payload)

        }),

            builder.addCase(addCategory.fulfilled, (state, action) => {

                state.category.push(action.payload)

            })


    }

})

export default categorySlice.reducer;