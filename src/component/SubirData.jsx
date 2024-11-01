import { agregarDocumento ,eliminarDocumento,actualizarDocumento} from "../Services/Firebase/Crudfirebase.js";
import { useState } from "react";
import "./Styles/Boton.css";
import json19 from "../Data/Balances/2019.json";
import json20 from "../Data/Balances/2020.json";
import json21 from "../Data/Balances/2021.json";
import json22 from "../Data/Balances/2022.json";
import json23 from "../Data/Balances/2023.json";


export const SubirData = () => {
    const Nombre = import.meta.env.VITE_NOMBRE_COLECION;
    const [Balance, setBalance] = useState(json20);

    const handleAgregar = async () => {
        await agregarDocumento(Nombre, "b1", Balance);
    }
    const handleModificar = async () => {
        await actualizarDocumento(Nombre, "b1", Balance);
    }
    return (
        <div>
            <button onClick={handleModificar}>
                <div>
    <span>
      <p>Subir</p><p>:)</p>
    </span>
                </div>
                <div>
    <span>
      <p>Subir</p><p>!!</p>
    </span>
                </div>
            </button>
        </div>
    )
}
