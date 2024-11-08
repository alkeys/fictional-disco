import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { obtenerDocumentosall } from "../Services/Firebase/Crudfirebase";
import ButtonAtras from "../component/ButtonAtras";
import Estado from "../component/EstadoDinamico";

export const EstadosDinamicos = () => {
    const location = useLocation();
    const { typeEstado } = location.state || {};

    if (!typeEstado) {
        console.warn("typeEstado no está definido");
    }

    const [data, setData] = useState();
    const [documentos, setDocumentos] = useState([]);
    const [seleccionAnio, setSeleccionAnio] = useState();

    useEffect(() => {
        const obtenerDocumentos = async () => {
            const nameCollection = typeEstado === "Balance General"
                ? import.meta.env.VITE_NOMBRE_COLECION
                : import.meta.env.VITE_NOMBRE_COLECION_ESTADOS;
            const docs = await obtenerDocumentosall(nameCollection);
            setDocumentos(docs || []);
        };

        if (typeEstado) {
            obtenerDocumentos();
        }
    }, [typeEstado]);

    useEffect(() => {
        if (seleccionAnio) {
            const documentoSeleccionado = documentos.find(doc => doc.id === seleccionAnio);
            setData(documentoSeleccionado);
        }
    }, [seleccionAnio]);

    const handleAnio = (event) => {
        setSeleccionAnio(event.target.value);
    };

    return (
        <div className="bg-red-700 pb-6 flex flex-col min-h-screen">
            <ButtonAtras />
            <div className="flex flex-col text-center px-10 py-4 bg-red-700">
                <h1 className="text-5xl font-bold mb-6 text-white">{typeEstado}</h1>
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
                {data && (
                    <Estado
                        estado={data || null}
                    />
                )}
            </div>
        </div>
    );
}

