import React, { useState } from "react";
import {AnalisisHorizontalBalance} from "./Analisis/AnalisisHorizontalBalance.jsx";
import {Screen2} from "../component/HorizontalSelecion.jsx";

export function Analisis() {
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
                {activeScreen === 'screen1' && <Screen1 />}
                {activeScreen === 'screen2' && <Screen2 />}
                {activeScreen === 'screen3' && <Screen3 />}
            </div>
        </div>
    );
}

const Header = ({ changeScreen }) => {
    return (
        <div
            className="bg-red-600 text-white flex flex-col justify-center items-center py-4 shadow-lg sticky top-0 z-10">
            <h1 className="font-bold text-lg">Análisis de Datos</h1>
            <p className="mt-2 text-sm">Energía pura para tu análisis financiero.</p>
            <nav className="space-x-4">
                <button
                    onClick={() => changeScreen('screen1')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Analisis Vertical
                </button>
                <button
                    onClick={() => changeScreen('screen2')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Analisis Horizontal
                </button>
                <button
                    onClick={() => changeScreen('screen3')}
                    className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                >
                    Analisis de Dupont
                </button>
            </nav>
        </div>
    );
};

const Screen1 = () => (
    <div className="text-red-600 text-2xl font-bold">
        <h2>Analisis Vertical</h2>
        <p className="mt-4">Hola esta es una prueva xd</p>
    </div>
);



const Screen3 = () => (
    <div className="text-red-600 text-2xl font-bold">
        <h2>Pantalla 3</h2>
        <p className="mt-4">Contenido para la Pantalla 3</p>
    </div>
);
