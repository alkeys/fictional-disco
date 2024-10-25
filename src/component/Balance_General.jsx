import React, {useState, useEffect} from "react";

const BalanceGeneral = ({estado}) => {
    const [balanceData, setBalanceData] = useState(null);
    
    useEffect(() => {
        if (estado) {
            setBalanceData(estado); // Cargar el balance inicial cuando `estado` esté disponible
        }
    }, [estado]);

    if (!balanceData) {
        return <p className="text-center">Cargando datos del balance...</p>;
    }

    // Valida si es un "Balance General" o "Estado de Resultados"
    const esBalanceGeneral = estado.name === "Balance General" ? true : false;

    // Eliminar cuenta específica
    const handleDeleteAccount = (key1, key2, key3, key4, key5) => {
        const newBalanceData = { ...balanceData };
    
        // Verifica qué nivel de cuenta está siendo eliminado y ajusta
        if (key5) {
            delete newBalanceData[key1][key2][key3][key4][key5];
        } else if (key4) {
            delete newBalanceData[key1][key2][key3][key4];
        } else if (key3) {
            delete newBalanceData[key1][key2][key3];
        } else if (key2) {
            delete newBalanceData[key1][key2];
        } else if (key1) {
            delete newBalanceData[key1];
        }
    
        setBalanceData(newBalanceData);
    };

    const handleAddAccount = (key1, key2, key3, key4) => {
    const newBalanceData = { ...balanceData };
    const newAccountName = prompt("Ingrese el nombre de la nueva cuenta:");

        if (newAccountName) {
            if (key4) {
                if (!newBalanceData[key1][key2][key3][key4]) {
                    newBalanceData[key1][key2][key3][key4] = {};
                }
                newBalanceData[key1][key2][key3][key4][newAccountName] = null;
            } else if (key3) {
                if (!newBalanceData[key1][key2][key3]) {
                    newBalanceData[key1][key2][key3] = {};
                }
                newBalanceData[key1][key2][key3][newAccountName] = null;
            } else if (key2) {
                if (!newBalanceData[key1][key2]) {
                    newBalanceData[key1][key2] = {};
                }
                newBalanceData[key1][key2][newAccountName] = null;
            } else if (key1) {
                if (!newBalanceData[key1]) {
                    newBalanceData[key1] = {};
                }
                newBalanceData[key1][newAccountName] = null;
            }
        }

        setBalanceData(newBalanceData);
    };

    // Función para manejar cambios en los inputs
    const handleInputChange = (e, key1, key2, key3, key4, key5) => {
        const newBalanceData = { ...balanceData };
        newBalanceData[key1][key2][key3][key4][key5] = e.target.value !== "" ? e.target.value : null;
        console.log(newBalanceData)
        setBalanceData(newBalanceData);
    };

    return (
        <>
            <table className="text-left">
                <thead className="text-center">
                    <tr>
                        <th colSpan={6}>
                            {balanceData.name}
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={6}>
                            <input type="text" placeholder="Ingresar nombre de la empresa" className="text-center"></input>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={6}>
                            <input type="date" placeholder="Ingresar fecha"></input>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(balanceData).splice(3).map((key1, index1) => (
                        <React.Fragment key={index1}>
                            <tr>
                                <td colSpan={3}>
                                    {esBalanceGeneral ? (
                                        <strong>{key1}</strong>
                                    ) : (
                                        key1
                                    )}
                                </td>
                                <td></td>
                                <td>
                                    <button
                                        className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                        onClick={() => handleAddAccount(key1)}
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                            {balanceData[key1] && typeof balanceData[key1] === 'object' && Object.keys(balanceData[key1]).length > 0 ? (
                                Object.keys(balanceData[key1]).map((key2, index2) => (
                                    <React.Fragment key={index2}>
                                        <tr>
                                            <td colSpan={3} className="px-4">
                                                <strong>{key2}</strong>
                                            </td>
                                            <td></td>
                                            <td>
                                                <button
                                                    className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                    onClick={() => handleAddAccount(key1, key2)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                        </tr>
                                        {balanceData[key1][key2] && typeof balanceData[key1][key2] === 'object' && Object.keys(balanceData[key1][key2]).length > 0 ? (
                                            Object.keys(balanceData[key1][key2]).map((key3, index3) => (
                                                <React.Fragment key={index3}>
                                                    <tr>
                                                        <td colSpan={3} className="px-7">
                                                            {/* Aplica negrita solo si `key3` tiene subcuentas */}
                                                            {balanceData[key1][key2][key3] && typeof balanceData[key1][key2][key3] === 'object' && Object.keys(balanceData[key1][key2][key3]).length > 0 ? (
                                                                <strong>{key3}</strong>
                                                            ) : (
                                                                key3
                                                            )}
                                                        </td>
                                                        {balanceData[key1][key2][key3] && typeof balanceData[key1][key2][key3] === 'object' && Object.keys(balanceData[key1][key2][key3]).length > 0 ? (
                                                            // Si `key3` tiene subcuentas, no mostramos el input
                                                            <td></td>
                                                        ) : (
                                                            // Si `key3` no tiene subcuentas, mostramos el input
                                                            <input
                                                                type="number"
                                                                value={balanceData[key1][key2][key3]}
                                                                onChange={(e) => handleInputChange(e, key1, key2, key3)}
                                                                className="border border-black rounded px-2"
                                                            />
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
                                                    {balanceData[key1][key2][key3] && typeof balanceData[key1][key2][key3] === 'object' && Object.keys(balanceData[key1][key2][key3]).length > 0 ? (
                                                        Object.keys(balanceData[key1][key2][key3]).map((key4, index4) => (
                                                            <React.Fragment key={index4}>
                                                                <tr>
                                                                    <td colSpan={3} className="px-10">
                                                                        {key4}
                                                                    </td>
                                                                    {balanceData[key1][key2][key3][key4] &&typeof balanceData[key1][key2][key3][key4] === 'object' && Object.keys(balanceData[key1][key2][key3][key4]).length > 0 ? (
                                                                        // Si `key4` tiene subcuentas, no mostramos el input
                                                                        <td></td>
                                                                    ) : (
                                                                        // Si `key4` no tiene subcuentas, mostramos el input
                                                                        <input
                                                                            type="number"
                                                                            value={balanceData[key1][key2][key3][key4]}
                                                                            onChange={(e) => handleInputChange(e, key1, key2, key3, key4)}
                                                                            className="border border-black rounded px-2"
                                                                        />
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
                                                                {balanceData[key1][key2][key3][key4] && typeof balanceData[key1][key2][key3][key4] === 'object' && Object.keys(balanceData[key1][key2][key3][key4]).length > 0 ? (
                                                                    Object.keys(balanceData[key1][key2][key3][key4]).map((key5, index5) => (
                                                                        <React.Fragment key={index5}>
                                                                            <tr>
                                                                                <td colSpan={3} className="px-12">
                                                                                    {key5}
                                                                                </td>
                                                                                <input
                                                                                    type="number"
                                                                                    value={balanceData[key1][key2][key3][key4][key5]}
                                                                                    onChange={(e) => handleInputChange(e, key1, key2, key3, key4, key5)}
                                                                                    className="border border-black rounded px-2"
                                                                                />
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
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            {/* Mensaje opcional si `key3` no tiene cuentas */}
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                {/* Mensaje opcional si `key2` no tiene cuentas */}
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    {/* Mensaje opcional si `key1` no tiene cuentas */}
                                </tr>
                            )}
                        </React.Fragment>    
                    ))}
                </tbody>
            </table>
        </>
    );
};    

export default BalanceGeneral;