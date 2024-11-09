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

    const calculateDupont = () => {
        if (!selectedYear) return null;

        const balance = balanceData[selectedYear] || {};
        const income = incomeData[selectedYear] || {};
        const utilidadNeta = parseFloat(income["Utilidad (pérdida) neta consolidada"] || 0);
        const ingresosTotales = parseFloat(income["Ingresos totales"] || 0);
        const totalActivos = parseFloat(balance.Activos?.["Total Activos"] || 0);
        const totalCapital = parseFloat(balanceData[selectedYear]["Pasivo y Capital"]["Total Capital"] || 0);

        const margenUtilidad = utilidadNeta / ingresosTotales || 0;
        const rotacionActivos = ingresosTotales / totalActivos || 0;
        const apalancamiento = totalActivos / totalCapital || 0;
        const retornoSobreCapital = margenUtilidad * rotacionActivos * apalancamiento;

        return {
            margenUtilidad: (margenUtilidad * 100).toFixed(2),
            rotacionActivos: rotacionActivos.toFixed(2),
            apalancamiento: apalancamiento.toFixed(2),
            retornoSobreCapital: (retornoSobreCapital * 100).toFixed(2)
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
            <h2 className="text-3xl font-bold mb-4 text-center">Análisis Dupont</h2>
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
                <div className="bg-white text-red-600 p-4 rounded-lg shadow-inner" id={"AnalisisHorizontal"}>
                    <h3 className="text-2xl font-semibold mb-2 text-center">Resultados del análisis Dupont -
                        Año {selectedYear}</h3>
                    <p className="mb-2"><span
                        className="font-semibold">Margen de Utilidad:</span> {dupont?.margenUtilidad}%</p>
                    <p className="mb-2"><span
                        className="font-semibold">Rotación de Activos:</span> {dupont?.rotacionActivos}</p>
                    <p className="mb-2"><span className="font-semibold">Apalancamiento:</span> {dupont?.apalancamiento}
                    </p>
                    <p className="mb-2"><span
                        className="font-semibold">Retorno sobre Capital:</span> {dupont?.retornoSobreCapital}%</p>
                </div>
            )}
        </div>
    );
};

export default DupontAnalysis;
