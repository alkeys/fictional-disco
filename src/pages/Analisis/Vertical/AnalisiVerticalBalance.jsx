import React from "react";

const AnalisisVerticalBalance = ({ balanceData }) => {
    const totalActivos = balanceData.Activos["Total Activos"];
    const totalPasivosCapital = balanceData["Pasivo y Capital"]["Total Pasivos y Capital"];

    const calcularPorcentaje = (valor, total) => ((valor / total) * 100).toFixed(2);

    const renderItems = (items, total) => {
        return Object.keys(items).map((key) => {
            if (typeof items[key] === "object") {
                return (
                    <div key={key} className="ml-6 mb-2 border-l-2 border-red-400 pl-2">
                        <strong className="text-red-800">{key}</strong>
                        <div>{renderItems(items[key], total)}</div>
                    </div>
                );
            } else {
                const porcentaje = calcularPorcentaje(items[key], total);
                return (
                    <div key={key} className="flex justify-between text-red-800 mb-2">
                        <span>{key}:</span>
                        <span>${items[key]} ({porcentaje}%)</span>
                    </div>
                );
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-red-800 text-red-900">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Análisis Vertical del Balance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 bg-red-50 rounded-lg shadow-md border border-red-300">
                    <h3 className="font-bold text-xl mb-4 text-center text-red-800 border-b-2 border-red-400 pb-2">Activos</h3>
                    <div className="ml-4">
                        {renderItems(balanceData.Activos, totalActivos)}
                    </div>
                    <div className="font-semibold text-red-700 mt-4 text-right">
                        Total Activos: ${totalActivos}
                    </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg shadow-md border border-red-300">
                    <h3 className="font-bold text-xl mb-4 text-center text-red-800 border-b-2 border-red-400 pb-2">Pasivo y Capital</h3>
                    <div className="ml-4">
                        {renderItems(balanceData["Pasivo y Capital"], totalPasivosCapital)}
                    </div>
                    <div className="font-semibold text-red-700 mt-4 text-right">
                        Total Pasivo y Capital: ${totalPasivosCapital}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalisisVerticalBalance;
