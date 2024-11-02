import React, {useState, useEffect} from "react";
import { agregarDocumento} from "../Services/Firebase/Crudfirebase.js";  

const BalanceGeneral = ({estado, anio, document}) => {

    console.log(document);

    return (
        <>
            {document.id}
            {document.name}
            {document.fecha.dia}
        </>
    );
};

export default BalanceGeneral;