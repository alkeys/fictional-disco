import React from "react";
import { useEffect, useState } from "react";
import catalogo_cuentas from "../Data/Balances/catalogo_cuentas.json";
import BalanceGeneral from "../component/Balance_General";
import EstadoResultados from "../component/EstadoResultados";

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

    return (
        <>
            <div className="flex flex-col text-center px-10 py-4">
                <h1 className="text-5xl font-bold mb-6">
                    Ingreso de Datos
                </h1>
                <section className="flex items-center justify-center">
                    <label htmlFor="select_estado">Seleccione tipo de Estado: </label>
                    <select id="select_estado" value={seleccion} onChange={handleSeleccion}>
                        {catalogo.map((estado, index) => (
                            <option key={index} value={estado.name}>
                                {estado.name}
                            </option>
                        ))}    
                    </select>
                </section>

                { seleccion === 'Balance General' ? (
                    <BalanceGeneral estado={catalogo[0]}/>
                ) : (
                    <BalanceGeneral estado={catalogo[1]}/>
                )}
            </div>
        </>
    );
};
