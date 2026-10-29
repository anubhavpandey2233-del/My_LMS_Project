import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slice/category.slice'
import courseReducer from "./slice/course.slice";
import sectionReducer from "./slice/section.slice"

export  const store=configureStore({
    reducer:{
        category:categoryReducer,
        course:courseReducer,
        section:sectionReducer
    }
})




