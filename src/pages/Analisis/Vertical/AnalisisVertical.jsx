import React, { useState } from 'react';
import json19 from "../../../Data/Balances/2019.json";
import json20 from "../../../Data/Balances/2020.json";
import json21 from "../../../Data/Balances/2021.json";
import json22 from "../../../Data/Balances/2022.json";
import json23 from "../../../Data/Balances/2023.json";
import Ejson19 from "../../../Data/Resultados/2019.json";
import Ejson20 from "../../../Data/Resultados/2020.json";
import Ejson21 from "../../../Data/Resultados/2021.json";
import Ejson22 from "../../../Data/Resultados/2022.json";
import Ejson23 from "../../../Data/Resultados/2023.json";

import { AnalisisHorizontalBalance } from "../Horizontal/AnalisisHorizontalBalance.jsx";
import AnalisisHorizontalResultados from "../Horizontal/AnalisisHorizontalResultados.jsx";
import AnalisisVerticalBalance from "./AnalisiVerticalBalance.jsx";
import AnalisisVerticalEstadoResultado from "./AnalisisVerticalEstadoResultado.jsx";

export function AnalisisVertical() {
    const [anio1, setAnio1] = useState("2019");
    const [tipoAnalisis, setTipoAnalisis] = useState("Balance");
    const [dataYear1, setDataYear1] = useState(json19);

    if (!dataYear1) {
        return <p className="text-white text-center">Cargando datos...</p>;
    }

    const activosCorrientes = dataYear1.Activos["Activos Corrientes"];
    const activosNoCorrientes = dataYear1.Activos["Activos No Corrientes"];
    const pasivosCorrientes = dataYear1["Pasivo y Capital"]["Pasivos Corrientes"];
    const pasivosNoCorrientes = dataYear1["Pasivo y Capital"]["Pasivos No Corrientes"];
    const capital = dataYear1["Pasivo y Capital"].Capital;

    const handleAnio1Change = (event) => setAnio1(event.target.value);
    const handleTipoAnalisisChange = (event) => setTipoAnalisis(event.target.value);

    return (
        <div className="flex flex-col items-center p-6 bg-red-900 text-white shadow-lg rounded-lg border border-red-800">
            <h2 className="text-4xl font-bold mb-6 text-center tracking-wider">Análisis Financiero CocaCola </h2>
            <h3 className="text-2xl font-semibold mb-4 text-center">Cifras en millones de dólares</h3>

            <div className="flex flex-col sm:flex-row justify-center mb-6">
                <div className="mr-4 mb-2 sm:mb-0 flex flex-col items-center">
                    <label className="text-lg mb-2 font-medium">Año :</label>
                    <select
                        value={anio1}
                        onChange={handleAnio1Change}
                        className="bg-red-700 p-2 rounded-lg text-white shadow-md focus:ring-2 focus:ring-red-400 hover:bg-red-600 transition duration-200"
                    >
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
            </div>
            <div className="mb-6 flex flex-col items-center">
                <label className="text-lg mb-2 font-medium">Tipo de Análisis:</label>
                <select
                    className="bg-red-700 p-2 rounded-lg text-white shadow-md focus:ring-2 focus:ring-red-400 hover:bg-red-600 transition duration-200"
                    onChange={handleTipoAnalisisChange}
                >
                    <option value="Balance">Balance General</option>
                    <option value="resultado">Estado de Resultado</option>
                </select>
            </div>

            <div className="text-red-800 bg-white p-4 rounded-lg shadow-lg w-full">
                {tipoAnalisis === "Balance" ? (
                    <AnalisisVerticalBalance balanceData={getDataForYear(anio1, "Balance")} />
                ) : (
                    <AnalisisVerticalEstadoResultado estadoResultado={getDataForYear(anio1, "Resultado")}
                    />
                )}
            </div>
        </div>
    );
}

const getDataForYear = (year, tipo) => {
    switch (year) {
        case "2019":
            return tipo === "Balance" ? json19 : Ejson19;
        case "2020":
            return tipo === "Balance" ? json20 : Ejson20;
        case "2021":
            return tipo === "Balance" ? json21 : Ejson21;
        case "2022":
            return tipo === "Balance" ? json22 : Ejson22;
        case "2023":
            return tipo === "Balance" ? json23 : Ejson23;
        default:
            return {};
    }
};
