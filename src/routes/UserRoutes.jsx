import React, { useContext } from 'react';
import Contact from '../container/Contact';
import Home from '../container/Home/Home';
import { Route, Routes } from 'react-router';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import { ThemeContext } from '../context/reducer/ThemeContext';

function UserRoutes(props) {
    const theme = useContext(ThemeContext)
    return (
        <div className={theme.theme}>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={Contact} />
            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoutes;