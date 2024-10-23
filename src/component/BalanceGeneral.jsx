import React, { useState, useEffect } from "react";

const BalanceGeneral = ({ estado }) => {
    const [balanceData, setBalanceData] = useState(null);

    useEffect(() => {
        if (estado) {
            setBalanceData(estado); // Cargar el balance inicial cuando `estado` esté disponible
        }
    }, [estado]);

    // Verifica si balanceData y Activos existen antes de intentar acceder a ellos
    if (!balanceData || !balanceData.Activos) {
        return <p className="text-center">Cargando datos del balance...</p>;
    }

    // Función para manejar cambios en los inputs
    const handleInputChange = (e, key1, key2, key3) => {
        const newBalanceData = { ...balanceData };
        newBalanceData.Activos[key1][key2][key3] = e.target.value !== "" ? e.target.value : null;
        setBalanceData(newBalanceData);
    };

    // Eliminar cuenta específica
    const handleDeleteAccount = (key1, key2, key3) => {
        const newBalanceData = { ...balanceData };
        delete newBalanceData.Activos[key1][key2][key3];
        setBalanceData(newBalanceData);
    };

    // Agregar nueva cuenta con valor inicial
    const handleAddAccount = (key1, key2) => {
        const newBalanceData = { ...balanceData };
        const newAccountName = prompt("Ingrese el nombre de la nueva cuenta:");
        if (newAccountName) {
            newBalanceData.Activos[key1][key2][newAccountName] = 0; // Inicializa con valor 0
            setBalanceData(newBalanceData);
        }
    };

    // Función para limpiar el balanceData eliminando valores null y cuentas vacías
    const cleanBalanceData = (data) => {
        const cleanedData = JSON.parse(JSON.stringify(data)); // Clonamos los datos

        // Recorrer los niveles de Activos
        Object.keys(cleanedData.Activos).forEach((key1) => {
            Object.keys(cleanedData.Activos[key1]).forEach((key2) => {
                // Filtrar subcuentas que tienen valores diferentes de null
                const filteredSubAccounts = Object.keys(cleanedData.Activos[key1][key2]).filter(
                    (key3) => cleanedData.Activos[key1][key2][key3] !== null
                );

                // Si no quedan subcuentas con valores válidos, eliminar la cuenta
                if (filteredSubAccounts.length === 0) {
                    delete cleanedData.Activos[key1][key2];
                } else {
                    // Si quedan subcuentas válidas, reconstruir la cuenta solo con subcuentas válidas
                    const newSubAccounts = {};
                    filteredSubAccounts.forEach((key3) => {
                        newSubAccounts[key3] = cleanedData.Activos[key1][key2][key3];
                    });
                    cleanedData.Activos[key1][key2] = newSubAccounts;
                }
            });

            // Si no quedan subcuentas en una cuenta (ej. "Activo Corriente"), eliminar la cuenta
            if (Object.keys(cleanedData.Activos[key1]).length === 0) {
                delete cleanedData.Activos[key1];
            }
        });

        return cleanedData;
    };

    // Función para generar y descargar el archivo JSON, excluyendo campos con `null` y cuentas vacías
    const handleSaveToFile = () => {
        const cleanedBalanceData = cleanBalanceData(balanceData); // Limpiar el balance
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(cleanedBalanceData, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "balance_general.json"; // Nombre del archivo
        link.click();
    };

    return (
        <>
            <table className="text-left">
                <thead></thead>
                <tbody>
                    {Object.keys(balanceData.Activos).map((key1, index1) => (
                        <React.Fragment key={index1}>
                            <tr>
                                <td colSpan={3}>
                                    <strong>{key1}</strong>
                                </td>
                            </tr>
                            {Object.keys(balanceData.Activos[key1]).map((key2, index2) => (
                                <React.Fragment key={index2}>
                                    <tr>
                                        <td colSpan={3}>
                                            <strong>{key2}</strong>
                                        </td>
                                        <td>
                                            <button
                                                className="ml-2 p-1 bg-green-500 text-white rounded"
                                                onClick={() => handleAddAccount(key1, key2)}
                                            >
                                                Agregar Cuenta
                                            </button>
                                        </td>
                                    </tr>
                                    {Object.keys(balanceData.Activos[key1][key2]).map((key3, index3) => (
                                        <tr key={index3}>
                                            <td>{key3}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="border border-black"
                                                    value={
                                                        balanceData.Activos[key1][key2][key3] !== null
                                                            ? balanceData.Activos[key1][key2][key3]
                                                            : ""
                                                    }
                                                    onChange={(e) => handleInputChange(e, key1, key2, key3)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="ml-2 p-1 bg-red-500 text-white rounded"
                                                    onClick={() => handleDeleteAccount(key1, key2, key3)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleSaveToFile}
            >
                Guardar Balance como JSON
            </button>
        </>
    );
};

export default BalanceGeneral;



