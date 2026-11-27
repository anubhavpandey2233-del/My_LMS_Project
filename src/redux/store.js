import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slice/category.slice'
import courseReducer from "./slice/course.slice";
import sectionReducer from "./slice/section.slice"
import { courseApi } from "./api/course.api";
import { contentApi } from "./api/content.api";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        course: courseReducer,
        section: sectionReducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [contentApi.reducerPath]: contentApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(courseApi.middleware)
            .concat(contentApi.middleware)




});