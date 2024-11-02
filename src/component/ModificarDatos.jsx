import React, {useState, useEffect} from "react";
import { actualizarDocumento } from "../Services/Firebase/Crudfirebase";

const BalanceGeneral = ({estado, anio, documento}) => {
    const initialDocumento = documento ? { ...documento } : null; // Estado inicial
    const [document, setDocument] = useState(initialDocumento);

    useEffect(() => {
        if (documento) {
            setDocument({...documento}); // Cargar el balance inicial cuando estado esté disponible
        }
    }, [documento]);

    if (!document) {
        return <p className="text-center">Cargando datos del balance...</p>;
    }

    const handleDeleteAccount = (key1, key2, key3, key4, key5) => {
        const newBalanceData = { ...document };
    
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
    
        setDocument(newBalanceData);
    };

    const handleAddAccount = (key1, key2, key3, key4) => {
        const newBalanceData = { ...document };
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

        setDocument(newBalanceData);
    };

    const handleInputChange = (e, ...keys) => {
        const value = e.target.value;
    
        setDocument(prevData => {
            // Crear una copia profunda de prevData
            const newData = JSON.parse(JSON.stringify(prevData));
            let temp = newData;
    
            // Navegar hasta el nivel adecuado usando las claves
            for (let i = 0; i < keys.length - 1; i++) {
                temp = temp[keys[i]];
            }
    
            // Asignar el nuevo valor en la última clave
            temp[keys[keys.length - 1]] = value;
    
            return newData;
        });
    };

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

    const handleAgregar = async () => {
        const dataCleaned = cleanBalanceData(document);
        let nameCollection;
        if(esBalanceGeneral) {
            nameCollection = import.meta.env.VITE_NOMBRE_COLECION;
        } else {
            nameCollection = import.meta.env.VITE_NOMBRE_COLECION_ESTADOS;
        }
        await actualizarDocumento(nameCollection, anio.toString(), dataCleaned);
        alert("Datos actualizados correctamente");
    }

    const esBalanceGeneral = estado.name === "Balance General" ? true : false;

    return (
        <>
            
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
                                {esBalanceGeneral && key1 ==! "fecha" ? (
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
                                            {key2 === "dia" || key2 === "mes" || key2 === "anio" ? (
                                                <td>
                                                    &nbsp;
                                                </td>
                                            ) : (
                                                <td>
                                                    <button
                                                        className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                        onClick={() => handleAddAccount(key1, key2)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            )}
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
                <div className="text-center mt-4">
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={handleAgregar}
                >
                    Guardar
                </button>
            </div>
            
        </>
    );
};

export default BalanceGeneral;