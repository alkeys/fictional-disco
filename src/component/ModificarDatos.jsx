import React, { useState, useEffect } from "react";
import { obtenerDocumentosall } from "../Services/Firebase/Crudfirebase";

const ModDatos = ({ estado }) => {
    const [documentos, setDocumentos] = useState([]);
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const nameCollection = import.meta.env.VITE_NOMBRE_COLECION;
        const obtenerDocumentos = async () => {
            const docs = await obtenerDocumentosall(nameCollection);
            setDocumentos(docs);
        }
        obtenerDocumentos();
    }, []);

    useEffect(() => {
        if (estado) {
            setDatos({ ...estado });
        }
    }, []);

    const manejarSeleccion = (id) => {
        const documentoSeleccionado = documentos.find((doc) => doc.id === id);
        if (documentoSeleccionado) {
            setDatos({ ...documentoSeleccionado }); // Actualiza datos con el documento seleccionado
            console.log(documentoSeleccionado);
        }
    };

    if (!datos || !documentos) {
        return <p>Cargando información...</p>;
    }

    // Valida si es un "Balance General" o "Estado de Resultados"
    const esBalanceGeneral = datos.name === "Balance General" ? true : false;

    return (
        <>
            {documentos.length > 0 ? (
                <div>
                    {documentos.map((doc) => (
                        <button
                            key={doc.id}
                            onClick={() => manejarSeleccion(doc.id)} // Agrega el manejador de clics
                            className="mx-2 bg-red-500 rounded p-2"
                        >
                            {doc.id}
                        </button>
                    ))}
                </div>
            ) : (
                <p>No hay documentos</p>
            )}
            <div className="text-left">
                <h3>Datos Seleccionados:</h3>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                        <td>&nbsp;</td>
                        </tr>
                        {Object.keys(datos).splice(4).map((key1, index1) => (
                            <React.Fragment key={index1}>
                                <tr>
                                    <td colSpan={3}>
                                        {esBalanceGeneral ? (
                                            <strong>{key1}</strong>
                                        ) : (
                                            key1
                                        )}
                                    </td>
                                    {datos[key1] && typeof datos[key1] === 'object' && Object.keys(datos[key1]).length > 0 ? (
                                        // Si `key1` tiene subcuentas, no mostramos el input
                                        <td>&nbsp;</td>
                                    ) : (
                                        // Si `key1` no tiene subcuentas, mostramos el input
                                        <td>
                                            <input
                                                type="number"
                                                value={datos[key1]}
                                                //onChange={(e) => handleInputChange(e, key1)}
                                                className="border border-black rounded px-2 w-16 md:w-56"
                                            />
                                        </td>
                                    )}
                                    {esBalanceGeneral ? (
                                        <td>
                                            <button
                                                className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                //onClick={() => handleAddAccount(key1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                    ) : (
                                        <td>&nbsp;</td>
                                    )}
                                </tr>
                                {datos[key1] && typeof datos[key1] === 'object' && Object.keys(datos[key1]).length > 0 ? (
                                    Object.keys(datos[key1]).map((key2, index2) => (
                                        <React.Fragment key={index2}>
                                            <tr>
                                                <td colSpan={3} className="px-4">
                                                    <strong>{key2}</strong>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <button
                                                        className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                        //onClick={() => handleAddAccount(key1, key2)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
                                            {datos[key1][key2] && typeof datos[key1][key2] === 'object' && Object.keys(datos[key1][key2]).length > 0 ? (
                                                Object.keys(datos[key1][key2]).map((key3, index3) => (
                                                    <React.Fragment key={index3}>
                                                        <tr>
                                                            <td colSpan={3} className="px-7">
                                                                {/* Aplica negrita solo si `key3` tiene subcuentas */}
                                                                {datos[key1][key2][key3] && typeof datos[key1][key2][key3] === 'object' && Object.keys(datos[key1][key2][key3]).length > 0 ? (
                                                                    <strong>{key3}</strong>
                                                                ) : (
                                                                    key3
                                                                )}
                                                            </td>
                                                            {datos[key1][key2][key3] && typeof datos[key1][key2][key3] === 'object' && Object.keys(datos[key1][key2][key3]).length > 0 ? (
                                                                // Si `key3` tiene subcuentas, no mostramos el input
                                                                <td>&nbsp;</td>
                                                            ) : (
                                                                // Si `key3` no tiene subcuentas, mostramos el input
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        value={datos[key1][key2][key3]}
                                                                        //onChange={(e) => handleInputChange(e, key1, key2, key3)}
                                                                        className="border border-black rounded px-2 w-16 md:w-56"
                                                                    />
                                                                </td>
                                                            )}
                                                            <td>
                                                                <button
                                                                    className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                    //onClick={() => handleAddAccount(key1, key2, key3)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                    //onClick={() => handleDeleteAccount(key1, key2, key3)}
                                                                >
                                                                    -
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {datos[key1][key2][key3] && typeof datos[key1][key2][key3] === 'object' && Object.keys(datos[key1][key2][key3]).length > 0 ? (
                                                            Object.keys(datos[key1][key2][key3]).map((key4, index4) => (
                                                                <React.Fragment key={index4}>
                                                                    <tr>
                                                                        <td colSpan={3} className="px-10">
                                                                            {key4}
                                                                        </td>
                                                                        {datos[key1][key2][key3][key4] &&typeof datos[key1][key2][key3][key4] === 'object' && Object.keys(datos[key1][key2][key3][key4]).length > 0 ? (
                                                                            // Si `key4` tiene subcuentas, no mostramos el input
                                                                            <td>&nbsp;</td>
                                                                        ) : (
                                                                            // Si `key4` no tiene subcuentas, mostramos el input
                                                                            <td>
                                                                                <input
                                                                                    type="number"
                                                                                    value={datos[key1][key2][key3][key4]}
                                                                                    //onChange={(e) => handleInputChange(e, key1, key2, key3, key4)}
                                                                                    className="border border-black rounded px-2 w-16 md:w-56"
                                                                                />
                                                                            </td>
                                                                        )}
                                                                        <td>
                                                                            <button
                                                                                className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                                //onClick={() => handleAddAccount(key1, key2, key3, key4)}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                                //onClick={() => handleDeleteAccount(key1, key2, key3, key4)}
                                                                            >
                                                                                -
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    {datos[key1][key2][key3][key4] && typeof datos[key1][key2][key3][key4] === 'object' && Object.keys(datos[key1][key2][key3][key4]).length > 0 ? (
                                                                        Object.keys(datos[key1][key2][key3][key4]).map((key5, index5) => (
                                                                            <React.Fragment key={index5}>
                                                                                <tr>
                                                                                    <td colSpan={3} className="px-12">
                                                                                        {key5}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="number"
                                                                                            value={datos[key1][key2][key3][key4][key5]}
                                                                                            //onChange={(e) => handleInputChange(e, key1, key2, key3, key4, key5)}
                                                                                            className="border border-black rounded px-2 w-16 md:w-56"
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                    <button
                                                                                        className="ml-2 p-1 bg-green-500 text-white rounded px-3"
                                                                                        //onClick={() => handleAddAccount(key1, key2, key3, key4, key5)}
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                    </td>
                                                                                    <td>
                                                                                        <button
                                                                                            className="ml-2 p-1 bg-red-500 text-white rounded px-3.5"
                                                                                            //onClick={() => handleDeleteAccount(key1, key2, key3, key4, key5)}
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
            </div>
        </>
    );
}

export default ModDatos;

