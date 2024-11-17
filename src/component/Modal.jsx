import React, { useState } from 'react';
import Modal from '../../../component/Modal';
import { transformarDatosA_Balance, transformarDatosDinamicos } from "../../../Services/Cositas.js";
import BotonDescargarImagen from "../../../component/BotonDescargarImagen.jsx";
import BotonDescargarPDF from "../../../component/BotonDescargarPDF.jsx";

const DupontAnalysis = () => {
    const balanceData = transformarDatosA_Balance();
    const incomeData = transformarDatosDinamicos();
    let nameEmpresa;

    const [selectedYear, setSelectedYear] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const formatearMoneda = (valor) => {
        return valor ? `$${parseFloat(valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '$0.00';
    };

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

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
        const proveedores = parseFloat(balance["Pasivo y Capital"]?.["Pasivos Corrientes"]?.["Proveedores"] || 0);
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

    const dupont = calculateDupont();

    return (
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-8">
            <div className="flex justify-center mt-2 mb-4">
                <section className="mx-3">
                    <BotonDescargarImagen idElemento="AnalisisHorizontal" />
                </section>
                <section className="mx-3">
                    <BotonDescargarPDF idElemento="AnalisisHorizontal" />
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
                    <h3 className="text-2xl font-semibold mb-2 text-center">Resultados del análisis - Año {selectedYear}</h3>
                    <h4 className="text-xl font-semibold mb-2 text-center">Empresa: {nameEmpresa}</h4>
                    <p className="mb-2"><span className="font-semibold">Utilidad Neta:</span> {formatearMoneda(dupont?.utilidadNeta)}</p>
                    <p className="mb-2"><span className="font-semibold">Activos Totales:</span> {formatearMoneda(dupont?.totalActivos)}</p>
                    <p className="mb-2"><span className="font-semibold">Capital Total:</span> {formatearMoneda(dupont?.totalCapital)}</p>
                    <p className="mb-2"><span className="font-semibold">Margen de Utilidad:</span> {dupont?.margenUtilidad}%
                        <button
                            onClick={() => openModal('El margen de utilidad indica la proporción de ingresos convertidos en ganancias.')}
                            className="ml-2 text-sm text-blue-500 underline"
                        >
                            ¿Qué es esto?
                        </button>
                    </p>
                    <p className="mb-2"><span className="font-semibold">Rotación de Activos:</span> {dupont?.rotacionActivos}</p>
                    <p className="mb-2"><span className="font-semibold">Multiplicador de Capital:</span> {dupont?.apalancamiento}</p>
                    <p className="mb-2"><span className="font-semibold">ROE (Rentabilidad sobre el Capital):</span> {dupont?.retornoSobreCapital}%</p>
                    <p className="mb-2"><span className="font-semibold">Liquidez Corriente:</span> {dupont?.liquidezCorriente}</p>
                    <p className="mb-2"><span className="font-semibold">Prueba Ácida:</span> {dupont?.Acida}</p>
                    <p className="mb-2"><span className="font-semibold">Ratio de Deuda sobre Capital:</span> {dupont?.ratioDeudaSobreCapital}</p>
                    <p className="mb-2"><span className="font-semibold">Rentabilidad sobre Activos (ROA):</span> {dupont?.rentabilidadSobreActivos}%</p>
                    <p className="mb-2"><span className="font-semibold">Periodo Promedio de Cobro:</span> {dupont?.periodoPromedioCobro} días</p>
                    <p className="mb-2"><span className="font-semibold">Periodo Promedio de Pago:</span> {dupont?.periodoPromedioPago} días</p>
                </div>
            )}
            <Modal show={showModal} onClose={closeModal} title="Explicación">
                <p>{modalContent}</p>
            </Modal>
        </div>
    );
};

export default DupontAnalysis;
