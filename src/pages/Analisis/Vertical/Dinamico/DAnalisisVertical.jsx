import React, { useState } from 'react';
import BalanceV from "./BalanceV.jsx";
import EstadoV from "./EstadoV.jsx";
import BotonDescargarImagen from "../../../../component/BotonDescargarImagen.jsx";
import BotonDescargarPDF from "../../../../component/BotonDescargarPDF.jsx";

const AnalisisVertical = () => {
    const dataBalance = JSON.parse(localStorage.getItem("BalancesPorAnio"));
    const dataEstado = JSON.parse(localStorage.getItem("EstadosPorAnio"));
    const [mostrarBalance, setMostrarBalance] = useState(true);

    return (
        <div>
            <div className="flex justify-center mt-2 mb-4">
                <section className="mx-3">
                    <BotonDescargarImagen idElemento="AnalisisHorizontal"/>
                </section>
                <section className="mx-3">
                    <BotonDescargarPDF idElemento="AnalisisHorizontal"/>
                </section>
            </div>
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
            <div id={"AnalisisHorizontal"} className={"min-h-[100vh]"} >
                {mostrarBalance ? <BalanceV data={dataBalance}/> : <EstadoV data={dataEstado}/>}
            </div>

        </div>
    );
};

export default AnalisisVertical;