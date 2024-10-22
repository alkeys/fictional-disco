import Header from "../component/Header.jsx";
import { useEffect, useState } from "react";
import json19 from "../Data/Balances/2019.json";
import json20 from "../Data/Balances/2020.json";
import json21 from "../Data/Balances/2021.json";
import json22 from "../Data/Balances/2022.json";
import json23 from "../Data/Balances/2023.json";
import BalanceGeneral from "../component/BalancesGeneral.jsx";

export const Balances = () => {
    const [json, setJson] = useState(json19);
    const [selectedYear, setSelectedYear] = useState(2019); // Inicializa con un año por defecto

    useEffect(() => {
        // Función para obtener el año desde localStorage y actualizar el estado
        const fetchYearFromLocalStorage = () => {
            const anio = localStorage.getItem('selectedYear');
            if (anio) {
                setSelectedYear(Number(anio));
            }
        };
        fetchYearFromLocalStorage();
        const interval = setInterval(fetchYearFromLocalStorage, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Actualiza el JSON según el año seleccionado
        switch (selectedYear) {
            case 2019:
                setJson(json19);
                break;
            case 2020:
                setJson(json20);
                break;
            case 2021:
                setJson(json21);
                break;
            case 2022:
                setJson(json22);
                break;
            case 2023:
                setJson(json23);
                break;
            default:
                setJson(json19); // Fallback en caso de un año no válido
        }
    }, [selectedYear]); // Dependencia de selectedYear

    return (
        <>
            <Header selectedYear={selectedYear} onYearChange={setSelectedYear} />
            <BalanceGeneral balance={json} Anio={selectedYear} />
        </>
    );
};
