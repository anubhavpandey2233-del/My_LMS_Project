import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slice/category.slice'
import courseReducer from "./slice/course.slice";
import sectionReducer from "./slice/section.slice"
import { courseApi } from "./api/course.api";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        course: courseReducer,
        section: sectionReducer,
        [courseApi.reducerPath]: courseApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(courseApi.middleware),
})




