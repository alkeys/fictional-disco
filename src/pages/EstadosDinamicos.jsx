import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import catalogo_cuentas from "../Data/catalogo_coca-cola.json";
import { obtenerDocumentosall } from "../Services/Firebase/Crudfirebase";
import ButtonAtras from "../component/ButtonAtras";

export const EstadosDinamicos = () => {
    const location = useLocation();
    const { typeEstado } = location.state || {};

    if (!typeEstado) {
        console.warn("typeEstado no está definido");
    }

    const [data, setData] = useState([]);
    const [seleccionCatalogo, setSeleccionCatalogo] = useState();
    const [documentos, setDocumentos] = useState([]);
    const [seleccionAnio, setSeleccionAnio] = useState();
    const [documento, setDocumento] = useState();
    const [esBalanceGeneral, setEsBalanceGeneral] = useState(false); // Estado para determinar si es Balance General

    // Cargar el catálogo al iniciar
    useEffect(() => {
        const catalogoArray = [
            catalogo_cuentas.balance || { name: "Balance General" },
            catalogo_cuentas.resultados || { name: "Resultados" }
        ];
        setData(catalogoArray);
    }, []);

    // Obtener documentos de Firebase solo si hay una selección válida
    useEffect(() => {
        if (seleccionCatalogo) { // Asegurarse de que se haya seleccionado algo
            const nameCollection = esBalanceGeneral 
                ? import.meta.env.VITE_NOMBRE_COLECION 
                : import.meta.env.VITE_NOMBRE_COLECION_ESTADOS;

            if (!nameCollection) {
                console.error("El nombre de la colección es vacío.");
                return;
            }   

            const obtenerDocumentos = async () => {
                try {
                    const docs = await obtenerDocumentosall(nameCollection);
                    setDocumentos(docs || []); // Asegúrate de que sea un array
                } catch (error) {
                    console.error("Error al obtener los documentos:", error);
                }
            };
            obtenerDocumentos();
        }
    }, [esBalanceGeneral, seleccionCatalogo]);

    // Actualizar `documento` cuando cambie `seleccionAnio`
    useEffect(() => {
        if (seleccionAnio) {
            const documentoSeleccionado = documentos.find(doc => doc.id === seleccionAnio);
            setDocumento(documentoSeleccionado);
        }
    }, [seleccionAnio, documentos]);

    // Comprobar si el catálogo seleccionado es "Balance General"
    useEffect(() => {
        if (seleccionCatalogo) {
            const isBalanceGeneral = seleccionCatalogo === "Balance General"; // Cambiado para una comparación directa
            setEsBalanceGeneral(isBalanceGeneral);
        } else {
            setEsBalanceGeneral(false); // Si no hay selección, asegúrate de que es false
        }
        setSeleccionAnio(""); // Reiniciar la selección de año
        setDocumento(null); // Reiniciar el documento
    }, [seleccionCatalogo]);

    const handleSeleccion = (event) => {
        setSeleccionCatalogo(event.target.value);
    };

    const handleAnio = (event) => {
        setSeleccionAnio(event.target.value);
    };

    // Nueva función para obtener documentos
    const obtenerDocumentos = async () => {
        const nameCollection = esBalanceGeneral 
            ? import.meta.env.VITE_NOMBRE_COLECION 
            : import.meta.env.VITE_NOMBRE_COLECION_ESTADOS;
        const docs = await obtenerDocumentosall(nameCollection);
        setDocumentos(docs || []);
    };

    return (
        <div className="bg-red-700 pb-6 flex flex-col min-h-screen">
            <ButtonAtras />
            <div className="flex flex-col text-center px-10 py-4 bg-red-700">
                <h1 className="text-5xl font-bold mb-6 text-white">{typeEstado}</h1>
                <section className="flex items-center justify-center">
                    <label htmlFor="select_estado" className="px-2 text-white">Seleccione Estado:</label>
                    <select id="select_estado" className="border rounded w-36" value={seleccionCatalogo || ""} onChange={handleSeleccion}>
                        <option value="" disabled>Seleccionar</option>
                        {data && data.map((estado, index) => (
                            <option key={index} value={estado.name}>{estado.name}</option>
                        ))}
                    </select>
                </section>
                {documentos.length ? (
                    <section className="flex items-center justify-center mt-3">
                        <label htmlFor="select_anio" className="px-2 text-white">Seleccione Año:</label>
                        <select id="select_anio" className="border rounded w-36 ml-5" value={seleccionAnio || ""} onChange={handleAnio}>
                            <option value="">Seleccionar</option>
                            {documentos && documentos.map((doc, index) => (
                                <option key={index} value={doc.id}>{doc.id}</option>
                            ))}
                        </select>
                    </section>
                ) : (
                    <p className="mt-3">&nbsp;</p>
                )}
            </div>
            <div className="flex flex-col text-center py-6 mx-3 px-3 md:mx-10 md:px-10 border rounded-lg bg-white">
                {seleccionCatalogo && documento && (
                    <BalanceGeneral
                        estado={data.find(item => item.name === seleccionCatalogo)}
                        anio={seleccionAnio}
                        documento={documento}
                        onAgregar={obtenerDocumentos} // Pasa el callback
                    />
                )}
            </div>
        </div>
    );
}

