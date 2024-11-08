import React, { useEffect, useState } from "react";

const AnalisisDuPont = ({ balance, estadoResultado }) => {
    // Estado para almacenar los resultados del análisis
    const [analisis, setAnalisis] = useState({
        ventasTotales: 0,
        utilidadNeta: 0,
        activosTotales: 0,
        capitalTotal: 0,
        margenUtilidad: 0,
        rotacionActivos: 0,
        multiplicadorCapital: 0,
        ROE: 0,
    });

    useEffect(() => {
        // Verificar y extraer los valores de las propiedades necesarias
        const ventasTotales = estadoResultado && estadoResultado["Ingresos totales"]
            ? parseFloat(estadoResultado["Ingresos totales"].replace(/,/g, ''))
            : 0;

        const utilidadNeta = estadoResultado && estadoResultado["Utilidad (pérdida) neta consolidada"]
            ? parseFloat(estadoResultado["Utilidad (pérdida) neta consolidada"].replace(/,/g, ''))
            : 0;

        const activosTotales = balance && balance["Activos"] && balance["Activos"]["Total Activos"]
            ? parseFloat(balance["Activos"]["Total Activos"])
            : 0;

        const capitalTotal = balance && balance["Pasivo y Capital"] && balance["Pasivo y Capital"]["Capital"] && balance["Pasivo y Capital"]["Capital"]["Total capital"]
            ? parseFloat(balance["Pasivo y Capital"]["Capital"]["Total capital"])
            : 0;

        // Asegurarnos de que los valores sean válidos
        const margenUtilidad = ventasTotales !== 0 ? (utilidadNeta / ventasTotales).toFixed(2) : 0;
        const rotacionActivos = activosTotales !== 0 ? (ventasTotales / activosTotales).toFixed(2) : 0;
        const multiplicadorCapital = capitalTotal !== 0 && activosTotales !== 0 ? (activosTotales / capitalTotal).toFixed(2) : 0;

        // Cálculo del ROE (Return on Equity)
        const ROE = (margenUtilidad && rotacionActivos && multiplicadorCapital)
            ? (margenUtilidad * rotacionActivos * multiplicadorCapital).toFixed(2)
            : 0;

        // Actualizar el estado con los nuevos valores calculados
        setAnalisis({
            ventasTotales,
            utilidadNeta,
            activosTotales,
            capitalTotal,
            margenUtilidad,
            rotacionActivos,
            multiplicadorCapital,
            ROE,
        });
    }, [balance, estadoResultado]); // El análisis se actualiza cada vez que los datos cambian

    return (
        <div className="p-6 bg-red-500 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Análisis DuPont Automático</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                    <thead>
                    <tr className="bg-red-600">
                        <th className="px-4 py-2 text-lg text-white">Indicador</th>
                        <th className="px-4 py-2 text-lg text-white">Valor</th>
                        <th className="px-4 py-2 text-lg text-white">Fórmula</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Ventas Totales</td>
                        <td className="px-4 py-2">{analisis.ventasTotales === 0 ? "No disponible" : `$${analisis.ventasTotales.toLocaleString()}`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Ingresos totales</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Utilidad Neta</td>
                        <td className="px-4 py-2">{analisis.utilidadNeta === 0 ? "No disponible" : `$${analisis.utilidadNeta.toLocaleString()}`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Utilidad (pérdida) neta consolidada</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Activos Totales</td>
                        <td className="px-4 py-2">{analisis.activosTotales === 0 ? "No disponible" : `$${analisis.activosTotales.toLocaleString()}`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Total de activos</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Capital Total</td>
                        <td className="px-4 py-2">{analisis.capitalTotal === 0 ? "No disponible" : `$${analisis.capitalTotal.toLocaleString()}`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Total de capital</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Margen de Utilidad</td>
                        <td className="px-4 py-2">{analisis.margenUtilidad === "0" ? "No disponible" : `${analisis.margenUtilidad * 100}%`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">(Utilidad Neta / Ventas Totales)</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Rotación de Activos</td>
                        <td className="px-4 py-2">{analisis.rotacionActivos === "0" ? "No disponible" : analisis.rotacionActivos}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">(Ventas Totales / Activos Totales)</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Multiplicador de Capital</td>
                        <td className="px-4 py-2">{analisis.multiplicadorCapital === "0" ? "No disponible" : analisis.multiplicadorCapital}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">(Activos Totales / Capital Total)</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 font-semibold">ROE (Retorno sobre el Capital)</td>
                        <td className="px-4 py-2">{analisis.ROE === "0" ? "No disponible" : `${analisis.ROE * 100}%`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300"></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {analisis.ROE !== 0 && (
                <div className="mt-6 p-4 bg-green-600 text-white rounded-md text-center">
                    <p>¡Análisis completado! El ROE se calcula automáticamente con los datos proporcionados.</p>
                </div>
            )}

            <div className="mt-6 bg-red-600 text-white p-4 rounded-md">
                <h3 className="text-xl font-bold">¿Qué significa este análisis?</h3>
                <p className="mt-2">
                    El Análisis DuPont es una herramienta financiera que descompone el retorno sobre el capital (ROE) en tres componentes clave:
                </p>
                <ul className="mt-2 list-disc list-inside">
                    <li><strong>Margen de Utilidad:</strong> Mide la rentabilidad de la empresa, calculando qué porcentaje de las ventas se convierte en utilidad neta.</li>
                    <li><strong>Rotación de Activos:</strong> Mide la eficiencia con la que la empresa utiliza sus activos para generar ventas.</li>
                    <li><strong>Multiplicador de Capital:</strong> Mide el apalancamiento de la empresa, indicando cuántos activos tiene en relación con su capital.</li>
                </ul>
                <p className="mt-2">
                    Juntos, estos tres componentes permiten entender cómo una empresa está generando su retorno sobre el capital invertido (ROE).
                </p>
            </div>
        </div>
    );
};

export default AnalisisDuPont;
