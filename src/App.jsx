import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/home.jsx";
import {Balances} from "./pages/Balances.jsx";
import {IngresoDatos} from "./pages/ingreso_datos.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Balances" element={<Balances/>} />
                <Route path="/ingreso-datos" element={<IngresoDatos />} />
            </Routes>
        </Router>
    );
};

export default App;
