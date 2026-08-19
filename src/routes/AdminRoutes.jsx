import React from 'react';
import Layout from '../admin/component/layout/Layout';
import { Route, Routes } from 'react-router';
import Category from '../admin/container/Category/Category';
import Courses from '../admin/container/Courses/Courses';
import Section from '../admin/container/Section/Section';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route path='/category' element={<Category />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/section' element={<Section />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;