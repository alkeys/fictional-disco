import React, {useEffect, useState} from "react";
import {Screen2} from "../../component/HorizontalSelecion.jsx";
import {Dupont} from "./Dupont/Dupont.jsx";
import ButtonAtras from "../../component/ButtonAtras.jsx";
import DAnalisisVertical from "./Vertical/Dinamico/DAnalisisVertical.jsx";



export function AnalisisDinamico() {
    const [activeScreen, setActiveScreen] = useState('screen1');

    const changeScreen = (screen) => {
        setActiveScreen(screen);
    };



    return (
        <div className="bg-white min-h-screen">
            {/* Cabecera con botones para cambiar de pantalla */}
            <Header changeScreen={changeScreen} />

            {/* Renderizado condicional de las pantallas */}
            <div className="p-6 text-center bg-red-800 ">
                {activeScreen === 'screen1' && <Screen1 tipo={2} />}
                {activeScreen === 'screen2' && <Screen2 />}
                {activeScreen === 'screen3' && <Screen3 />}
            </div>
        </div>
    );
}


const Header = ({ changeScreen }) => {
    return (
        <div
            className="bg-red-600 text-white flex flex-col sm:flex-row justify-between items-center py-4 shadow-lg sticky top-0 z-10">
            <ButtonAtras/>
            <div className="lg:ml-20 text-center sm:text-left">
                <h1 className="font-bold text-lg">Análisis de Datos</h1>
                <p className="mt-2 text-sm">Energía pura para tu análisis financiero.</p>
            </div>
            <nav className="mt-4 lg:mr-20 sm:mt-0 flex flex-wrap justify-center sm:justify-end space-x-4">
                <button
                    onClick={() => changeScreen('screen1')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Análisis Vertical
                </button>
                <button
                    onClick={() => changeScreen('screen2')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Análisis Horizontal
                </button>
                <button
                    onClick={() => changeScreen('screen3')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Análisis de Dupont
                </button>
            </nav>
        </div>

    );
};
/**
 *
 * @param Tipo es si es estatico o dinamico
 * @returns {React.JSX.Element}
 * @constructor
 */
const Screen1 = () => (
    <DAnalisisVertical ></DAnalisisVertical>
);


const Screen3 = () => (
    <Dupont></Dupont>
);
