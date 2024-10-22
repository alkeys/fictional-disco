import React from 'react';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-600">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4" style={{fontFamily: 'Cursive'}}>
                    Bienvenido a Coca-Cola Financials
                </h1>
                <p className="text-gray-800 mb-8">
                    Tu herramienta de análisis financiero con la energía y frescura de Coca-Cola. ¡Explora reportes,
                    revisa balances generales, y más!
                </p>

                <div className="flex flex-wrap justify-center space-x-4">

                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                        Análisis de Datos
                    </button>

                    <button
                        className="bg-white hover:bg-gray-200 text-red-600 font-bold py-2 px-6 rounded-lg shadow-md border border-red-600">
                        Reportes
                    </button>

                    <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                        Configuración
                    </button>
                    <a href={"/Balances"} >
                        <button
                            className="bg-white hover:bg-gray-200 text-red-600 font-bold py-2 px-6 rounded-lg shadow-md border border-red-600">
                            Balances Generales
                        </button>
                    </a>


                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                        Estado de Resultados
                    </button>


                </div>
            </div>
        </div>
    );
}

export default HomePage;
