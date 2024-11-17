import React, { useState } from 'react';
import { transformarDatosA_Balance, transformarDatosDinamicos } from "../../../Services/Cositas.js";
import BotonDescargarImagen from "../../../component/BotonDescargarImagen.jsx";
import BotonDescargarPDF from "../../../component/BotonDescargarPDF.jsx";
import Metricas from "./Dinamico/Metricas.jsx";

const DupontAnalysis = () => {
    const balanceData = transformarDatosA_Balance();
    const incomeData = transformarDatosDinamicos();
    let nameEmpresa;

    const [selectedYear, setSelectedYear] = useState(null);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showEvaluation, setShowEvaluation] = useState(false);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setShowRecommendations(false);
        setShowEvaluation(false);
    };

    const formatearMoneda = (valor) => {
        return valor ? `$${parseFloat(valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '$0.00';
    };

    const calculateDupont = () => {
        if (!selectedYear) return null;

        const balance = balanceData[selectedYear] || {};
        const income = incomeData[selectedYear] || {};

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
        const Inventario = parseFloat(balance.Activos?.["Activos Corrientes"]?.["Inventarios"] || 0);
        const nombreEmpresa = balance["name_empresa"];
        nameEmpresa = nombreEmpresa;

        const margenUtilidad = ingresosTotales ? utilidadNeta / ingresosTotales : 0;
        const rotacionActivos = totalActivos ? ingresosTotales / totalActivos : 0;
        const apalancamiento = totalCapital ? totalActivos / totalCapital : 0;
        const retornoSobreCapital = margenUtilidad * rotacionActivos * apalancamiento;
        const liquidezCorriente = activosCorrientes ? activosCorrientes / pasivosCorrientes : 0;
        const Acida = (activosCorrientes - Inventario) / pasivosCorrientes;
        const ratioDeudaSobreCapital = totalCapital ? pasivosTotales / totalCapital : 0;
        const rentabilidadSobreActivos = totalActivos ? utilidadNeta / totalActivos : 0;
        const periodoPromedioCobro = ingresosTotales ? (cuentasPorCobrar / ingresosTotales) * 365 : 0;
        const periodoPromedioPago = (cuentasPorPagar / ((ventasNetas * 0.70) / 365));

        return {
            utilidadNeta: utilidadNeta.toFixed(2),
            totalActivos: totalActivos.toFixed(2),
            totalCapital: totalCapital.toFixed(2),
            margenUtilidad: (margenUtilidad * 100).toFixed(2),
            rotacionActivos: rotacionActivos.toFixed(2),
            apalancamiento: apalancamiento.toFixed(2),
            retornoSobreCapital: (retornoSobreCapital * 100).toFixed(2),
            liquidezCorriente: liquidezCorriente.toFixed(2),
            Acida: Acida.toFixed(2),
            ratioDeudaSobreCapital: ratioDeudaSobreCapital.toFixed(2),
            rentabilidadSobreActivos: (rentabilidadSobreActivos * 100).toFixed(2),
            periodoPromedioCobro: periodoPromedioCobro.toFixed(2),
            periodoPromedioPago: periodoPromedioPago.toFixed(2)
        };
    };

    const generateRecommendations = (dupont) => {
        if (!dupont) return ["Selecciona un año para ver recomendaciones."];

        let recommendations = [];

        // Recomendaciones basadas en métricas clave
        if (dupont.margenUtilidad < 10) {
            recommendations.push("Incrementa los precios de productos o servicios, o reduce costos operativos para mejorar el margen de utilidad.");
        }
        if (dupont.liquidezCorriente < 1) {
            recommendations.push("Mejora la liquidez reduciendo pasivos corrientes o incrementando activos corrientes, como efectivo o cuentas por cobrar.");
        }
        if (dupont.Acida < 1) {
            recommendations.push("Optimiza los niveles de inventario para garantizar una mayor liquidez inmediata.");
        }
        if (dupont.ratioDeudaSobreCapital > 1) {
            recommendations.push("Reduce el apalancamiento renegociando deudas o utilizando fuentes de financiamiento con menor costo.");
        }
        if (dupont.rotacionActivos < 1) {
            recommendations.push("Aumenta la eficiencia de los activos mediante la venta de activos no productivos o subutilizados.");
        }
        if (dupont.retornoSobreCapital < 10) {
            recommendations.push("Enfócate en mejorar las ganancias operativas y disminuir costos para incrementar el retorno sobre el capital.");
        }
        if (dupont.rentabilidadSobreActivos < 5) {
            recommendations.push("Aumenta la eficiencia operativa y considera inversiones en activos más productivos.");
        }
        if (dupont.periodoPromedioCobro > 90) {
            recommendations.push("Implementa políticas más estrictas de cobro para reducir el tiempo promedio de recuperación de las cuentas por cobrar.");
        }
        if (dupont.periodoPromedioPago < 30) {
            recommendations.push("Negocia mejores términos de pago con los proveedores para optimizar el flujo de efectivo.");
        }

        return recommendations.length > 0 ? recommendations : ["La empresa muestra un desempeño financiero saludable y no requiere cambios importantes."];
    };

    const evaluateCompany = (dupont) => {
        if (!dupont) return ["Selecciona un año para evaluar la situación de la empresa."];

        let evaluation = [];

        // Evaluación basada en métricas clave
        if (dupont.liquidezCorriente >= 1.5) {
            evaluation.push("La empresa tiene una excelente capacidad para cubrir obligaciones a corto plazo.");
        } else if (dupont.liquidezCorriente >= 1) {
            evaluation.push("La empresa tiene una liquidez suficiente, pero con margen para mejorar.");
        } else {
            evaluation.push("La empresa podría enfrentar dificultades para cubrir obligaciones a corto plazo.");
        }

        if (dupont.ratioDeudaSobreCapital <= 0.5) {
            evaluation.push("El nivel de endeudamiento es bajo, lo que refleja una excelente solvencia.");
        } else if (dupont.ratioDeudaSobreCapital <= 1) {
            evaluation.push("El nivel de endeudamiento es aceptable, pero se recomienda monitorearlo de cerca.");
        } else {
            evaluation.push("El nivel de endeudamiento es alto y podría comprometer la estabilidad financiera.");
        }

        if (dupont.retornoSobreCapital >= 15) {
            evaluation.push("La empresa genera un excelente retorno sobre el capital invertido.");
        } else if (dupont.retornoSobreCapital >= 10) {
            evaluation.push("La empresa tiene un buen retorno sobre el capital, pero puede optimizarlo.");
        } else {
            evaluation.push("El retorno sobre el capital es bajo, indicando margen para mejorar la rentabilidad.");
        }

        if (dupont.rotacionActivos >= 1) {
            evaluation.push("La empresa utiliza eficientemente sus activos para generar ingresos.");
        } else {
            evaluation.push("La empresa podría mejorar la eficiencia en el uso de sus activos.");
        }

        if (dupont.margenUtilidad >= 20) {
            evaluation.push("El margen de utilidad es excelente, reflejando una operación eficiente.");
        } else if (dupont.margenUtilidad >= 10) {
            evaluation.push("El margen de utilidad es razonable, pero puede optimizarse.");
        } else {
            evaluation.push("El margen de utilidad es bajo, indicando oportunidades para mejorar la gestión de costos o precios.");
        }

        return evaluation;
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
            <h2 className="text-3xl font-bold mb-4 text-center">Análisis </h2>
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
                    <h3 className="text-2xl font-semibold mb-2 text-center">Resultados del análisis -
                        Año {selectedYear}</h3>
                    <h4 className="text-xl font-semibold mb-2 text-center">Empresa: {nameEmpresa}</h4>
                    <p className="mb-2"><span
                        className="font-semibold">Utilidad Neta:</span> {formatearMoneda(dupont?.utilidadNeta)}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Activos Totales:</span> {formatearMoneda(dupont?.totalActivos)}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Capital Total:</span> {formatearMoneda(dupont?.totalCapital)}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Margen de Utilidad:</span> {dupont?.margenUtilidad}%</p>
                    <p className="mb-2"><span
                        className="font-semibold">Rotación de Activos:</span> {dupont?.rotacionActivos}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Multiplicador de Capital:</span> {dupont?.apalancamiento}</p>
                    <p className="mb-2"><span className="font-semibold">ROE:</span> {dupont?.retornoSobreCapital}%</p>
                    <p className="mb-2"><span
                        className="font-semibold">Liquidez Corriente:</span> {dupont?.liquidezCorriente}</p>
                    <p className="mb-2"><span className="font-semibold">Prueba Ácida:</span> {dupont?.Acida}</p>
                    <p className="mb-2"><span
                        className="font-semibold">Ratio de Deuda sobre Capital:</span> {dupont?.ratioDeudaSobreCapital}
                    </p>
                    <p className="mb-2"><span
                        className="font-semibold">Rentabilidad sobre Activos (ROA):</span> {dupont?.rentabilidadSobreActivos}%
                    </p>
                    <p className="mb-2"><span
                        className="font-semibold">Periodo Promedio de Cobro:</span> {dupont?.periodoPromedioCobro} días
                    </p>
                    <p className="mb-2"><span
                        className="font-semibold">Periodo Promedio de Pago:</span> {dupont?.periodoPromedioPago} días
                    </p>
                    <button
                        onClick={() => setShowRecommendations(!showRecommendations)}
                        className="bg-red-600 text-white p-2 rounded w-full mt-4"
                    >
                        {showRecommendations ? "Ocultar Recomendaciones" : "Ver Recomendaciones"}
                    </button>
                    {showRecommendations && (
                        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-lg shadow-inner">
                            <h4 className="text-lg font-semibold mb-2">Recomendaciones:</h4>
                            <ul className="list-disc list-inside">
                                {generateRecommendations(dupont).map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        onClick={() => setShowEvaluation(!showEvaluation)}
                        className="bg-blue-600 text-white p-2 rounded w-full mt-4"
                    >
                        {showEvaluation ? "Ocultar Evaluación" : "Ver Evaluación de la Empresa"}
                    </button>
                    {showEvaluation && (
                        <div className="mt-4 bg-blue-100 text-blue-700 p-4 rounded-lg shadow-inner">
                            <h4 className="text-lg font-semibold mb-2">Evaluación de la Empresa:</h4>
                            <ul className="list-disc list-inside">
                                {evaluateCompany(dupont).map((evalItem, index) => (
                                    <li key={index}>{evalItem}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default DupontAnalysis;
