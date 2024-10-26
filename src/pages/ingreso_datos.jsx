import React from "react";
import { useEffect, useState } from "react";
import catalogo_cuentas from "../Data/Balances/catalogo_coca-cola.json";
import BalanceGeneral from "../component/Balance_General";
import flechaAtras from "../images/back-button-white.png";

export const IngresoDatos = () => {
    const [catalogo, setCatalogo] = useState([]);
    const [seleccion, setSeleccion] = useState(catalogo_cuentas.balance.name);

    useEffect(() => {
        const catalogoArray = [catalogo_cuentas.balance, catalogo_cuentas.resultados];
        setCatalogo(catalogoArray);
    }, []);

    const handleSeleccion = (event) => {
        setSeleccion(event.target.value);
    };

    const handleInicio = () => {
        history.push("/");
    }

    return (
        <div className="bg-red-700 pb-6">
            <button className="mx-4 my-3">
                <a href="/">
                    <img 
                        src={flechaAtras}
                        alt="atrás"
                        className="w-7 h-7"
                    />
                </a>
            </button>
            <div className="flex flex-col text-center px-10 py-4 bg-red-700">
                <h1 className="text-5xl font-bold mb-6 text-white">
                    Ingreso de Datos
                </h1>
                <section className="flex items-center justify-center">
                    <label htmlFor="select_estado" className="px-2 text-white">
                        Seleccione tipo de Estado:
                    </label>
                    <select id="select_estado" className="border rounded " value={seleccion} onChange={handleSeleccion}>
                        {catalogo.map((estado, index) => (
                            <option key={index} value={estado.name}>
                                {estado.name}
                            </option>
                        ))}    
                    </select>
                </section>
            </div>
            <div className="flex flex-col text-center py-6 mx-3 px-3 md:mx-10 md:px-10 border rounded-lg bg-white">
                {seleccion === 'Balance General' ? (
                    <BalanceGeneral estado={catalogo[0]} />
                ) : (
                    <BalanceGeneral estado={catalogo[1]} />
                )}
            </div>

        </div>
    );
};
