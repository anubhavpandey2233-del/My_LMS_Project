import React, { useContext } from 'react';
import Layout from '../admin/component/layout/Layout';
import { Route, Routes } from 'react-router';
import Category from '../admin/container/Category/Category';
import Section from '../admin/container/Section/Section';
import Dashboard from '../component/Dashboard/Dashboard';
import Courses from '../admin/container/Courses/Courses';
import Content from '../admin/container/Content/Content';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeContext } from '../context/reducer/ThemeContext';

function AdminRoutes(props) {

    const myTheme = useContext(ThemeContext)

    const theme = createTheme({
        palette: {
            mode:myTheme.theme,
            primary: {
                main: '#0079F5',
            },
            secondary: {
                main: '#edf2ff',
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>

            <Layout>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/courses' element={<Courses />} />
                    <Route path='/section' element={<Section />} />
                    <Route path='/content' element={<Content />} />
                </Routes>
            </Layout>

        </ThemeProvider>
    );
}

export default AdminRoutes;