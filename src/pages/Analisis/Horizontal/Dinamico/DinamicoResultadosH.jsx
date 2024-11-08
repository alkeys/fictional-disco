import React, { useState } from 'react';

const EstadoResultados = ({ data }) => {
    const [year1, setYear1] = useState(null);
    const [year2, setYear2] = useState(null);

    // Función para calcular el análisis horizontal
    const calcularAnalisisHorizontal = () => {
        if (!year1 || !year2 || year1 === year2) return null;

        const dataYear1 = data[year1];
        const dataYear2 = data[year2];

        // Calcular el cambio porcentual para cada campo
        const analisis = Object.keys(dataYear1).reduce((result, key) => {
            const valor1 = parseFloat(dataYear1[key]);
            const valor2 = parseFloat(dataYear2[key]);
            const cambio = valor1 !== 0 ? ((valor2 - valor1) / valor1) * 100 : valor2 * 100;
            result[key] = cambio.toFixed(2); // Limitar a dos decimales
            return result;
        }, {});

        return analisis;
    };

    const analisis = calcularAnalisisHorizontal();

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white text-black rounded-lg shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide leading-tight text-red-600">Estado de Resultados - Análisis Horizontal</h2>

            {/* Botones para seleccionar años */}
            <div className="flex flex-wrap justify-around mb-8 space-x-4">
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
                    <label className="block text-lg font-semibold mb-2">Año 1:</label>
                    <select
                        className="w-full p-3 border border-red-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
                        onChange={(e) => setYear1(e.target.value)}
                        value={year1}
                    >
                        <option value="">Selecciona un año</option>
                        {Object.keys(data).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
                    <label className="block text-lg font-semibold mb-2">Año 2:</label>
                    <select
                        className="w-full p-3 border border-red-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
                        onChange={(e) => setYear2(e.target.value)}
                        value={year2}
                    >
                        <option value="">Selecciona un año</option>
                        {Object.keys(data).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabla de Análisis Horizontal */}
            {analisis && (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="w-full table-auto border-collapse border border-red-600">
                        <thead>
                        <tr className="bg-red-600 text-white">
                            <th className="p-4 text-left text-lg font-medium">Concepto</th>
                            <th className="p-4 text-left text-lg font-medium">{year1}</th>
                            <th className="p-4 text-left text-lg font-medium">{year2}</th>
                            <th className="p-4 text-left text-lg font-medium">Variación (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(analisis).slice(1).map((key, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="p-4 text-left text-lg">{key}</td>
                                <td className="p-4 text-left text-lg">{data[year1][key]}</td>
                                <td className="p-4 text-left text-lg">{data[year2][key]}</td>
                                <td className="p-4 text-left text-lg">{analisis[key]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default EstadoResultados;
