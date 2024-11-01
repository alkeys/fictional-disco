import React, {useState, useEffect} from "react";

const BalanceGeneral = ({estado}) => {
    const initialBalanceData = estado ? { ...estado } : null; // Estado inicial
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
        
        // Verificamos y creamos los niveles faltantes si no existen
        if (!newBalanceData[key1]) newBalanceData[key1] = {};
        if (key2 && !newBalanceData[key1][key2]) newBalanceData[key1][key2] = {};
        if (key3 && !newBalanceData[key1][key2][key3]) newBalanceData[key1][key2][key3] = {};
        if (key4 && !newBalanceData[key1][key2][key3][key4]) newBalanceData[key1][key2][key3][key4] = {};

        // Asignamos el valor solo en el nivel correcto (hasta key5)
        if (key5) {
            newBalanceData[key1][key2][key3][key4][key5] = e.target.value !== "" ? e.target.value : null;
        } else if (key4) {
            newBalanceData[key1][key2][key3][key4] = e.target.value !== "" ? e.target.value : null;
        } else if (key3) {
            newBalanceData[key1][key2][key3] = e.target.value !== "" ? e.target.value : null;
        } else if (key2) {
            newBalanceData[key1][key2] = e.target.value !== "" ? e.target.value : null;
        } else if (key1) {
            newBalanceData[key1] = e.target.value !== "" ? e.target.value : null;
        }

        setBalanceData(newBalanceData);
        console.log(newBalanceData);
    };

    const inputNameEmpresa = (e) => {
        const newBalanceData = { ...balanceData };
        newBalanceData.name_empresa = e.target.value;
        setBalanceData(newBalanceData);
        console.log(newBalanceData);
    }

    const inputDateEmpresa = (e) => {
        const newBalanceData = { ...balanceData };
        const dateParts = e.target.value.split("-");
        console.log(dateParts);

        if (dateParts.length === 3) {
            const [year, month, day] = dateParts;
    
            // Convertimos el mes numérico a texto
            const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            const monthText = monthNames[parseInt(month, 10) - 1];
    
            // Actualizamos el estado solo si la fecha es válida
            if (day && monthText && year) {
                newBalanceData.fecha = {
                    dia: parseInt(day, 10),
                    mes: monthText,
                    anio: parseInt(year, 10),
                };
            }
            setBalanceData(newBalanceData);
        }
        console.log(newBalanceData);
    };
    
    // Función para limpiar datos del balance eliminando valores null y cuentas vacías
    const cleanBalanceData = (data) => {
        const cleanData = {};
      
        Object.keys(data).forEach((key1) => {
          const value1 = data[key1];
      
          if (value1 && typeof value1 === 'object') {
            const cleanedValue1 = {};
      
            Object.keys(value1).forEach((key2) => {
              const value2 = value1[key2];
      
              if (value2 && typeof value2 === 'object') {
                const cleanedValue2 = {};
      
                Object.keys(value2).forEach((key3) => {
                  const value3 = value2[key3];
      
                  if (value3 && typeof value3 === 'object') {
                    const cleanedValue3 = {};
      
                    Object.keys(value3).forEach((key4) => {
                      const value4 = value3[key4];
      
                      if (value4 && typeof value4 === 'object') {
                        const cleanedValue4 = {};
      
                        Object.keys(value4).forEach((key5) => {
                          if (value4[key5] !== null && value4[key5] !== "null") {
                            cleanedValue4[key5] = value4[key5];
                          }
                        });
      
                        if (Object.keys(cleanedValue4).length > 0) {
                          cleanedValue3[key4] = cleanedValue4;
                        }
                      } else if (value4 !== null && value4 !== "null") {
                        cleanedValue3[key4] = value4;
                      }
                    });
      
                    if (Object.keys(cleanedValue3).length > 0) {
                      cleanedValue2[key3] = cleanedValue3;
                    }
                  } else if (value3 !== null && value3 !== "null") {
                    cleanedValue2[key3] = value3;
                  }
                });
      
                if (Object.keys(cleanedValue2).length > 0) {
                  cleanedValue1[key2] = cleanedValue2;
                }
              } else if (value2 !== null && value2 !== "null") {
                cleanedValue1[key2] = value2;
              }
            });
      
            // Si cleanedValue1 tiene contenido, se añade, o si no tiene, pero es de nivel key1, se mantiene en cleanData.
            cleanData[key1] = Object.keys(cleanedValue1).length > 0 ? cleanedValue1 : {};
          } else {
            cleanData[key1] = value1;
          }
        });
      
        return cleanData;
    };
      
    const handleSaveToFile = () => {
        const cleanedData = cleanBalanceData(balanceData);
        const blob = new Blob([JSON.stringify(cleanedData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "estados.json";
        a.click();
        setBalanceData(initialBalanceData);
    }

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
                            <input type="text"
                                placeholder="Ingresar nombre de la empresa"
                                className="text-center"
                                value={balanceData.name_empresa}
                                onChange={(e) => inputNameEmpresa(e)}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={6}>
                        <input
                            type="date"
                            className="text-center"
                            value={
                                balanceData.fecha.anio && balanceData.fecha.mes && balanceData.fecha.dia
                                    ? `${balanceData.fecha.anio}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(balanceData.fecha.dia).padStart(2, '0')}`   
                                    : ""
                            }
                            onChange={(e) => inputDateEmpresa(e)}
                        />

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>&nbsp;</td>
                    </tr>
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
                                {balanceData[key1] && typeof balanceData[key1] === 'object' && Object.keys(balanceData[key1]).length > 0 ? (
                                    // Si `key1` tiene subcuentas, no mostramos el input
                                    <td>&nbsp;</td>
                                ) : (
                                    // Si `key1` no tiene subcuentas, mostramos el input
                                    <td>
                                        <input
                                            type="number"
                                            value={balanceData[key1]}
                                            onChange={(e) => handleInputChange(e, key1)}
                                            className="border border-black rounded px-2 w-16 md:w-56"
                                        />
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
                            {balanceData[key1] && typeof balanceData[key1] === 'object' && Object.keys(balanceData[key1]).length > 0 ? (
                                Object.keys(balanceData[key1]).map((key2, index2) => (
                                    <React.Fragment key={index2}>
                                        <tr>
                                            <td colSpan={3} className="px-4">
                                                <strong>{key2}</strong>
                                            </td>
                                            <td>&nbsp;</td>
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
                                                            <td>&nbsp;</td>
                                                        ) : (
                                                            // Si `key3` no tiene subcuentas, mostramos el input
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    value={balanceData[key1][key2][key3]}
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
                                                    {balanceData[key1][key2][key3] && typeof balanceData[key1][key2][key3] === 'object' && Object.keys(balanceData[key1][key2][key3]).length > 0 ? (
                                                        Object.keys(balanceData[key1][key2][key3]).map((key4, index4) => (
                                                            <React.Fragment key={index4}>
                                                                <tr>
                                                                    <td colSpan={3} className="px-10">
                                                                        {key4}
                                                                    </td>
                                                                    {balanceData[key1][key2][key3][key4] &&typeof balanceData[key1][key2][key3][key4] === 'object' && Object.keys(balanceData[key1][key2][key3][key4]).length > 0 ? (
                                                                        // Si `key4` tiene subcuentas, no mostramos el input
                                                                        <td>&nbsp;</td>
                                                                    ) : (
                                                                        // Si `key4` no tiene subcuentas, mostramos el input
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                value={balanceData[key1][key2][key3][key4]}
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
                                                                {balanceData[key1][key2][key3][key4] && typeof balanceData[key1][key2][key3][key4] === 'object' && Object.keys(balanceData[key1][key2][key3][key4]).length > 0 ? (
                                                                    Object.keys(balanceData[key1][key2][key3][key4]).map((key5, index5) => (
                                                                        <React.Fragment key={index5}>
                                                                            <tr>
                                                                                <td colSpan={3} className="px-12">
                                                                                    {key5}
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={balanceData[key1][key2][key3][key4][key5]}
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
            <div className="text-center mt-4">
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={handleSaveToFile}
                >
                    Guardar
                </button>
            </div>
        </>
    );
};    

export default BalanceGeneral;