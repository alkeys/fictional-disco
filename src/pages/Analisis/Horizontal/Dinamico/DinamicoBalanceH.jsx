import React, { useState } from 'react';

const HorizontalAnalysisTable = ({ title, currentSection, previousSection }) => {
    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return 0;
        return ((current / previous) - 1) * 100;
    };

    const renderRows = (current, previous) => {
        return Object.keys(current).map((key) => {
            if (typeof current[key] === 'object') {
                return (
                    <div key={key} className="ml-6">
                        <h4 className="text-lg md:text-xl font-semibold text-white">{key}</h4>
                        {renderRows(current[key], previous[key])}
                    </div>
                );
            }

            const currentAmount = parseFloat(current[key]);
            const previousAmount = parseFloat(previous[key]);
            const absoluteDifference = currentAmount - previousAmount;
            const percentageChange = calculatePercentageChange(currentAmount, previousAmount);

            return (
                <tr key={key} className="border-t border-gray-300">
                    <td className="px-3 py-1 text-sm md:text-base">{key}</td>
                    <td className="px-3 py-1 text-sm md:text-base text-right">{previousAmount.toLocaleString()}</td>
                    <td className="px-3 py-1 text-sm md:text-base text-right">{currentAmount.toLocaleString()}</td>
                    <td className="px-3 py-1 text-sm md:text-base text-right">{absoluteDifference.toLocaleString()}</td>
                    <td className="px-3 py-1 text-sm md:text-base text-right">{percentageChange.toFixed(2)}%</td>
                </tr>
            );
        });
    };

    return (
        <div className="overflow-x-auto">
            <h4 className="text-lg md:text-xl font-semibold mt-6">{title}</h4>
            <table className="min-w-full mt-4 table-auto bg-white text-black rounded-lg">
                <thead>
                <tr className="bg-red-600 text-white">
                    <th className="px-3 py-2 text-left text-xs md:text-sm">Cuenta</th>
                    <th className="px-3 py-2 text-right text-xs md:text-sm">Año Anterior</th>
                    <th className="px-3 py-2 text-right text-xs md:text-sm">Año Actual</th>
                    <th className="px-3 py-2 text-right text-xs md:text-sm">Diferencia</th>
                    <th className="px-3 py-2 text-right text-xs md:text-sm">% Cambio</th>
                </tr>
                </thead>
                <tbody>
                {renderRows(currentSection, previousSection)}
                </tbody>
            </table>
        </div>
    );
};

const HorizontalAnalysis = ({ data }) => {
    const [years, setYears] = useState({
        selectedYear: data[1]?.year,
        previousYear: data[0]?.year,
    });

    const selectedData = data.find((entry) => entry.year === years.selectedYear);
    const previousData = data.find((entry) => entry.year === years.previousYear);

    const handleYearChange = (event) => {
        setYears({ ...years, [event.target.name]: event.target.value });
    };

    return (
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Análisis Horizontal</h2>

            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm md:text-base">Año Actual:</span>
                    <select
                        name="selectedYear"
                        value={years.selectedYear}
                        onChange={handleYearChange}
                        className="bg-white text-black rounded px-3 py-2 w-32 text-sm md:text-base"
                    >
                        {data.map((entry) => (
                            <option key={entry.year} value={entry.year}>
                                {entry.year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm md:text-base">Año Anterior:</span>
                    <select
                        name="previousYear"
                        value={years.previousYear}
                        onChange={handleYearChange}
                        className="bg-white text-black rounded px-3 py-2 w-32 text-sm md:text-base"
                    >
                        {data.map((entry) => (
                            <option key={entry.year} value={entry.year}>
                                {entry.year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedData && previousData && years.selectedYear !== years.previousYear ? (
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">
                        {selectedData.empresa} ({years.selectedYear}) vs {years.previousYear}
                    </h3>

                    <HorizontalAnalysisTable
                        title="Activos"
                        currentSection={selectedData.Activos}
                        previousSection={previousData.Activos}
                    />
                    <HorizontalAnalysisTable
                        title="Pasivo y Capital"
                        currentSection={selectedData["Pasivo y Capital"]}
                        previousSection={previousData["Pasivo y Capital"]}
                    />
                </div>
            ) : (
                <p className="text-center text-lg mt-4">
                    Por favor, selecciona dos años diferentes para comparar.
                </p>
            )}
        </div>
    );
};

export default HorizontalAnalysis;
