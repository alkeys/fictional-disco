import React, {useState, useEffect} from "react";  

const BalanceGeneral = ({estado, anio, document}) => {

    const esBalanceGeneral = estado.name === "Balance General" ? true : false;

    return (
        <>
            {document ? (
                <table className="text-left">
                    <thead></thead>
                    <tbody>
                    <tr>
                    <td>&nbsp;</td>
                    </tr>
                    {Object.keys(document).splice(2).map((key1, index1) => (
                        <React.Fragment key={index1}>
                            <tr>
                                <td colSpan={3}>
                                    {esBalanceGeneral ? (
                                        <strong>{key1}</strong>
                                    ) : (
                                        key1
                                    )}
                                </td>
                                {document[key1] && typeof document[key1] === 'object' && Object.keys(document[key1]).length > 0 ? (
                                    // Si `key1` tiene subcuentas, no mostramos el input
                                    <td>&nbsp;</td>
                                ) : (
                                    // Si `key1` no tiene subcuentas, mostramos el input
                                    <td>
                                        {key1 === "name_empresa" ? (
                                            <input
                                                type="text"
                                                value={document[key1]}
                                                onChange={(e) => handleInputChange(e, key1)}
                                                className="border border-black rounded px-2 w-16 md:w-56"
                                            />
                                        ) : (
                                            <input
                                                type="number"
                                                value={document[key1]}
                                                onChange={(e) => handleInputChange(e, key1)}
                                                className="border border-black rounded px-2 w-16 md:w-56"
                                            />
                                        )}
                                    </td>
                                )}
                                {esBalanceGeneral ? (
                                    <td>
                                        <button
                                            className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                            onClick={() => handleAddAccount(key1)}
                                        >
                                            +
                                        </button>
                                    </td>
                                ) : (
                                    <td>&nbsp;</td>
                                )}
                            </tr>
                            {document[key1] && typeof document[key1] === 'object' && Object.keys(document[key1]).length > 0 ? (
                                Object.keys(document[key1]).map((key2, index2) => (
                                    <React.Fragment key={index2}>
                                        <tr>
                                            <td colSpan={3} className="px-4">
                                                <strong>{key2}</strong>
                                            </td>
                                            {key2 === "dia" || key2 === "mes" || key2 === "anio" ? (
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={document[key1][key2]}
                                                        onChange={(e) => handleInputChange(e, key1, key2)}
                                                        className="border border-black rounded px-2 w-16 md:w-56"
                                                    />
                                                </td>
                                            ) : (
                                                <td>&nbsp;</td>
                                            )}
                                            <td>
                                                <button
                                                    className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                    onClick={() => handleAddAccount(key1, key2)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                        </tr>
                                        {document[key1][key2] && typeof document[key1][key2] === 'object' && Object.keys(document[key1][key2]).length > 0 ? (
                                            Object.keys(document[key1][key2]).map((key3, index3) => (
                                                <React.Fragment key={index3}>
                                                    <tr>
                                                        <td colSpan={3} className="px-7">
                                                            {/* Aplica negrita solo si `key3` tiene subcuentas */}
                                                            {document[key1][key2][key3] && typeof document[key1][key2][key3] === 'object' && Object.keys(document[key1][key2][key3]).length > 0 ? (
                                                                <strong>{key3}</strong>
                                                            ) : (
                                                                key3
                                                            )}
                                                        </td>
                                                        {document[key1][key2][key3] && typeof document[key1][key2][key3] === 'object' && Object.keys(document[key1][key2][key3]).length > 0 ? (
                                                            // Si `key3` tiene subcuentas, no mostramos el input
                                                            <td>&nbsp;</td>
                                                        ) : (
                                                            // Si `key3` no tiene subcuentas, mostramos el input
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={document[key1][key2][key3]}
                                                                    onChange={(e) => handleInputChange(e, key1, key2, key3)}
                                                                    className="border border-black rounded px-2 w-16 md:w-56"
                                                                />
                                                            </td>
                                                        )}
                                                        <td>
                                                            <button
                                                                className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                onClick={() => handleAddAccount(key1, key2, key3)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                onClick={() => handleDeleteAccount(key1, key2, key3)}
                                                            >
                                                                -
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {document[key1][key2][key3] && typeof document[key1][key2][key3] === 'object' && Object.keys(document[key1][key2][key3]).length > 0 ? (
                                                        Object.keys(document[key1][key2][key3]).map((key4, index4) => (
                                                            <React.Fragment key={index4}>
                                                                <tr>
                                                                    <td colSpan={3} className="px-10">
                                                                        {key4}
                                                                    </td>
                                                                    {document[key1][key2][key3][key4] &&typeof document[key1][key2][key3][key4] === 'object' && Object.keys(document[key1][key2][key3][key4]).length > 0 ? (
                                                                        // Si `key4` tiene subcuentas, no mostramos el input
                                                                        <td>&nbsp;</td>
                                                                    ) : (
                                                                        // Si `key4` no tiene subcuentas, mostramos el input
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                value={document[key1][key2][key3][key4]}
                                                                                onChange={(e) => handleInputChange(e, key1, key2, key3, key4)}
                                                                                className="border border-black rounded px-2 w-16 md:w-56"
                                                                            />
                                                                        </td>
                                                                    )}
                                                                    <td>
                                                                        <button
                                                                            className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                            onClick={() => handleAddAccount(key1, key2, key3, key4)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                            onClick={() => handleDeleteAccount(key1, key2, key3, key4)}
                                                                        >
                                                                            -
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                {document[key1][key2][key3][key4] && typeof document[key1][key2][key3][key4] === 'object' && Object.keys(document[key1][key2][key3][key4]).length > 0 ? (
                                                                    Object.keys(document[key1][key2][key3][key4]).map((key5, index5) => (
                                                                        <React.Fragment key={index5}>
                                                                            <tr>
                                                                                <td colSpan={3} className="px-12">
                                                                                    {key5}
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={document[key1][key2][key3][key4][key5]}
                                                                                        onChange={(e) => handleInputChange(e, key1, key2, key3, key4, key5)}
                                                                                        className="border border-black rounded px-2 w-16 md:w-56"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                <button
                                                                                    className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                                    onClick={() => handleAddAccount(key1, key2, key3, key4, key5)}
                                                                                >
                                                                                    +
                                                                                </button>
                                                                                </td>
                                                                                <td>
                                                                                    <button
                                                                                        className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                                        onClick={() => handleDeleteAccount(key1, key2, key3, key4, key5)}
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        {/* Mensaje opcional si `key4` no tiene cuentas */}
                                                                        <td>&nbsp;</td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            {/* Mensaje opcional si `key3` no tiene cuentas */}
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                {/* Mensaje opcional si `key2` no tiene cuentas */}
                                                <td>&nbsp;</td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    {/* Mensaje opcional si `key1` no tiene cuentas */}
                                    <td>&nbsp;</td>
                                </tr>
                            )}
                        </React.Fragment>    
                    ))}
                </tbody>
                </table>
            ) : (
                <p>No hay datos para mostrar...</p>
            )}
        </>
    );
};

export default BalanceGeneral;