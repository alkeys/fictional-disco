import React from "react";

const EstadoDinamico = ({ estado }) => {

    return (
        <>
            {estado ? (
                <table className="text-left">
                    <thead className="text-center font-bold">
                        <tr>{estado.name}</tr>
                        <tr>{estado.name_empresa}</tr>
                        <tr>Del {estado.fecha.dia} de {estado.fecha.mes} del {estado.fecha.anio}</tr>
                    </thead>
                    <tbody>
                        {Object.keys(estado).splice(4).map((key1, index1) => (
                            <React.Fragment key={index1}>
                                <tr>
                                    <td colSpan={3}>
                                        <strong>{key1}</strong>
                                    </td>
                                    {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 ? (
                                        <td></td>
                                    ) : (
                                        <td>
                                            ${estado[key1]}
                                        </td>
                                    )}
                                </tr>
                                {estado[key1] && typeof estado[key1] === 'object' && Object.keys(estado[key1]).length > 0 && (
                                    Object.keys(estado[key1]).map((key2, index2) => (
                                        <React.Fragment key={index2}>
                                            <tr>
                                                <td colSpan={3}  className="px-4 py-2">
                                                    <strong>{key2}</strong>
                                                </td>
                                                {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 ? (
                                                    <td></td>
                                                ) : (
                                                    <td className="text-right">
                                                        <strong>${estado[key1][key2]}</strong>
                                                    </td>
                                                )}
                                            </tr>
                                            {estado[key1][key2] && typeof estado[key1][key2] === 'object' && Object.keys(estado[key1][key2]).length > 0 && (
                                                    Object.keys(estado[key1][key2]).map((key3, index3) => (
                                                        <React.Fragment key={index3}>
                                                            <tr>
                                                                <td colSpan={3} className="px-8 py-2">
                                                                    {key3}
                                                                </td>
                                                                {estado[key1][key2][key3] && typeof estado[key1][key2][key3] === 'object' && Object.keys(estado[key1][key2][key3]).length > 0 ? (
                                                                    <td></td>
                                                                ) : (
                                                                    <td className="text-right">
                                                                        ${estado[key1][key2][key3]}
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
