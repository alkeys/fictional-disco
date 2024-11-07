import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/home.jsx";
import {Balances} from "./pages/Balances.jsx";
import {IngresoDatos} from "./pages/ingreso_datos.jsx";
import {Resultados} from "./pages/Resultados.jsx";
import {ModificarDatos} from "./pages/modificar_datos.jsx";
import {Analisis} from "./pages/Analisis.jsx";
import {VistaBalances} from "./pages/VistaBalances.jsx";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Balances" element={<Balances/>} />
                <Route path="/ingreso-datos" element={<IngresoDatos />} />
                <Route path="/estado-resultados" element={<Resultados />} />
                <Route path="/modificar-datos" element={<ModificarDatos />} />
                <Route path="/Analisis" element={<Analisis/>} />
                <Route path='/VistaBalances' element={<VistaBalances/>} />
            </Routes>
        </Router>
    );
};

export default App;
