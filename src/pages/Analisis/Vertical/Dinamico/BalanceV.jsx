import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalisisVertical = ({ data }) => {
    const [añoSeleccionado, setAñoSeleccionado] = useState("");
    const [analisis, setAnalisis] = useState([]);
    const [filtroPorcentaje, setFiltroPorcentaje] = useState(0);

    // Función para calcular el porcentaje
    const calcularPorcentaje = (valor, total) => {
        return ((valor / total) * 100).toFixed(2);
    };

    // Formatear el valor con signo de dólar
    const formatearMoneda = (valor) => {
        return `$${valor.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    };

    // Procesar datos para incluir cantidad y porcentaje
    const procesarDatos = (data) => {
        return data.map((item) => {
            const totalActivos = item.Activos["Total Activos"];
            const totalPasivosYCapital = item["Pasivo y Capital"]["Total Pasivos y Capital"];

            // Función recursiva para recorrer y procesar datos
            const obtenerCuentas = (objeto, total) => {
                let cuentas = [];
                for (let clave in objeto) {
                    if (typeof objeto[clave] === "object") {
                        // Llamada recursiva si es un objeto
                        cuentas = [...cuentas, ...obtenerCuentas(objeto[clave], total)];
                    } else {
                        if (clave.includes("Total") || objeto[clave] !== undefined) {
                            cuentas.push({
                                cuenta: clave,
                                valor: objeto[clave],
                                porcentaje: calcularPorcentaje(objeto[clave], total),
                            });
                        }
                    }
                }
                return cuentas;
            };

            return {
                empresa: item.name_empresa,
                cuentasActivos: obtenerCuentas(item.Activos, totalActivos),
                cuentasPasivosYCapital: obtenerCuentas(item["Pasivo y Capital"], totalPasivosYCapital),
            };
        });
    };

    useEffect(() => {
        if (añoSeleccionado && data[añoSeleccionado]) {
            setAnalisis(procesarDatos(data[añoSeleccionado]));
        } else {
            setAnalisis([]);
        }
    }, [data, añoSeleccionado]);

    const handleCambioAño = (e) => {
        setAñoSeleccionado(e.target.value);
    };

    // Filtrar cuentas por porcentaje
    const filtrarPorcentaje = (cuentas) => {
        return cuentas.filter((cuenta) => cuenta.porcentaje >= filtroPorcentaje);
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

            {/* Mostrar gráficos */}
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
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        const { payload } = props; // Obtén el dato original
                                        return [`${value}% (${formatearMoneda(payload.valor)})`, "Porcentaje y Valor"];
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="porcentaje" name="Porcentaje" fill="#8884d8" />
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
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        const { payload } = props; // Obtén el dato original
                                        return [`${value}% (${formatearMoneda(payload.valor)})`, "Porcentaje y Valor"];
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="porcentaje" name="Porcentaje" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalisisVertical;
