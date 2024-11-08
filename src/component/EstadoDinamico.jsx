import React from "react";

const EstadoDinamico = ({ estado }) => {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    return (
        <>
            {estado ? (
                <table className="text-left">
                    <thead className="text-center font-bold">
                        <tr>
                            <th colSpan="100%">
                                {estado.name}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="100%">
                                {estado.name_empresa}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="100%">
                                Del {estado.fecha.dia} de {meses[estado.fecha.mes - 1]} del {estado.fecha.anio}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(estado).filter(key1 => !["id", "name", "name_empresa", "fecha"].includes(key1)).map((key1, index1) => (
                            <React.Fragment key={index1}>
                                <tr>
                                    <td colSpan={3}>
                                        {estado.name === "Balance General" ? (
                                            <strong>{key1}</strong>
                                        ) : (
                                            key1
                                        )}
                                    </td>
                                    {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 ? (
                                        <td>&nbsp;</td>
                                    ) : (
                                        <td>
                                            ${Number(estado[key1]).toLocaleString()}
                                        </td>
                                    )}
                                </tr>
                                {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 && (
                                    Object.keys(estado[key1]).map((key2, index2) => (
                                        <React.Fragment key={index2}>
                                            <tr>
                                                <td colSpan={3} className="px-4 py-2">
                                                    <strong>{key2}</strong>
                                                </td>
                                                {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 ? (
                                                    <td>&nbsp;</td>
                                                ) : (
                                                    <td className="text-right">
                                                        <strong>${Number(estado[key1][key2]).toLocaleString()}</strong>
                                                    </td>
                                                )}
                                            </tr>
                                            {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 && (
                                                Object.keys(estado[key1][key2]).map((key3, index3) => (
                                                    <React.Fragment key={index3}>
                                                        <tr>
                                                            <td colSpan={3} className="px-8 py-2">
                                                                {["Total activos corrientes", "Total activos no corrientes", "Total pasivos corrientes", "Total pasivos no corrientes"].includes(key3) ? (
                                                                    <strong>{key3}</strong>
                                                                ) : (
                                                                    key3
                                                                )}
                                                            </td>
                                                            {estado[key1][key2][key3] && typeof estado[key1][key2][key3] === 'object' && Object.keys(estado[key1][key2][key3]).length > 0 ? (
                                                                <td></td>
                                                            ) : (
                                                                <td className="text-right">
                                                                    ${Number(estado[key1][key2][key3]).toLocaleString()}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aquí se mostrará la información seleccionada</p>
            )}
        </>
    );
}

export default EstadoDinamico;
