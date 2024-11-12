import React, {useState, useEffect} from "react";
import { agregarDocumento} from "../Services/Firebase/Crudfirebase.js";  

const BalanceGeneral = ({estado}) => {
    const initialBalanceData = estado ? { ...estado } : null; // Estado inicial
    const [balanceData, setBalanceData] = useState(initialBalanceData);
    const [totales, setTotales] = useState({ totalActivosCorrientes: 0, totalActivosNoCorrientes: 0, totalPasivosCorrientes: 0, totalPasivosNoCorrientes: 0, totalPasivos: 0, totalPatrimonio: 0 });

    useEffect(() => {
        if (estado) {
            setBalanceData({...estado}); // Cargar el balance inicial cuando estado esté disponible
        }
    }, [estado]);

    useEffect(() => {
        if (balanceData && esBalanceGeneral) {
            const nuevosTotales = calcularTotales(balanceData);
            setTotales(nuevosTotales);
        }
    }, [balanceData]);

    if (!balanceData) {
        return <p className="text-center">Cargando datos del balance...</p>;
    }

    // Valida si es un "Balance General" o "Estado de Resultados"
    const esBalanceGeneral = estado.name === "Balance General" ? true : false;

    // Eliminar cuenta específica
    const handleDeleteAccount = (key1, key2, key3, key4, key5) => {
        const newBalanceData = { ...balanceData };
        const borrar = prompt("¿Está seguro de eliminar la cuenta? (S/N)");

        // Verifica qué nivel de cuenta está siendo eliminado y ajusta
        if (key5) {
            if (borrar === "S" || borrar === "s") {
                delete newBalanceData[key1][key2][key3][key4][key5];
            }
        } else if (key4) {
            if (borrar === "S" || borrar === "s") {
                delete newBalanceData[key1][key2][key3][key4];
            }
        } else if (key3) {
            if (key3 === "Total activos corrientes" || key3 === "Total activos no corrientes" || key3 === "Total pasivos corrientes" || key3 === "Total pasivos no corrientes" || key3 === "Total capital") {
                alert("No se puede eliminar el total de cuentas");
            } else {
                if (borrar === "S" || borrar === "s") {
                    delete newBalanceData[key1][key2][key3];
                }
            }
        } else if (key2) {
            if (borrar === "S" || borrar === "s") {
                delete newBalanceData[key1][key2];
            }
        } else if (key1) {
            if (borrar === "S" || borrar === "s") {
                delete newBalanceData[key1];
            }
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
    const handleInputChange = (e, ...keys) => {
        const value = e.target.value;
    
        setBalanceData(prevData => {
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

    // Calcular totales activos, pasivos y patrimonio
    const calcularTotales = (data) => {
        let totalActivosCorrientes = 0;
        let totalActivosNoCorrientes = 0;
        let totalPasivosCorrientes = 0;
        let totalPasivosNoCorrientes = 0;
        let totalPasivos = 0;
        let totalPatrimonio = 0;
        let totalAxu = 0;

        Object.keys(data).splice(3).forEach((key1) => {
            if (key1 === "Activos") {
                Object.keys(data[key1]).forEach((key2) => {
                    if (key2 === "Activos Corrientes") {
                        Object.keys(data[key1][key2]).forEach((key3) => {
                            if (data[key1][key2][key3] && typeof data[key1][key2][key3] === 'object' && Object.keys(data[key1][key2][key3]).length > 0) {
                                Object.keys(data[key1][key2][key3]).forEach((key4) => {
                                    if (data[key1][key2][key3][key4] && typeof data[key1][key2][key3][key4] === 'object' && Object.keys(data[key1][key2][key3][key4]).length > 0) {
                                        Object.keys(data[key1][key2][key3][key4]).forEach((key5) => {
                                            const valor = Number(data[key1][key2][key3][key4][key5]);
                                            if (!isNaN(valor) && key5 !== "Total activos corrientes") {
                                                totalActivosCorrientes += valor;
                                            }
                                        });
                                    } else {
                                        const valor = Number(data[key1][key2][key3][key4]);
                                        if (!isNaN(valor) && key4 !== "Total activos corrientes") {
                                            totalActivosCorrientes += valor;
                                        }
                                    }
                                });
                            } else {
                                const valor = Number(data[key1][key2][key3]);
                                if (!isNaN(valor) && key3 !== "Total activos corrientes") {
                                    totalActivosCorrientes += valor;
                                }
                            }
                        });
                    } else if (key2 === "Activos No Corrientes") {
                        Object.keys(data[key1][key2]).forEach((key3) => {
                            if (data[key1][key2][key3] && typeof data[key1][key2][key3] === 'object' && Object.keys(data[key1][key2][key3]).length > 0) {
                                Object.keys(data[key1][key2][key3]).forEach((key4) => {
                                    if (data[key1][key2][key3][key4] && typeof data[key1][key2][key3][key4] === 'object' && Object.keys(data[key1][key2][key3][key4]).length > 0) {
                                        Object.keys(data[key1][key2][key3][key4]).forEach((key5) => {
                                            const valor = Number(data[key1][key2][key3][key4][key5]);
                                            if (!isNaN(valor) && key5 !== "Total activos no corrientes") {
                                                totalActivosNoCorrientes += valor;
                                            }
                                        });
                                    } else {
                                        const valor = Number(data[key1][key2][key3][key4]);
                                        if (!isNaN(valor) && key4 !== "Total activos no corrientes") {
                                            totalActivosNoCorrientes += valor;
                                        }
                                    }
                                });
                            } else {
                                const valor = Number(data[key1][key2][key3]);
                                if (!isNaN(valor) && key3 !== "Total activos no corrientes") {
                                    totalActivosNoCorrientes += valor;
                                }
                            }
                        });
                    }
                });
            } else if (key1 === "Pasivo y Capital") {
                Object.keys(data[key1]).forEach((key2) => {
                    if (key2 === "Pasivos Corrientes") {
                        Object.keys(data[key1][key2]).forEach((key3) => {
                            if (data[key1][key2][key3] && typeof data[key1][key2][key3] === 'object' && Object.keys(data[key1][key2][key3]).length > 0) {
                                Object.keys(data[key1][key2][key3]).forEach((key4) => {
                                    if (data[key1][key2][key3][key4] && typeof data[key1][key2][key3][key4] === 'object' && Object.keys(data[key1][key2][key3][key4]).length > 0) {
                                        Object.keys(data[key1][key2][key3][key4]).forEach((key5) => {
                                            const valor = Number(data[key1][key2][key3][key4][key5]);
                                            if (!isNaN(valor) && key5 !== "Total pasivos corrientes") {
                                                totalPasivosCorrientes += valor;
                                            }
                                        });
                                    } else {
                                        const valor = Number(data[key1][key2][key3][key4]);
                                        if (!isNaN(valor) && key4 !== "Total pasivos corrientes") {
                                            totalPasivosCorrientes += valor;
                                        }
                                    }
                                });
                            }
                        });
                    } else if (key2 === "Pasivos No Corrientes") {
                        Object.keys(data[key1][key2]).forEach((key3) => {
                            if (data[key1][key2][key3] && typeof data[key1][key2][key3] === 'object' && Object.keys(data[key1][key2][key3]).length > 0) {
                                Object.keys(data[key1][key2][key3]).forEach((key4) => {
                                    if (data[key1][key2][key3][key4] && typeof data[key1][key2][key3][key4] === 'object' && Object.keys(data[key1][key2][key3][key4]).length > 0) {
                                        Object.keys(data[key1][key2][key3][key4]).forEach((key5) => {
                                            const valor = Number(data[key1][key2][key3][key4][key5]);
                                            if (!isNaN(valor) && key5 !== "Total pasivos no corrientes") {
                                                totalPasivosNoCorrientes += valor;
                                            }
                                        });
                                    } else {
                                        const valor = Number(data[key1][key2][key3][key4]);
                                        if (!isNaN(valor) && key4 !== "Total pasivos no corrientes") {
                                            totalPasivosNoCorrientes += valor;
                                        }
                                    }
                                });
                            } else {
                                const valor = Number(data[key1][key2][key3]);
                                if (!isNaN(valor) && key3 !== "Total pasivos no corrientes") {
                                    totalPasivosNoCorrientes += valor;
                                }
                            }
                        });
                    } else if (key2 === "Capital") {
                        Object.keys(data[key1][key2]).forEach((key3) => {
                            if (data[key1][key2][key3] && typeof data[key1][key2][key3] === 'object' && Object.keys(data[key1][key2][key3]).length > 0) {
                                Object.keys(data[key1][key2][key3]).forEach((key4) => {
                                    if (data[key1][key2][key3][key4] && typeof data[key1][key2][key3][key4] === 'object' && Object.keys(data[key1][key2][key3][key4]).length > 0) {
                                        Object.keys(data[key1][key2][key3][key4]).forEach((key5) => {
                                            const valor = Number(data[key1][key2][key3][key4][key5]);
                                            if (!isNaN(valor) && key5 !== "Total capital") {
                                                totalPatrimonio += valor;
                                            }
                                        });
                                    } else {
                                        const valor = Number(data[key1][key2][key3][key4]);
                                        if (!isNaN(valor) && key4 !== "Total capital") {
                                            totalPatrimonio += valor;
                                        }
                                    }
                                });
                            } else {
                                const valor = Number(data[key1][key2][key3]);
                                if (!isNaN(valor) && key3 !== "Total capital") {
                                    totalPatrimonio += valor;
                                }
                            }
                        });
                    }
                });
            }
        });

        data.Activos["Activos Corrientes"]["Total activos corrientes"] = totalActivosCorrientes;
        data.Activos["Activos No Corrientes"]["Total activos no corrientes"] = totalActivosNoCorrientes;
        data.Activos["Total Activos"] = totalActivosCorrientes + totalActivosNoCorrientes;
        data["Pasivo y Capital"]["Pasivos Corrientes"]["Total pasivos corrientes"] = totalPasivosCorrientes;
        data["Pasivo y Capital"]["Pasivos No Corrientes"]["Total pasivos no corrientes"] = totalPasivosNoCorrientes;
        data["Pasivo y Capital"]["Total Pasivos"] = totalPasivosCorrientes + totalPasivosNoCorrientes;
        data["Pasivo y Capital"]["Total Capital"] = totalPatrimonio + totalAxu;
        data["Pasivo y Capital"]["Total Pasivos y Capital"] = totalPasivosCorrientes + totalPasivosNoCorrientes + totalPatrimonio;

        return { totalActivosCorrientes, totalActivosNoCorrientes, totalPasivosCorrientes, totalPasivosNoCorrientes, totalPasivos, totalPatrimonio };
    };


    const inputNameEmpresa = (e) => {
        const newBalanceData = { ...balanceData };
        newBalanceData.name_empresa = e.target.value;
        setBalanceData(newBalanceData);
        //console.log(newBalanceData);
    };

    const inputDateEmpresa = (e) => {
        const newBalanceData = { ...balanceData };
        const dateParts = e.target.value.split("-");
        console.log(e.target.value);

        if (dateParts.length === 3) {
            const [year, month, day] = dateParts;
    
            // Convertimos el mes numérico a texto
            const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            const monthText = monthNames[parseInt(month, 10) - 1];
    
            // Actualizamos el estado solo si la fecha es válida
            if (day && monthText && year) {
                newBalanceData.fecha = {
                    dia: parseInt(day, 10),
                    mes: parseInt(month, 10),
                    anio: parseInt(year, 10),
                };
                setBalanceData(newBalanceData);
            }
        }
        //console.log(newBalanceData);
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
    
    //Guardar JSON y descargarlo
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

    //Guardar en Firebase
    const handleAgregar = async () => {
        const dataCleaned = cleanBalanceData(balanceData);
        let nameCollection;
        if(esBalanceGeneral) {
            nameCollection = import.meta.env.VITE_NOMBRE_COLECION;
        } else {
            nameCollection = import.meta.env.VITE_NOMBRE_COLECION_ESTADOS;
        }
        await agregarDocumento(nameCollection, balanceData.fecha.anio.toString(), dataCleaned);
        setBalanceData(initialBalanceData);
        alert("Datos guardados correctamente");
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
                                value={balanceData.name_empresa || ""}
                                onChange={(e) => inputNameEmpresa(e)}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={6}>
                        <input
                            type="date"
                            className="text-center"
                            value={balanceData.fecha.anio !== "0000" && balanceData.fecha.mes !== "00" && balanceData.fecha.dia !== "00"
                                ? `${String(balanceData.fecha.anio)}-${String(balanceData.fecha.mes).padStart(2, '0')}-${String(balanceData.fecha.dia).padStart(2, '0')}`
                                : ""}
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
                                            {key2 === "Total Activos" || key2 === "Total Pasivos" || key2 === "Total Capital" || key2 === "Total Pasivos y Capital" ? (
                                                <td>{balanceData[key1][key2]}</td>
                                            ) : (
                                                <td>&nbsp;</td>
                                            )}
                                            {key2 === "Total Activos" || key2 === "Total Pasivos" || key2 === "Total Capital" || key2 === "Total Pasivos y Capital" ? (
                                                <td>&nbsp;</td>
                                            ) : (
                                                balanceData[key1][key2] && typeof balanceData[key1][key2] === 'object' && Object.keys(balanceData[key1][key2]).length > 0 ? (
                                                    // Si `key2` tiene subcuentas, no mostramos el input
                                                    <td>&nbsp;</td>
                                                ) : (
                                                    // Si `key2` no tiene subcuentas, mostramos el input
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={balanceData[key1][key2]}
                                                            onChange={(e) => handleInputChange(e, key1, key2)}
                                                            className="border border-black rounded px-2 w-16 md:w-56"
                                                        />
                                                    </td>
                                                )
                                            )}
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
                    onClick={handleAgregar}
                >
                    Guardar
                </button>
            </div>
        </>
    );
};    

export default BalanceGeneral;