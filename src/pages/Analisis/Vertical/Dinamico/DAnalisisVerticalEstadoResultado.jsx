import React from "react";

const DAnalisisVerticalEstadoResultado = ({ estadoResultado }) => {
    // Validación de ingreso total como base para el cálculo del porcentaje
    const ingresosTotales = parseFloat(estadoResultado["Ingresos totales"].replace(/,/g, ''));

    if (!ingresosTotales) {
        return <div className="text-center text-red-800 font-semibold">Error: Los datos del estado de resultados están incompletos o son inválidos.</div>;
    }

    // Función para calcular el porcentaje de cada partida respecto a los ingresos totales
    const calcularPorcentaje = (valor) => ((parseFloat(valor.replace(/,/g, '')) / ingresosTotales) * 100).toFixed(2);

    // Renderiza cada entrada del estado de resultados con su valor y porcentaje
    const renderItems = () => {
        return Object.keys(estadoResultado).map((key) => {
            const valor = estadoResultado[key];
            const porcentaje = calcularPorcentaje(valor);

            return (
                <div key={key} className="flex justify-between p-2 rounded-md bg-red-50 hover:bg-red-100 transition duration-200 mb-1">
                    <span className="text-red-800 font-medium">{key}:</span>
                    <span className="text-red-900 font-semibold">${valor} ({porcentaje}%)</span>
                </div>
            );
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-red-800 text-red-900">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-900 border-b-2 border-red-800 pb-2">
                Análisis Vertical del Estado de Resultados
            </h2>
            <div className="space-y-2">
                {renderItems()}
            </div>
            <div className="font-semibold text-right text-red-800 mt-4">
                Ingresos Totales: ${ingresosTotales.toLocaleString()}
            </div>
        </div>
    );
};

export default DAnalisisVerticalEstadoResultado;
