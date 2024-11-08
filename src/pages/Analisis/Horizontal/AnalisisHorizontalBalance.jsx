import React from 'react';
import { analisisHorizontal, AnalisiHorizontal2Variacion } from "../../../Services/Formulas.js";

export function AnalisisHorizontalBalance({ anio1, data1, anio2, data2 }) {
    const year1 = anio1;
    const year2 = anio2;
    const dataYear1 = data1;
    const dataYear2 = data2;
    const Valor1="Var.Rel";
    const Valor2="Var.Abs";

    if (!dataYear1 || !dataYear2) {
        return <p className="text-white text-center">Cargando datos del balance...</p>;
    }

    const activosCorrientes = dataYear1.Activos["Activos Corrientes"];
    const activosNoCorrientes = dataYear1.Activos["Activos No Corrientes"];
    const pasivosCorrientes = dataYear1["Pasivo y Capital"]["Pasivos Corrientes"];
    const pasivosNoCorrientes = dataYear1["Pasivo y Capital"]["Pasivos No Corrientes"];
    const capital = dataYear1["Pasivo y Capital"].Capital;

    const getYearData = (data) => {
        return {
            activosCorrientes: data.Activos["Activos Corrientes"],
            activosNoCorrientes: data.Activos["Activos No Corrientes"],
            pasivosCorrientes: data["Pasivo y Capital"]["Pasivos Corrientes"],
            pasivosNoCorrientes: data["Pasivo y Capital"]["Pasivos No Corrientes"],
            capital: data["Pasivo y Capital"].Capital,
        };
    };

    const year1Data = getYearData(dataYear1);
    const year2Data = getYearData(dataYear2);

    const calcularPorcentaje = (valor1, valor2) => analisisHorizontal(valor1, valor2);
    const calcularVariacion = (valor1, valor2) => AnalisiHorizontal2Variacion(valor1, valor2);

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 p-4 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: 'Cursive'}}>
                Análisis Horizontal Del Balance {year1} - {year2}
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-4xl overflow-x-auto">
                {/* Activos */}
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Activos</h2>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Activos Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year1}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year2}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Rel.</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Abs.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(activosCorrientes).map((key, index) => {
                        const valor1 = activosCorrientes[key] || 0;
                        const valor2 = year2Data.activosCorrientes[key] || 0;
                        const porcentaje = calcularPorcentaje(valor1, valor2);
                        const variacion = calcularVariacion(valor1, valor2);
                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor1.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor2.toLocaleString()}
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

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Activos No Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year1}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year2}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Rel.</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Abs.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(activosNoCorrientes).map((key, index) => {
                        const valor1 = activosNoCorrientes[key] || 0;
                        const valor2 = year2Data.activosNoCorrientes[key] || 0;
                        const porcentaje = calcularPorcentaje(valor1, valor2);
                        const variacion = calcularVariacion(valor1, valor2);
                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor1.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor2.toLocaleString()}
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

                {/* Pasivos */}
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Pasivos</h2>

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Pasivos Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year1}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year2}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Rel.</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Abs.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(pasivosCorrientes).map((key, index) => {
                        const valor1 = pasivosCorrientes[key] || 0;
                        const valor2 = year2Data.pasivosCorrientes[key] || 0;
                        const porcentaje = calcularPorcentaje(valor1, valor2);
                        const variacion = calcularVariacion(valor1, valor2);
                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor1.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor2.toLocaleString()}
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

                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Pasivos No Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year1}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year2}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Rel.</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Abs.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(pasivosNoCorrientes).map((key, index) => {
                        const valor1 = pasivosNoCorrientes[key] || 0;
                        const valor2 = year2Data.pasivosNoCorrientes[key] || 0;
                        const porcentaje = calcularPorcentaje(valor1, valor2);
                        const variacion = calcularVariacion(valor1, valor2);
                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor1.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor2.toLocaleString()}
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

                {/* Capital */}
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Capital</h2>
                <table className="table-auto w-full mb-8">
                    <thead>
                    <tr>
                        <th className="border px-2 sm:px-4 py-2">Cuenta</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year1}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">{year2}</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Rel.</th>
                        <th className="border px-2 sm:px-4 py-2 text-right">Var. Abs.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(capital).map((key, index) => {
                        const valor1 = capital[key] || 0;
                        const valor2 = year2Data.capital[key] || 0;
                        const porcentaje = calcularPorcentaje(valor1, valor2);
                        const variacion = calcularVariacion(valor1, valor2);
                        return (
                            <tr key={index} className="bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2">{key}</td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor1.toLocaleString()}
                                </td>
                                <td className="border px-2 sm:px-4 py-2 text-right text-red-600 font-semibold">
                                    ${valor2.toLocaleString()}
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
}
