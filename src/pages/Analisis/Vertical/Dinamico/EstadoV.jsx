import React, { useState } from 'react';

const AnalisisVertical = ({ data }) => {
    const years = Object.keys(data);
    const [selectedYear, setSelectedYear] = useState(years[0]); // Inicia con el primer año disponible

    // Función para calcular porcentaje basado en Ingresos totales
    const calcularPorcentaje = (valor, total) => {
        if (valor === 'null' || total === 'null' || parseFloat(total) === 0) {
            return '-';
        }
        return ((parseFloat(valor) / parseFloat(total)) * 100).toFixed(2) + '%';
    };

    return (
        <div className="p-6 bg-red-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">Análisis Vertical del Estado de Resultados</h2>

            <div className="flex justify-center mb-6">
                <label htmlFor="year-select" className="mr-2 font-semibold">Selecciona el año:</label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-white text-red-600 font-semibold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Muestra el nombre de la empresa para el año seleccionado */}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold">Año: {selectedYear}</h3>
                <h4 className="text-lg">{data[selectedYear][0].name_empresa || 'Nombre no disponible'}</h4>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-red-600 rounded-md shadow-md overflow-hidden">
                    <thead className="bg-red-800 text-white">
                    <tr>
                        <th className="py-3 px-4 font-semibold text-left">Concepto</th>
                        <th className="py-3 px-4 font-semibold text-left">Valor</th>
                        <th className="py-3 px-4 font-semibold text-left">Porcentaje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(data[selectedYear][0]).map(([key, value]) => {
                        if (key === 'Ingresos totales' || key === 'id' || key === 'name' || key === 'name_empresa' || key === 'fecha') {
                            return null;
                        }
                        return (
                            <tr key={key} className="border-b border-red-200">
                                <td className="py-3 px-4 font-medium">{key}</td>
                                <td className="py-3 px-4">{value}</td>
                                <td className="py-3 px-4">{calcularPorcentaje(value, data[selectedYear][0]['Ingresos totales'])}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalisisVertical;
