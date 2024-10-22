import React, { useEffect } from 'react';

const Header = ({ selectedYear, onYearChange }) => {
    const years = [2019, 2020, 2021, 2022, 2023];


    // Función para manejar el cambio de año
    const handleYearChange = (year) => {
        localStorage.setItem('selectedYear', year); // Guardar en localStorage
        console.log("sdagsgsg")
    };

    return (
        <div className="bg-red-600 p-4">
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cursive' }}>
                Análisis Financiero
            </h1>
            <div className="flex justify-center space-x-4">
                {years.map(year => (
                    <button
                        key={year}
                        className={`px-4 py-2 rounded ${
                            selectedYear === year ? 'bg-white text-red-600' : 'bg-red-700 text-white'
                        } hover:bg-white hover:text-red-600 transition duration-200`}
                        onClick={() => handleYearChange(year)} // Cambia a usar handleYearChange
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
