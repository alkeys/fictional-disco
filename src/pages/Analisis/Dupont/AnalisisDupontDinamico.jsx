import React, { useState } from 'react';
import { transformarDatosA_Balance, transformarDatosDinamicos } from "../../../Services/Cositas.js";
import BotonDescargarImagen from "../../../component/BotonDescargarImagen.jsx";
import BotonDescargarPDF from "../../../component/BotonDescargarPDF.jsx";

const DupontAnalysis = () => {
    const balanceData = transformarDatosA_Balance();
    const incomeData = transformarDatosDinamicos();

    const [selectedYear, setSelectedYear] = useState(null);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Función para formatear los valores numéricos a formato monetario
    const formatearMoneda = (valor) => {
        return valor ? `$${parseFloat(valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '$0.00';
    };

    // Calcular el análisis Dupont y otros ratios
    const calculateDupont = () => {
        if (!selectedYear) return null;

        const balance = balanceData[selectedYear] || {};
        const income = incomeData[selectedYear] || {};

        // Valores de la utilidad y activos, con valores predeterminados en caso de estar vacíos
        const utilidadNeta = parseFloat(income["Utilidad (pérdida) neta consolidada"] || 0);
        const ingresosTotales = parseFloat(income["Ingresos totales"] || 0);
        const ventasNetas = parseFloat(income["Ventas"] || 0);
        const totalActivos = parseFloat(balance.Activos?.["Total Activos"] || 0);
        const totalCapital = parseFloat(balance["Pasivo y Capital"]?.["Total Capital"] || 0);
        const activosCorrientes = parseFloat(balance.Activos["Activos Corrientes"]["Total activos corrientes"] || 0);
        const pasivosCorrientes = parseFloat(balance["Pasivo y Capital"]?.["Pasivos Corrientes"]["Total pasivos corrientes"] || 0);
        const pasivosTotales = parseFloat(balance["Pasivo y Capital"]?.["Total Pasivos"] || 0);
        const cuentasPorCobrar = parseFloat(balance.Activos?.["Activos Corrientes"]?.["Cuentas por cobrar, neto"] || 0);
        const cuentasPorPagar = parseFloat(balance["Pasivo y Capital"]?.["Pasivos Corrientes"]?.["Cuentas por pagar o otros pasivos corrientes"] || 0);
        const proveedores = parseFloat(balance["Pasivo y Capital"]?.["Pasivos Corrientes"]?.["Proveedores"] || 0);

        console.log(ventasNetas);
        // Cálculo de los ratios
        const margenUtilidad = ingresosTotales ? utilidadNeta / ingresosTotales : 0;
        const rotacionActivos = totalActivos ? ingresosTotales / totalActivos : 0;
        const apalancamiento = totalCapital ? totalActivos / totalCapital : 0;
        const retornoSobreCapital = margenUtilidad * rotacionActivos * apalancamiento;
        const liquidezCorriente = activosCorrientes ? activosCorrientes / pasivosCorrientes : 0;
        const ratioDeudaSobreCapital = totalCapital ? pasivosTotales / totalCapital : 0;
        const rentabilidadSobreActivos = totalActivos ? utilidadNeta / totalActivos : 0;
        const periodoPromedioCobro = ingresosTotales ? (cuentasPorCobrar / ingresosTotales) * 365 : 0;
        const periodoPromedioPago = (cuentasPorPagar / ((ventasNetas*.70)/365));

        return {
            utilidadNeta: utilidadNeta.toFixed(2),
            totalActivos: totalActivos.toFixed(2),
            totalCapital: totalCapital.toFixed(2),
            margenUtilidad: (margenUtilidad * 100).toFixed(2),
            rotacionActivos: rotacionActivos.toFixed(2),
            apalancamiento: apalancamiento.toFixed(2),
            retornoSobreCapital: (retornoSobreCapital * 100).toFixed(2),
            liquidezCorriente: liquidezCorriente.toFixed(2),
            ratioDeudaSobreCapital: ratioDeudaSobreCapital.toFixed(2),
            rentabilidadSobreActivos: (rentabilidadSobreActivos * 100).toFixed(2),
            periodoPromedioCobro: periodoPromedioCobro.toFixed(2),
            periodoPromedioPago: periodoPromedioPago.toFixed(2)
        };
    };

    const dupont = calculateDupont();

    return (
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-8">
            <div className="flex justify-center mt-2 mb-4">
                <section className="mx-3">
                    <BotonDescargarImagen idElemento="AnalisisHorizontal"/>
                </section>
                <section className="mx-3">
                    <BotonDescargarPDF idElemento="AnalisisHorizontal"/>
                </section>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center">Análisis Dupont y Ratios Financieros</h2>
            <select
                onChange={handleYearChange}
                value={selectedYear || ''}
                className="bg-white text-red-600 p-2 rounded w-full mb-4 focus:outline-none"
            >
                <option value="" disabled>Selecciona un año</option>
                {Object.keys(incomeData).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            {selectedYear && (
                <div className="bg-white text-red-600 p-4 rounded-lg shadow-inner" id="AnalisisHorizontal">
                    <h3 className="text-2xl font-semibold mb-2 text-center">Resultados del análisis - Año {selectedYear}</h3>
                    <p className="mb-2"><span className="font-semibold">Utilidad Neta:</span> {formatearMoneda(dupont?.utilidadNeta)}</p>
                    <p className="mb-2"><span className="font-semibold">Activos Totales:</span> {formatearMoneda(dupont?.totalActivos)}</p>
                    <p className="mb-2"><span className="font-semibold">Capital Total:</span> {formatearMoneda(dupont?.totalCapital)}</p>
                    <p className="mb-2"><span className="font-semibold">Margen de Utilidad:</span> {dupont?.margenUtilidad}%</p>
                    <p className="mb-2"><span className="font-semibold">Rotación de Activos:</span> {dupont?.rotacionActivos}</p>
                    <p className="mb-2"><span className="font-semibold">Multiplicador de Capital:</span> {dupont?.apalancamiento}</p>
                    <p className="mb-2"><span className="font-semibold">ROE (Rentabilidad sobre el Capital):</span> {dupont?.retornoSobreCapital}%</p>
                    <p className="mb-2"><span className="font-semibold">Liquidez Corriente:</span> {dupont?.liquidezCorriente}</p>
                    <p className="mb-2"><span className="font-semibold">Ratio de Deuda sobre Capital:</span> {dupont?.ratioDeudaSobreCapital}</p>
                    <p className="mb-2"><span className="font-semibold">Rentabilidad sobre Activos (ROA):</span> {dupont?.rentabilidadSobreActivos}%</p>
                    <p className="mb-2"><span className="font-semibold">Periodo Promedio de Cobro:</span> {dupont?.periodoPromedioCobro} días</p>
                    <p className="mb-2"><span className="font-semibold">Periodo Promedio de Pago:</span> {dupont?.periodoPromedioPago} días</p>
                </div>
            )}
        </div>
    );
};

export default DupontAnalysis;
