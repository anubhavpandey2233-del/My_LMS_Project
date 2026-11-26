import React from 'react';
import Layout from '../admin/component/layout/Layout';
import { Route, Routes } from 'react-router';
import Category from '../admin/container/Category/Category';
import Section from '../admin/container/Section/Section';
import Dashboard from '../component/Dashboard/Dashboard';
import Courses from '../admin/container/Courses/Courses';
import Content from '../admin/container/Content/Content';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/category' element={<Category />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/section' element={<Section />} />
                <Route path='/content' element={<Content/>}/>
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;