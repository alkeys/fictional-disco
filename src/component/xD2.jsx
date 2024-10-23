import React, { useState } from "react";

const BalanceGeneral = ({ estado }) => {
    if(!estado) {
        return <p className="text-center">Cargando datos del balance...</p>
    }

    let activosCorrientes = estado.Activos["Activo Corriente"];
    let efectivoYEquivalentes = activosCorrientes["Efectivo y equivalentes"];

    return (
        <>
            <table className="text-left">
                <thead></thead>
                <tbody>
                    {Object.keys(estado.Activos).map((key, index) => (
                        <tr key={index}>
                            {key}
                            {Object.keys(estado.Activos[key]).map((key2, index2) => (
                                <tr key={index2}>
                                    {key2}
                                    {Object.keys(estado.Activos[key][key2]).map((key3, index3) => (
                                        <tr key={index3}>
                                            {key3}
                                            <td>
                                                <input type="text" className="border border-black" value={estado.Activos[key][key2][key3]} />
                                            </td>
                                        </tr>
                                    ))}
                                </tr>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BalanceGeneral;