import React from 'react';

const BalanceGeneral = ({ balance, Anio }) => {
    if (!balance) {
        return <p className="text-white text-center">Cargando datos del balance...</p>;
    }

    let activosCorrientes = balance.Activos["Activos Corrientes"];
    let activosNoCorrientes = balance.Activos["Activos No Corrientes"];
    let pasivosCorrientes = balance["Pasivo y Capital"]["Pasivos Corrientes"];
    let pasivosNoCorrientes = balance["Pasivo y Capital"]["Pasivos No Corrientes"];
    let capital = balance["Pasivo y Capital"].Capital;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-600 p-8">
            <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Cursive' }}>
                Balance General {Anio}
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                {/* Activos */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">Activos</h2>

                <h3 className="text-xl font-semibold text-black mb-2">Activos Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(balance.Activos["Activos Corrientes"]).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${activosCorrientes[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h3 className="text-xl font-semibold text-black mb-2">Activos No Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(activosNoCorrientes).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${activosNoCorrientes[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pasivos */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">Pasivos</h2>

                <h3 className="text-xl font-semibold text-black mb-2">Pasivos Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(pasivosCorrientes).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${pasivosCorrientes[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h3 className="text-xl font-semibold text-black mb-2">Pasivos No Corrientes</h3>
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(pasivosNoCorrientes).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${pasivosNoCorrientes[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Capital */}
                <h2 className="text-3xl font-bold text-red-600 mb-4">Capital</h2>
                <table className="table-auto w-full mb-8">
                    <tbody>
                    {Object.keys(capital).map((key, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2 text-right text-red-600 font-semibold">${capital[key].toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BalanceGeneral;
