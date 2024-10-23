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
                newBalanceData[key1][key2][key3][key4][newAccountName] = 0;
            } else if (key3) {
                if (!newBalanceData[key1][key2][key3]) {
                    newBalanceData[key1][key2][key3] = {};
                }
                newBalanceData[key1][key2][key3][newAccountName] = 0;
            } else if (key2) {
                if (!newBalanceData[key1][key2]) {
                    newBalanceData[key1][key2] = {};
                }
                newBalanceData[key1][key2][newAccountName] = 0;
            } else if (key1) {
                if (!newBalanceData[key1]) {
                    newBalanceData[key1] = {};
                }
                newBalanceData[key1][newAccountName] = 0;
            }
        }

        setBalanceData(newBalanceData);
    };


    return (
        <>
            <table className="text-left">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            {balanceData.name}
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
                                                        <strong>{key3}</strong>
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
                                                                                <td colSpan={3} className="px-13">
                                                                                    {key5}
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
                                                                        {/* <td colSpan={3}>No hay cuentas disponibles en {key4}</td> */}
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            {/* <td colSpan={3}>No hay cuentas disponibles en {key3}</td> */}
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                {/* <td colSpan={3}>No hay cuentas disponibles en {key2}</td> */}
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    {/* <td colSpan={4}>No hay cuentas disponibles en {key1}</td> */}
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