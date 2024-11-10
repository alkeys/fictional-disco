import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/home.jsx";
import {Balances} from "./pages/Balances.jsx";
import {IngresoDatos} from "./pages/ingreso_datos.jsx";
import {Resultados} from "./pages/Resultados.jsx";
import {ModificarDatos} from "./pages/modificar_datos.jsx";
import {VistaBalances} from "./pages/VistaBalances.jsx";
import {VistaResultados} from "./pages/VistaResultados.jsx";
import {EstadosDinamicos} from "./pages/EstadosDinamicos.jsx";
import {VistaAnalisis} from "./pages/Analisis/VistaAnalisis.jsx";
import {AnalisisDinamico} from "./pages/Analisis/AnalisisDinamico.jsx";
import {AnalisisEstatico} from "./pages/Analisis/AnalisisEstatico.jsx";
import Integrantes from './pages/Integrantes.jsx';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Balances" element={<Balances/>} />
                <Route path="/ingreso-datos" element={<IngresoDatos />} />
                <Route path="/estado-resultados" element={<Resultados />} />
                <Route path="/modificar-datos" element={<ModificarDatos />} />
                <Route path="/Analisis" element={<VistaAnalisis/>} />
                <Route path='/VistaBalances' element={<VistaBalances/>} />
                <Route path='/VistaResultados' element={<VistaResultados/>} />
                <Route path='/estados_dinamicos' element={<EstadosDinamicos/>} />
                <Route path='/integrantes' element={<Integrantes/>} />
                {/*            Router de analisis financiero*/}
                <Route path="/Analisis-Estatico" element={<AnalisisEstatico/>} />
                <Route path="/Analisis-Dinamico" element={<AnalisisDinamico/>} />
            </Routes>

        </Router>
    );
};

export default App;
