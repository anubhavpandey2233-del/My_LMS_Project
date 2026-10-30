import {  useReducer } from "react"
import { ThemeReducer } from "./Theme.reducer"
import { TOOGLE_THEME } from "../ActionTypes"
import { createContext } from "react"


const initialStates = {
    Theme: 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialStates)

    const changTheme = () => {
        dispatch({ type: TOOGLE_THEME, payload: state.theme === 'light' ? 'dark' : 'light' })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                changTheme
            }}
        >
            {
               children 
            }
        </ThemeContext.Provider>
    )
}