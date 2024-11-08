import React from "react";
import PropTypes from 'prop-types';
import { analisisHorizontal, AnalisiHorizontal2Variacion } from "../../../Services/Formulas.js";

const EstadoResultadosConAnalisis = ({ estadoActual, anioActual, estadoAnterior, anioAnterior }) => {

    // Mensaje de carga si no hay datos
    if (!estadoActual || !estadoAnterior) {
        return <p className="text-white text-center">Cargando datos del balance...</p>;
    }

    const calcularPorcentaje = (valor1, valor2) => analisisHorizontal(valor1, valor2);
    const calcularVariacion = (valor1, valor2) => AnalisiHorizontal2Variacion(valor1, valor2);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 p-4 sm:p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{fontFamily: 'Cursive'}}>
                Análisis Horizontal Del Estado Resultados {anioActual} - {anioAnterior}
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-4xl overflow-x-auto">
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{anioActual}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{anioAnterior}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var.Rel (%)</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var.Abs ($)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(estadoActual).map((key, index) => {
                        const valorActual = parseFloat(estadoActual[key].replace(/,/g, "")) || 0;
                        const valorAnterior = parseFloat(estadoAnterior[key].replace(/,/g, "")) || 0;

                        // Asegúrate de que los valores son válidos
                        const porcentaje = calcularPorcentaje(valorActual, valorAnterior);
                        const variacion = calcularVariacion(valorActual, valorAnterior);

                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valorActual.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valorAnterior.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    {porcentaje.toFixed(2)}%
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${variacion.toLocaleString()}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

EstadoResultadosConAnalisis.propTypes = {
    estadoActual: PropTypes.object.isRequired,
    anioActual: PropTypes.number.isRequired,
    estadoAnterior: PropTypes.object.isRequired,
    anioAnterior: PropTypes.number.isRequired,
};

export default EstadoResultadosConAnalisis;
