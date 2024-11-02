import json19 from "../Data/Balances/2019.json";
import json20 from "../Data/Balances/2020.json";
import json21 from "../Data/Balances/2021.json";
import json22 from "../Data/Balances/2022.json";
import json23 from "../Data/Balances/2023.json";
import Ejson19 from "../Data/Resultados/2019.json";
import Ejson20 from "../Data/Resultados/2020.json";
import Ejson21 from "../Data/Resultados/2021.json";
import Ejson22 from "../Data/Resultados/2022.json";
import Ejson23 from "../Data/Resultados/2023.json";

import {useState} from "react";
import {AnalisisHorizontalBalance} from "../pages/Analisis/AnalisisHorizontalBalance.jsx";
import AnalisisHorizontalResultados from "../pages/Analisis/AnalisisHorizontalResultados.jsx";




export const Screen2 = () => {
    const [anio1, setAnio1] = useState("2019");
    const [anio2, setAnio2] = useState("2020");
    const [tipoAnalisis, setTipoAnalisis] = useState("Balance");
    const handleAnio1Change = (event) => setAnio1(event.target.value);
    const handleAnio2Change = (event) => setAnio2(event.target.value);

    const handleTipoAnalisisChange = (event) => {
        setTipoAnalisis(event.target.value)

    };


    return (
        <div className="text-red-600 text-2xl font-bold">
            <div className="mb-4 text-red-50">
                <label className="mr-2">Año 1:</label>
                <select value={anio1}    onChange={handleAnio1Change} className="mr-4 bg-red-800">
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <label className="mr-2">Año 2:</label>
                <select value={anio2} className={"bg-red-800"} onChange={handleAnio2Change}>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
                <div className="mb-4 text-red-50">
                    <label className="mr-2">Tipo de Análisis:</label>
                    <select className="mr-4 bg-red-800" onChange={handleTipoAnalisisChange}>
                        <option value="Balance">Balance General</option>
                        <option value="resultado">Estado de Resultado</option>
                    </select>



                </div>
            {tipoAnalisis === "Balance" ? <AnalisisHorizontalBalance anio1={anio1} anio2={anio2}
          data1={getDataForYear(anio1,"Balance")} data2={getDataForYear(anio2,"Balance")}
            /> : <AnalisisHorizontalResultados
            anioActual={parseInt(anio1,10)} estadoActual={getDataForYear(anio1,"resultado")}
            estadoAnterior={getDataForYear(anio2,"resultado")} anioAnterior={parseInt(anio2,10)}
            />}        </div>
    );
};





const getDataForYear = (year,tipo) => {
    switch (year) {
        case "2019":
            return  tipo === "Balance" ? json19 : Ejson19;
        case "2020":
            return tipo === "Balance" ? json20 : Ejson20;
        case "2021":
            return tipo === "Balance" ? json21 : Ejson21;
        case "2022":
            return  tipo === "Balance" ? json22 : Ejson22;
        case "2023":
            return tipo === "Balance" ? json23 : Ejson23;
        default:
            return {};
    }
};