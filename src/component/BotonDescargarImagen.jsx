// BotonDescargarImagen.jsx
import React from "react";
import html2canvas from "html2canvas";

const BotonDescargarImagen = ({ idElemento }) => {
  const descargarImagen = () => {
    const elemento = document.getElementById(idElemento);
    html2canvas(elemento).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "estado_dinamico.png";
      link.click();
    });
  };

  return (
    <button
      onClick={descargarImagen}
      className="rounded shadow-lg px-4 py-2 bg-gradient-to-r from-green-500 to-lime-400 hover:shadow-xl transition-transform transform hover:scale-105"
      >
        Descargar Imagen
    </button>
  );
};

export default BotonDescargarImagen;

