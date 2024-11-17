import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { obtenerDocumentosall } from "../Services/Firebase/Crudfirebase";
import ButtonAtras from "../component/ButtonAtras";
import Estado from "../component/EstadoDinamico";
import BotonDescargarImagen from "../component/BotonDescargarImagen";
import BotonDescargarPDF from "../component/BotonDescargarPDF";

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
                            <option value="" disabled>Seleccionar</option>
                            {documentos && documentos.map((doc, index) => (
                                <option key={index} value={doc.id}>{doc.id}</option>
                            ))}
                        </select>
                    </section>
                ) : (
                    <p className="mt-3">&nbsp;</p>
                )}
            </div>
            {seleccionAnio && (
                <div className="flex justify-center mt-2 mb-4">
                    <section className="mx-3">
                        <BotonDescargarImagen idElemento="tablaEstadoDinamico" />
                    </section>
                    <section className="mx-3">
                        <BotonDescargarPDF idElemento="tablaEstadoDinamico" />
                    </section>
                </div>
            )}
            <div className="flex justify-center">
                <div id="tablaEstadoDinamico" className="w-full py-4 px-10 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                    <React.Fragment>
                        {data && (
                            <Estado
                                estado={data || null}
                            />
                        )}
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

