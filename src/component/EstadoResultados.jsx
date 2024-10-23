import React from "react";
import { useEffect, useState } from "react";
import catalogo_cuentas from "../Data/Balances/catalogo_cuentas.json";

const EstadoResultados = () => {
    return (
        <>
            <div className="flex items-center justify-center text-center border border-black py-2 my-4">
                <form aria-required>
                    <h1>Estado: {catalogo_cuentas.resultados.name}</h1>
                    <section>
                        <label htmlFor="in_empresa">Nombre de la empresa: </label>
                        <input type="text" name="in_empresa" placeholder="Ingrese nombre empresa"/>
                    </section>
                    <section>
                        <label htmlFor="in_date">Fecha: </label>
                        <input type="date" name="in_date"/>
                    </section>
                </form>
            </div>
        </>
    );
}

export default EstadoResultados;