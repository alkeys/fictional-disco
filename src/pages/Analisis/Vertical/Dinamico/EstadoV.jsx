import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

const AnalisisVertical = ({ data }) => {
    const years = Object.keys(data);
    const [selectedYear, setSelectedYear] = useState(years[0]); // Inicia con el primer año disponible
    const [selectedConcept, setSelectedConcept] = useState(null); // Para almacenar el concepto seleccionado

    // Función para calcular porcentaje basado en Ingresos totales
    const calcularPorcentaje = (valor, total) => {
        if (valor === 'null' || total === 'null' || parseFloat(total) === 0) {
            return '-';
        }
        return ((parseFloat(valor) / parseFloat(total)) * 100).toFixed(2) + '%';
    };

    // Datos del año seleccionado
    const yearData = data[selectedYear][0];
    const ingresosTotales = yearData['Ingresos totales']; // Obtenemos los ingresos totales del año seleccionado

    // Preparamos los datos para el gráfico
    const chartData = Object.entries(yearData)
        .filter(([key, value]) => key !== 'id' && key !== 'name' && key !== 'name_empresa' && key !== 'fecha')
        .map(([key, value]) => ({
            name: key,
            porcentaje: (parseFloat(value) / parseFloat(ingresosTotales) * 100).toFixed(2) // Calculamos el porcentaje
        }));

    // Maneja la selección de un concepto
    const handleConceptSelection = (conceptName) => {
        setSelectedConcept(conceptName); // Actualiza el concepto seleccionado
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
                <h4 className="text-lg">{yearData.name_empresa || 'Nombre no disponible'}</h4>
            </div>

            {/* Área para mostrar el concepto seleccionado */}
            {selectedConcept && (
                <div className="bg-cream text-black p-4 mb-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold">Concepto seleccionado:</h4>
                    <p>{selectedConcept}</p>
                </div>
            )}

            {/* Gráfico de barras */}
            <div className="mb-6 bg-blue-50">
                <h3 className="text-xl font-semibold text-center text-black mb-4">Distribución porcentual de conceptos</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value + '%'} />
                        <Legend />
                        <ReferenceLine y={0} stroke="#000" />
                        <Bar
                            dataKey="porcentaje"
                            fill="#8884d8"
                            name="Porcentaje"
                            onClick={({ name }) => handleConceptSelection(name)} // Al hacer clic en una barra, seleccionamos el concepto
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Tabla de análisis vertical */}
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white text-red-600 rounded-md shadow-md overflow-hidden">
                    <thead className="bg-red-800 text-white">
                    <tr>
                        <th className="py-3 px-4 font-semibold text-left">Concepto</th>
                        <th className="py-3 px-4 font-semibold text-left">Valor</th>
                        <th className="py-3 px-4 font-semibold text-left">Porcentaje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(yearData).map(([key, value]) => {
                        if (key === 'Ingresos totales' || key === 'id' || key === 'name' || key === 'name_empresa' || key === 'fecha') {
                            return null;
                        }
                        return (
                            <tr
                                key={key}
                                className={`border-b border-red-200 ${selectedConcept === key ? 'bg-cream' : ''}`}
                                onClick={() => handleConceptSelection(key)} // Al hacer clic en una fila, seleccionamos el concepto
                            >
                                <td className="py-3 px-4 font-medium">{key}</td>
                                <td className="py-3 px-4">{value}</td>
                                <td className="py-3 px-4">{calcularPorcentaje(value, ingresosTotales)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Mostrar los Ingresos Totales */}
            <div className="text-center bg-cream p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-black">Ingresos Totales:{ingresosTotales}</h3>
            </div>
        </div>
    );
};

export default AnalisisVertical;
