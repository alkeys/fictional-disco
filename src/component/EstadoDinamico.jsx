import React from "react";

const EstadoDinamico = ({ estado }) => {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    return (
        <>
            {estado ? (
                <table className="w-full text-left border">
                    <thead className="text-center font-bold text-red-700">
                        <tr>
                            <th colSpan="100%" className="pb-1 pt-3">
                                {estado.name}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="100%" className="py-1">
                                {estado.name_empresa}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="100%" className="pt-1 pb-5">
                                Del {estado.fecha.dia} de {meses[estado.fecha.mes - 1]} del {estado.fecha.anio}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(estado)
                            .filter(key1 => !["id", "name", "name_empresa", "fecha"].includes(key1))
                            .map((key1, index1) => (
                                <React.Fragment key={index1}>
                                    <tr className={index1 % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td colSpan={3} className="p-3">
                                            {estado.name === "Balance General" ? (
                                                <strong>{key1}</strong>
                                            ) : (
                                                key1
                                            )}
                                        </td>
                                        {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 ? (
                                            <td>&nbsp;</td>
                                        ) : (
                                            <td className={estado.name === "Estado de Resultados" && key1 === "Utilidad (pérdida) neta consolidada" ? "text-red-500" : ""}>
                                                ${Number(estado[key1]).toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                    {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 &&
                                        Object.keys(estado[key1]).map((key2, index2) => (
                                            <React.Fragment key={index2}>
                                                <tr className={index2 % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                                    <td colSpan={3} className="px-4 py-3">
                                                        <strong>{key2}</strong>
                                                    </td>
                                                    {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 ? (
                                                        <td>&nbsp;</td>
                                                    ) : (
                                                        <td className="text-right text-red-500">
                                                            <strong className="">
                                                                ${Number(estado[key1][key2]).toLocaleString()}
                                                            </strong>
                                                        </td>
                                                    )}
                                                </tr>
                                                {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 &&
                                                    Object.keys(estado[key1][key2]).map((key3, index3) => (
                                                        <React.Fragment key={index3}>
                                                            <tr className={index3 % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                                                <td colSpan={3} className="px-8 py-3">
                                                                    {["Total activos corrientes", "Total activos no corrientes", "Total pasivos corrientes", "Total pasivos no corrientes"].includes(key3) ? (
                                                                        <strong>{key3}</strong>
                                                                    ) : (
                                                                        <p className="px-2">
                                                                            {key3}
                                                                        </p>
                                                                    )}
                                                                </td>
                                                                {estado[key1][key2][key3] && typeof estado[key1][key2][key3] === 'object' && Object.keys(estado[key1][key2][key3]).length > 0 ? (
                                                                    <td></td>
                                                                ) : (
                                                                    ["Total activos corrientes", "Total activos no corrientes", "Total pasivos corrientes", "Total pasivos no corrientes"].includes(key3) ? (
                                                                        <td className="text-right text-red-500 px-2">
                                                                            <strong>${Number(estado[key1][key2][key3]).toLocaleString()}</strong>
                                                                        </td>
                                                                    ) : (
                                                                        <td className="text-right px-2">
                                                                            ${Number(estado[key1][key2][key3]).toLocaleString()}
                                                                        </td>
                                                                    )
                                                                )}
                                                            </tr>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
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


