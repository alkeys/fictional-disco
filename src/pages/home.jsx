import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-600">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Cursive' }}>
                    Bienvenido a Coca-Cola Financials
                </h1>
                <p className="text-gray-800 mb-8">
                    Tu herramienta de análisis financiero con la energía y frescura de Coca-Cola. ¡Explora reportes,
                    revisa balances generales, y más!
                </p>

                <div className="flex flex-wrap justify-center space-x-4">
                    <NavLink
                        to="/analisis"
                        className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-md"
                        aria-label="Ir a Análisis de Datos"
                    >
                        Análisis de Datos
                    </NavLink>

                    <NavLink
                        to="/reportes"
                        className="bg-white hover:bg-gray-200 transition duration-300 ease-in-out text-red-600 font-bold py-2 px-6 rounded-lg shadow-md border border-red-600"
                        aria-label="Ir a Reportes"
                    >
                        Reportes
                    </NavLink>

                    <NavLink
                        to="/configuracion"
                        className="bg-black hover:bg-gray-800 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-md"
                        aria-label="Ir a Configuración"
                    >
                        Configuración
                    </NavLink>

                    <NavLink
                        to="/balances"
                        className="bg-white hover:bg-gray-200 transition duration-300 ease-in-out text-red-600 font-bold py-2 px-6 rounded-lg shadow-md border border-red-600"
                        aria-label="Ir a Balances Generales"
                    >
                        Balances Generales
                    </NavLink>

                    <NavLink
                        to="/estado-resultados"
                        className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-md"
                        aria-label="Ir a Estado de Resultados"
                    >
                        Estado de Resultados
                    </NavLink>

                    <NavLink
                        to="/Ingreso_Datos"
                        className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-md"
                        aria-label="Ir a Análisis de Datos"
                    >
                        Ingresar Datos
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
