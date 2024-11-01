// Razones de liquidez
export const razonesLiquidez = (totalActivosCorrientes, totalPasivosCorrientes, inventarios) => {
    const razonCirculante = totalActivosCorrientes / totalPasivosCorrientes;
    const razonRapida = (totalActivosCorrientes - inventarios) / totalPasivosCorrientes;

    return {
        razonCirculante,
        razonRapida
    };
};

// Razones de endeudamiento
export const razonesEndeudamiento = (totalPasivosCorrientes, totalPasivosNoCorrientes, totalCapital) => {
    const deudaTotal = (totalPasivosCorrientes + totalPasivosNoCorrientes) / totalCapital;
    const deudaLargoPlazo = totalPasivosNoCorrientes / totalCapital;

    return {
        deudaTotal,
        deudaLargoPlazo
    };
};

// Razones de rentabilidad
export const razonesRentabilidad = (totalCapital, capitalSocial, totalActivos) => {
    const rentabilidadCapital = totalCapital / capitalSocial;
    const rentabilidadActivo = totalCapital / totalActivos;

    return {
        rentabilidadCapital,
        rentabilidadActivo
    };
};

// Razones de actividad
export const razonesActividad = (ventasNetas = 10000, totalActivos, cuentasPorCobrar) => {
    const rotacionActivos = ventasNetas / totalActivos;
    const diasCobranza = (cuentasPorCobrar / ventasNetas) * 365;

    return {
        rotacionActivos,
        diasCobranza
    };
};
