import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalisisVertical = ({ data }) => {
    const [añoSeleccionado, setAñoSeleccionado] = useState("");
    const [analisis, setAnalisis] = useState([]);
    const [detalleCuenta, setDetalleCuenta] = useState(null); // Estado para mostrar el detalle de la cuenta seleccionada
    const [filtroPorcentaje, setFiltroPorcentaje] = useState(0); // Filtro dinámico para el porcentaje

    // Función para calcular el porcentaje
    const calcularPorcentaje = (valor, total) => {
        return ((valor / total) * 100).toFixed(2);
    };

    // Lista de cuentas importantes
    const cuentasImportantes = [
        "Total activos corrientes",
        "Total activos no corrientes",
        "Total pasivos corrientes",
        "Total pasivos no corrientes",
        "Total Pasivos",
        "Total Capital",
        "Total Activos"
    ];

    // Función para resaltar las cuentas importantes
    const esCuentaImportante = (cuenta) => {
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

    // Función para mostrar el detalle de la cuenta seleccionada
    const mostrarDetalleCuenta = (cuenta, porcentaje, tipo) => {
        setDetalleCuenta({
            cuenta,
            porcentaje,
            tipo,
            analisis: generarAnalisis(cuenta, porcentaje),
        });
    };

    // Función que genera el análisis de la cuenta basado en el porcentaje
    const generarAnalisis = (cuenta, porcentaje) => {
        let analisis = "";
        if (porcentaje > 50) {
            analisis = `La cuenta "${cuenta}" tiene un porcentaje superior al 50%, lo que indica que representa una parte significativa del total.`;
        } else if (porcentaje > 20) {
            analisis = `La cuenta "${cuenta}" representa un porcentaje importante del total.`;
        } else if (porcentaje > 5) {
            analisis = `La cuenta "${cuenta}" tiene un porcentaje moderado en el total.`;
        } else {
            analisis = `La cuenta "${cuenta}" tiene un porcentaje bajo en el total.`;
        }
        return analisis;
    };

    // Filtrar cuentas por porcentaje, pero asegurándose de que las cuentas importantes no se oculten
    const filtrarPorcentaje = (cuentas) => {
        const cuentasImportantesFiltradas = Object.keys(cuentas)
            .filter(cuenta => esCuentaImportante(cuenta) || cuentas[cuenta] >= filtroPorcentaje)
            .map(cuenta => ({
                cuenta,
                porcentaje: cuentas[cuenta],
            }));

        return cuentasImportantesFiltradas;
    };

    // Función para manejar el clic en una barra del gráfico
    const handleBarClick = (data, tipo) => {
        const { cuenta, porcentaje } = data; // Asegúrate de que los datos pasados son correctos
        if (cuenta && porcentaje) {
            mostrarDetalleCuenta(cuenta, porcentaje, tipo); // Llamamos a la función que muestra el detalle
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-center text-red-800 mb-6">
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
                    <option value="" disabled>Seleccione un año</option>
                    {Object.keys(data).map((año) => (
                        <option key={año} value={año}>
                            {año}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro dinámico de porcentaje */}
            <div className="mb-4">
                <label className="text-lg text-gray-700">Filtrar cuentas con porcentaje mayor al: </label>
                <input
                    type="number"
                    value={filtroPorcentaje}
                    onChange={(e) => setFiltroPorcentaje(Number(e.target.value))}
                    className="mt-2 p-2 rounded-lg border-2 border-red-400 bg-white text-gray-700"
                />
            </div>

            {/* Mostrar mensaje si no hay un año seleccionado */}
            {!añoSeleccionado && (
                <p className="text-center text-red-800 font-semibold">Por favor, seleccione un año para mostrar el análisis.</p>
            )}

            {/* Mostrar los gráficos de análisis */}
            {añoSeleccionado && analisis.length > 0 && (
                <div>
                    {/* Gráfico de Activos */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-red-800 mb-4">Gráfico de Activos</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtrarPorcentaje(analisis[0].cuentasActivos)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="cuenta" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="porcentaje" fill="#8884d8" onClick={(data) => handleBarClick(data, "Activos")} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Pasivos y Capital */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-red-800 mb-4">Gráfico de Pasivos y Capital</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtrarPorcentaje(analisis[0].cuentasPasivosYCapital)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="cuenta" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="porcentaje" fill="#82ca9d" onClick={(data) => handleBarClick(data, "Pasivos y Capital")} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Detalle de la cuenta seleccionada - Ventana emergente */}
            {detalleCuenta && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-xl font-semibold text-red-800 mb-2">Detalle de la Cuenta</h3>
                        <p><strong>Cuenta:</strong> {detalleCuenta.cuenta}</p>
                        <p><strong>Porcentaje:</strong> {detalleCuenta.porcentaje}%</p>
                        <p><strong>Tipo:</strong> {detalleCuenta.tipo}</p>
                        <p><strong>Análisis:</strong> {detalleCuenta.analisis}</p>
                        <button
                            onClick={() => setDetalleCuenta(null)}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalisisVertical;
