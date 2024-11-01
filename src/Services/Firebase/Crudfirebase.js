import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseConfig } from "./FirebaseService.js";


export const agregarDocumento = async (nombreColeccion, id, datos) => {
    const { db } = FirebaseConfig();
    try {
        const docRef = doc(db, nombreColeccion, id); // Define la referencia del documento con el ID específico
        await setDoc(docRef, datos); // Utiliza setDoc para crear el documento con el ID dado
        console.log("Documento agregado con ID: ", id);
    } catch (error) {
        console.error("Error al agregar el documento: ", error);
    }
};


export const actualizarDocumento = async (nombreColeccion, id, datos) => {
    const { db } = FirebaseConfig();
    try {
        await setDoc(doc(db, nombreColeccion, id), datos);
        console.log("Documento actualizado con ID: ", id);
    } catch (error) {
        console.error("Error al actualizar el documento: ", error);
    }
}

export const eliminarDocumento = async (nombreColeccion, id) => {
    const { db } = FirebaseConfig();
    try {
        await deleteDoc(doc(db, nombreColeccion, id));
        console.log("Documento eliminado con ID: ", id);
    } catch (error) {
        console.error("Error al eliminar el documento: ", error);
    }
}
