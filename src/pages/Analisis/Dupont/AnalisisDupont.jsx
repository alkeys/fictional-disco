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
        liquidezCorriente: 0,
        ratioDeudaCapital: 0,
        ratioDeudaTotalActivos: 0,
        rentabilidadActivos: 0,
        periodoPromedioCobro: 0,
        periodoPromedioPago: 0,
    });

    useEffect(() => {
        // Verificar y extraer los valores de las propiedades necesarias
        const ventasTotales = estadoResultado && estadoResultado["Ingresos totales"]
            ? parseFloat(estadoResultado["Ingresos totales"].replace(/,/g, ''))
            : 0;
        const ventasNetas = parseFloat(estadoResultado && estadoResultado["Ventas"].replace(/,/g, ''));

        const utilidadNeta = estadoResultado && estadoResultado["Utilidad (pérdida) neta consolidada"]
            ? parseFloat(estadoResultado["Utilidad (pérdida) neta consolidada"].replace(/,/g, ''))
            : 0;

        const activosTotales = balance && balance["Activos"] && balance["Activos"]["Total Activos"]
            ? parseFloat(balance["Activos"]["Total Activos"])
            : 0;

        const capitalTotal = balance && balance["Pasivo y Capital"] && balance["Pasivo y Capital"]["Capital"] && balance["Pasivo y Capital"]["Capital"]["Total capital"]
            ? parseFloat(balance["Pasivo y Capital"]["Capital"]["Total capital"])
            : 0;

        const pasivosTotales = balance && balance["Pasivo y Capital"] && balance["Pasivo y Capital"]["Total Pasivos"]
            ? parseFloat(balance["Pasivo y Capital"]["Total Pasivos"])
            : 0;

        const cuentasPorCobrar = balance && balance["Activos"] && balance["Activos"]["Activos Corrientes"]["Cuentas por cobrar, neto"]
            ? parseFloat(balance["Activos"]["Activos Corrientes"]["Cuentas por cobrar, neto"])
            : 0;

        const cuentasPorPagar = parseFloat(balance["Pasivo y Capital"]?.["Pasivos Corrientes"]?.["Cuentas por pagar o otros pasivos corrientes"] || 0);


        const proveedores = balance && balance["Pasivo y Capital"] && balance["Pasivo y Capital"]["Pasivos Corrientes"] && balance["Pasivo y Capital"]["Pasivos Corrientes"]["Proveedores"]
            ? parseFloat(balance["Pasivo y Capital"]["Pasivos Corrientes"]["Proveedores"])
            : 0;

        const costoVentas = estadoResultado && estadoResultado["Costo de ventas"]
            ? parseFloat(estadoResultado["Costo de ventas"].replace(/,/g, ''))
            : 0;

        // Cálculos de ratios y otros indicadores
        const margenUtilidad = ventasTotales !== 0 ? (utilidadNeta / ventasTotales).toFixed(2) : 0;
        const rotacionActivos = activosTotales !== 0 ? (ventasTotales / activosTotales).toFixed(2) : 0;
        const multiplicadorCapital = capitalTotal !== 0 && activosTotales !== 0 ? (activosTotales / capitalTotal).toFixed(2) : 0;

        // Cálculo del ROE (Return on Equity)
        const ROE = (margenUtilidad && rotacionActivos && multiplicadorCapital)
            ? (margenUtilidad * rotacionActivos * multiplicadorCapital).toFixed(2)
            : 0;

        const liquidezCorriente = balance && balance["Pasivo y Capital"] && balance["Pasivo y Capital"]["Pasivos Corrientes"] && balance["Activos"]["Activos Corrientes"]["Total activos corrientes"]
            ? (balance["Activos"]["Activos Corrientes"]["Total activos corrientes"] / balance["Pasivo y Capital"]["Pasivos Corrientes"]["Total pasivos corrientes"]).toFixed(2)
            : 0;

        const ratioDeudaCapital = capitalTotal !== 0 ? (pasivosTotales / capitalTotal).toFixed(2) : 0;
        const ratioDeudaTotalActivos = activosTotales !== 0 ? (pasivosTotales / activosTotales).toFixed(2) : 0;
        const rentabilidadActivos = activosTotales !== 0 ? (utilidadNeta / activosTotales).toFixed(2) : 0;

        const periodoPromedioCobro = ventasTotales !== 0 ? ((cuentasPorCobrar / ventasTotales) * 365).toFixed(2) : 0;
       console.log(ventasNetas);
       console.log(cuentasPorPagar);

        const periodoPromedioPago = ((cuentasPorPagar / ((ventasNetas*.70)/365 ))).toFixed(2);

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
            liquidezCorriente,
            ratioDeudaCapital,
            ratioDeudaTotalActivos,
            rentabilidadActivos,
            periodoPromedioCobro,
            periodoPromedioPago,
        });
    }, [balance, estadoResultado]); // El análisis se actualiza cada vez que los datos cambian

    return (
        <div className="p-6 bg-red-500 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">indicadores</h2>

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
                        <td className="px-4 py-2 text-sm text-gray-300">(Utilidad Neta / Ventas Totales) - Mide la eficiencia en generar ganancias a partir de las ventas.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Rotación de Activos</td>
                        <td className="px-4 py-2">{analisis.rotacionActivos === "0" ? "No disponible" : analisis.rotacionActivos}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">(Ventas Totales / Activos Totales) - Mide qué tan eficientemente se utilizan los activos para generar ventas.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Multiplicador de Capital</td>
                        <td className="px-4 py-2">{analisis.multiplicadorCapital === "0" ? "No disponible" : analisis.multiplicadorCapital}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">(Activos Totales / Capital Total) - Indica cuánto de los activos están financiados por los accionistas.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">ROE (Rentabilidad sobre el Capital)</td>
                        <td className="px-4 py-2">{analisis.ROE === "0" ? "No disponible" : `${analisis.ROE * 100}%`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Margen de Utilidad * Rotación de Activos * Multiplicador de Capital. Indica la rentabilidad para los accionistas.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Liquidez Corriente</td>
                        <td className="px-4 py-2">{analisis.liquidezCorriente === "0" ? "No disponible" : analisis.liquidezCorriente}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Total de activos corrientes / Total de pasivos corrientes. Mide la capacidad para cubrir deudas a corto plazo.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Ratio de Deuda sobre Capital</td>
                        <td className="px-4 py-2">{analisis.ratioDeudaCapital === "0" ? "No disponible" : analisis.ratioDeudaCapital}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Pasivos Totales / Capital Total. Indica el nivel de deuda de la empresa comparado con su capital.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Rentabilidad sobre Activos (ROA)</td>
                        <td className="px-4 py-2">{analisis.rentabilidadActivos === "0" ? "No disponible" : `${analisis.rentabilidadActivos * 100}%`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Utilidad Neta / Activos Totales. Mide la rentabilidad generada por cada peso invertido en activos.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Periodo Promedio de Cobro</td>
                        <td className="px-4 py-2">{analisis.periodoPromedioCobro === "0" ? "No disponible" : `${analisis.periodoPromedioCobro} días`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">Cuentas por cobrar / Ventas Totales * 365. Mide cuántos días en promedio tarda la empresa en cobrar sus ventas.</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">Periodo Promedio de Pago</td>
                        <td className="px-4 py-2">{analisis.periodoPromedioPago === "0" ? "No disponible" : `${analisis.periodoPromedioPago} días`}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">. Mide el tiempo promedio para pagar .</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalisisDuPont;
