import React, { useState, useEffect } from 'react';

const AnalisisVertical = ({ data }) => {
    // Estado para el año seleccionado
    const [añoSeleccionado, setAñoSeleccionado] = useState("");
    const [analisis, setAnalisis] = useState([]);

    // Función para calcular el porcentaje
    const calcularPorcentaje = (valor, total) => {
        return ((valor / total) * 100).toFixed(2);
    };


    // Función para resaltar las cuentas importantes
    const esCuentaImportante = (cuenta) => {
        const cuentasImportantes = [
            "Total activos corrientes",
            "Total activos no corrientes",
            "Total pasivos corrientes",
            "Total pasivos no corrientes",
            "Total Pasivos",
            "Total Capital",
            "Total Activos"
        ];

        return cuentasImportantes.some((item) => cuenta.toLowerCase().includes(item.toLowerCase()));
    };


    // Función recursiva para extraer todas las cuentas y calcular su porcentaje
    const procesarDatos = (data) => {
        return data.map((item) => {
            const totalActivos = item.Activos["Total Activos"];
            const totalPasivosYCapital = item["Pasivo y Capital"]["Total Pasivos y Capital"]; // Total combinado

            // Función recursiva para recorrer cada objeto y calcular los porcentajes
            const obtenerCuentasYPorcentajes = (objeto, total) => {
                let cuentas = {};
                for (let clave in objeto) {
                    if (typeof objeto[clave] === "object") {
                        // Llamada recursiva si es un objeto
                        cuentas = { ...cuentas, ...obtenerCuentasYPorcentajes(objeto[clave], total) };
                    } else {
                        // Solo calcular si se encuentra el total correspondiente
                        if (clave.includes("Total") || objeto[clave] !== undefined) {
                            cuentas[clave] = calcularPorcentaje(objeto[clave], total);
                        }
                    }
                }
                return cuentas;
            };

            // Obtener todas las cuentas de Activos, Pasivos y Capital
            const cuentasActivos = obtenerCuentasYPorcentajes(item.Activos, totalActivos);
            const cuentasPasivosYCapital = obtenerCuentasYPorcentajes(item["Pasivo y Capital"], totalPasivosYCapital);

            return {
                empresa: item.name_empresa,
                cuentasActivos,
                cuentasPasivosYCapital,
            };
        });
    };

    // Actualizar el análisis cuando cambia el año seleccionado
    useEffect(() => {
        if (añoSeleccionado && data[añoSeleccionado]) {
            setAnalisis(procesarDatos(data[añoSeleccionado]));
        } else {
            setAnalisis([]);
        }
    }, [data, añoSeleccionado]);

    // Función para manejar el cambio en la selección del año
    const handleCambioAño = (e) => {
        setAñoSeleccionado(e.target.value);
    };

    return (
        <div className="p-6 bg-red-100 rounded-lg shadow-xl ">
            <h1 className="text-4xl font-bold text-center text-red-800 mb-6">
                Análisis Vertical {añoSeleccionado ? `- ${analisis.length > 0 ? analisis[0].empresa : ''}` : ''}
            </h1>

            {/* Selector de año */}
            <div className="mb-4">
                <label htmlFor="añoSelect" className="text-lg text-gray-700">Selecciona el Año: </label>
                <select
                    id="añoSelect"
                    value={añoSeleccionado}
                    onChange={handleCambioAño}
                    className="mt-2 p-2 rounded-lg border-2 border-red-400 bg-white text-gray-700"
                >
                    <option value="" disabled>
                        Seleccione un año
                    </option>
                    {Object.keys(data).map((año) => (
                        <option key={año} value={año}>
                            {año}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar mensaje si no hay un año seleccionado */}
            {!añoSeleccionado && (
                <p className="text-center text-red-800 font-semibold">Por favor, seleccione un año para mostrar el análisis.</p>
            )}

            {/* Tablas solo si hay datos */}
            {añoSeleccionado && analisis.length > 0 && (
                <>
                    {/* Tabla de Activos */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-red-800 mb-4">Activos</h2>
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Cuenta</th>
                                <th className="py-3 px-6 text-left">% de Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(analisis[0].cuentasActivos).map((cuenta, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-red-50 ${esCuentaImportante(cuenta) ? 'bg-gray-500 text-zinc-50  font-bold' : ''}`}
                                >
                                    <td className="py-2 px-6">{cuenta}</td>
                                    <td className="py-2 px-6">
                                        {analisis[0].cuentasActivos[cuenta]
                                            ? `${analisis[0].cuentasActivos[cuenta]}%`
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Tabla de Pasivos y Capital */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-red-800 mb-4">Pasivos y Capital</h2>
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Cuenta</th>
                                <th className="py-3 px-6 text-left">% de Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(analisis[0].cuentasPasivosYCapital).map((cuenta, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-red-50 ${esCuentaImportante(cuenta) ? 'bg-gray-500 text-zinc-50 font-bold' : ''}`}
                                >
                                    <td className="py-2 px-6">{cuenta}</td>
                                    <td className="py-2 px-6">
                                        {analisis[0].cuentasPasivosYCapital[cuenta]
                                            ? `${analisis[0].cuentasPasivosYCapital[cuenta]}%`
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AnalisisVertical;
