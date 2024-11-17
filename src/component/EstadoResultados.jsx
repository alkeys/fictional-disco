import React from "react";

const EstadoResultados = ({ estado, Anio }) => {
    if (!estado) {
        return <p className="text-white text-center">Cargando datos del balance...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-600 p-8">
            <h1 className="text-5xl font-bold text-white mb-6" style={{fontFamily: 'Cursive'}}>
                Estado Resultados {Anio}
            </h1>
            <h2 className="text-3xl font-bold text-white mb-6">Empresa: Coca Cola FEMSA</h2>
            <h3 className="text-2xl font-bold text-white mb-6">Cifras en millones de dolares</h3>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(estado).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${estado[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EstadoResultados;