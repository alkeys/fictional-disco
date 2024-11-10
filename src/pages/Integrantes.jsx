import React from "react";
import ButtonAtras from "../component/ButtonAtras";
import imageAviles from "../images/aviles.jpg";
import imageRonald from "../images/ronald.jpg";
import imageArmando from "../images/armando.jpeg";

export const Integrantes = () => {

    const integrantes = [{"nombre":"Ernesto Alexander Avilés Morán","carnet":"AM18007","imagen":imageAviles},
                            {"nombre":"Ronald Vladimir Castillo Murillo","carnet":"CM19086","imagen":imageRonald},
                            {"nombre":"José Armando Alarcón Martínez","carnet":"AM19133","imagen":imageArmando},];

    return (
        <div className="bg-red-700 pb-6 flex flex-col min-h-screen">
            <ButtonAtras/>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-white">
                    Integrantes grupo 4
                </h1>
                <div className="h-min-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white m-8 p-8 rounded-lg">
                    {
                        integrantes.map((integrante, index) => (
                            <div key={index} className="text-center rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-black to-gray-800 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center">
                                <img src={integrante.imagen} className='h-52 mb-1 rounded-lg'/>
                                <h3 className="font-bold text-lg">{integrante.carnet}</h3>
                                <h3 className="font-bold text-lg">{integrante.nombre}</h3>
                                <p className="mt-2 text-sm">Estudiante de Ingeniería de Sistemas Informáticos</p>
                            </div>
                        ))
                    }
                </div>
                
            </div>
        </div>
    );
};

export default Integrantes;
