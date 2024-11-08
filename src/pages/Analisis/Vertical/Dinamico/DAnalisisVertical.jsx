import React, { useState } from 'react';
import BalanceV from "./BalanceV.jsx";
import EstadoV from "./EstadoV.jsx";

const AnalisisVertical = () => {
    const dataBalance = JSON.parse(localStorage.getItem("BalancesPorAnio"));
    const dataEstado = JSON.parse(localStorage.getItem("EstadosPorAnio"));
    const [mostrarBalance, setMostrarBalance] = useState(true);

    return (
        <div>
            <div className="mb-4">
                <button
                    onClick={() => setMostrarBalance(true)}
                    className={`mr-2 p-2 rounded-lg ${mostrarBalance ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Balance
                </button>
                <button
                    onClick={() => setMostrarBalance(false)}
                    className={`p-2 rounded-lg ${!mostrarBalance ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Estado de Resultado
                </button>
            </div>
            {mostrarBalance ? <BalanceV data={dataBalance} /> : <EstadoV data={dataEstado} />}
        </div>
    );
};

export default AnalisisVertical;