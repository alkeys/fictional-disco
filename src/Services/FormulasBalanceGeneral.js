/************************************************************/
//Formulas de los balances generales de la empresa Coca-Cola
// para los años 2019, 2020, 2021, 2022 y 2023

//Razones de liquidez mediante el paso de datos de los balances generales de la empresa Coca-Cola
export const razonesLiquidez = (balance) => {
    let activosCorrientes = balance.Activos["Activos Corrientes"];
    let pasivosCorrientes = balance["Pasivo y Capital"]["Pasivos Corrientes"];

    //Razón Circulante
    let razonCirculante = activosCorrientes["Total activos corrientes"] / pasivosCorrientes["Total pasivos corrientes"];

    //Razón Rápida
    let razonRapida = (activosCorrientes["Total activos corrientes"] - activosCorrientes.Inventarios) / pasivosCorrientes["Total pasivos corrientes"];

    return {
        razonCirculante,
        razonRapida
    };
}

//razones de endeudamiento
export const razonesEndeudamiento = (balance) => {
    let pasivosCorrientes = balance["Pasivo y Capital"]["Pasivos Corrientes"];
    let pasivosNoCorrientes = balance["Pasivo y Capital"]["Pasivos No Corrientes"];
    let capital = balance["Pasivo y Capital"].Capital;

    //Razón de Deuda Total
    let deudaTotal = (pasivosCorrientes["Total pasivos corrientes"] + pasivosNoCorrientes["Total pasivos no corrientes"]) / capital["Total capital"];

    //Razón de Deuda a Largo Plazo
    let deudaLargoPlazo = pasivosNoCorrientes["Total pasivos no corrientes"] / capital["Total capital"];

    return {
        deudaTotal,
        deudaLargoPlazo
    };
}

//razones de rentabilidad
export const razonesRentabilidad = (balance) => {
    let capital = balance["Pasivo y Capital"].Capital;

    //Razón de Rentabilidad del Capital Contable
    let rentabilidadCapital = capital["Total capital"] / capital["Capital Social"];

    //Razón de Rentabilidad del Activo Total
    let rentabilidadActivo = capital["Total capital"] / balance["Total Activos"];

    return {
        rentabilidadCapital,
        rentabilidadActivo
    };
}

//razones de actividad
export const razonesActividad = (balance) => {
    let activosCorrientes = balance.Activos["Activos Corrientes"];
    let ventasNetas = 10000;

    //Rotación de Activos
    let rotacionActivos = ventasNetas / balance["Total Activos"];

    //Días de Cobranza
    let diasCobranza = (activosCorrientes["Cuentas por cobrar, neto"] / ventasNetas) * 365;

    return {
        rotacionActivos,
        diasCobranza
    };
}

