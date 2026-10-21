import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import FormProduct from "./components/FormProduct";
import Home from "./components/Home";
import ProductView from "./components/ProductView";
import {AuthProvider} from "./context/AuthContext";
import {ProtectedRoute} from "./components/SubApp/ProtectedRouter";
import Navbar from "./components/SubApp/NavBar";


function App()
{

    return (


        <Router>
            <AuthProvider>
            <Navbar></Navbar>
            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/register" element={<RegisterForm />} />

                    <Route path="/product" element={<ProductView />} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add/product" element={<FormProduct />} />
                    </Route>
                    <Route path="*" element={<h2>Strona nie istnieje (404)</h2>} />
                </Routes>
            </div>
            </AuthProvider>
        </Router>

    );
}

export default App;