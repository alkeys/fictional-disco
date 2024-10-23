import React, { useState, useEffect } from "react";

const BalanceGeneral = ({ estado }) => {
    const [balanceData, setBalanceData] = useState(null);

    // Efecto para cargar los datos cuando el prop `estado` esté disponible
    useEffect(() => {
        if (estado) {
            setBalanceData(estado); // Solo se actualiza si `estado` está definido
        }
    }, [estado]); // Se ejecuta cuando `estado` cambia

    // Verifica si balanceData y Activos existen antes de intentar acceder a ellos
    if (!balanceData || !balanceData.Activos) {
        return <p className="text-center">Cargando datos del balance...</p>;
    }

    // Función para manejar cambios en los inputs
    const handleInputChange = (e, key1, key2, key3) => {
        const newBalanceData = { ...balanceData };
        newBalanceData.Activos[key1][key2][key3] = e.target.value;
        setBalanceData(newBalanceData);
    };

    // Función para generar y descargar el archivo JSON
    const handleSaveToFile = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(balanceData, null, 2)
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
                                <td colSpan={2}><strong>{key1}</strong></td>
                            </tr>
                            {Object.keys(balanceData.Activos[key1]).map((key2, index2) => (
                                <React.Fragment key={index2}>
                                    <tr>
                                        <td colSpan={2}><strong>{key2}</strong></td>
                                    </tr>
                                    {Object.keys(balanceData.Activos[key1][key2]).map((key3, index3) => (
                                        <tr key={index3}>
                                            <td>{key3}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="border border-black"
                                                    value={balanceData.Activos[key1][key2][key3]}
                                                    onChange={(e) => handleInputChange(e, key1, key2, key3)}
                                                />
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

