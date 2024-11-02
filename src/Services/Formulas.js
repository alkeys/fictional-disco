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

/**
 * periodo promedio de pago  suponiendo que es todos los años 365 dias
 */
export const  ppp = (cuentasPorPagar, comprasNetas) => {
    return (cuentasPorPagar/comprasNetas ) * 365;
}

/**
 * periodo promedio de cobro
 */
export const ppc = (cuentasPorCobrar, costosventa) => {
    return (cuentasPorCobrar/costosventa*0.7) * 365;
}

/**
 * Calcula el rendimiento sobre el patrimonio (ROE).
 *
 * @param {number} utilidadNeta - Utilidad neta de la empresa.
 * @param {number} patrimonioNeto - Patrimonio neto de la empresa.
 * @returns {number} - Rendimiento sobre el patrimonio (ROE) en porcentaje.
 */
export const calcularROE = (utilidadNeta, patrimonioNeto) => {
    if (patrimonioNeto === 0) {
        throw new Error("El patrimonio neto no puede ser cero."); // Evita división por cero
    }

    return (utilidadNeta / patrimonioNeto) * 100; // Cálculo de ROE
};

/**
 * Calcula la razón precio/ganancias (P/G).
 *
 * @param {number} precioAccion - Precio actual de la acción.
 * @param {number} gananciasPorAccion - Ganancias por acción (EPS).
 * @returns {number} - Razón precio/ganancias (P/G).
 */
export const calcularPG = (precioAccion, gananciasPorAccion) => {
    if (gananciasPorAccion === 0) {
        throw new Error("Las ganancias por acción no pueden ser cero."); // Evita división por cero
    }

    return precioAccion / gananciasPorAccion; // Cálculo de P/G
};

/**
 * Calcula el rendimiento sobre los activos totales (ROA).
 *
 * @param {number} utilidadNeta - Utilidad neta de la empresa.
 * @param {number} activosTotales - Activos totales de la empresa.
 * @returns {number} - Rendimiento sobre los activos totales (ROA) en porcentaje.
 */
export const calcularROA = (utilidadNeta, activosTotales) => {
    if (activosTotales === 0) {
        throw new Error("Los activos totales no pueden ser cero."); // Evita división por cero
    }

    return (utilidadNeta / activosTotales) * 100; // Cálculo de ROA
};




/**
 * Calcula el Costo Promedio Ponderado de Capital (WACC).
 *
 * @param {number} E - Valor del capital propio (equity) de la empresa.
 * @param {number} D - Valor de la deuda (debt) de la empresa.
 * @param {number} r_e - Costo del capital propio (retorno esperado por los accionistas).
 * @param {number} r_d - Costo de la deuda (interés que la empresa paga por su deuda).
 * @param {number} T - Tasa impositiva (tax rate) que aplica a la empresa.
 * @returns {number} - El WACC expresado como un decimal.
 */
export const calcularWACC = (E, D, r_e, r_d, T) => {
    const V = E + D; // Valor total de la empresa

    // Cálculo del WACC
    const wacc = (E / V) * r_e + (D / V) * r_d * (1 - T);

    return wacc;
};



/**
 * Calcula el costo de la deuda antes de impuestos.
 *
 * @param {number} interes - Interés que la empresa paga por su deuda.
 * @param {number} valorNominal - Valor nominal de la deuda.
 * @returns {number} - El costo de la deuda antes de impuestos.
 */
export const calcularCostoDeudaAntesImpuestos = (interes, valorNominal) => {
    return interes / valorNominal;
}


/**
 * calcula el analisis verticar  de un balance pasano dos parametros
 * retorna en porcentaje
 */
export const analisisVertical = (total,parte) => {
    return (parte/total) * 100;
}

/**
 * para el analisis horizontal
 */
export const analisisHorizontal = (periodo1, periodo2) => {
    return (((periodo2) / periodo1)-1) * 100;
}

/**
 * Calcula el punto de equilibrio en unidades.
 *
 * @param {number} costosFijos - Costos fijos totales de la empresa.
 * @param {number} precioVenta - Precio de venta por unidad.
 * @param {number} costoVariable - Costo variable por unidad.
 * @returns {number} - Punto de equilibrio en unidades.
 */
export const calcularPuntoEquilibrio = (costosFijos, precioVenta, costoVariable) => {
    if (precioVenta <= costoVariable) {
        throw new Error("El precio de venta debe ser mayor que el costo variable.");
    }

    return costosFijos / (precioVenta - costoVariable);
};


/**
 * Calcula la razón de cargos de interés fijo.
 *
 * @param {number} EBIT - Ganancia antes de intereses e impuestos.
 * @param {number} interesesAPagar - Total de intereses a pagar.
 * @returns {number} - Razón de cargos de interés fijo.
 */
export const calcularRazonCargosInteresFijo = (EBIT, interesesAPagar) => {
    if (interesesAPagar === 0) {
        throw new Error("Los intereses a pagar no pueden ser cero."); // Evita división por cero
    }

    return EBIT / interesesAPagar;
};

 /**
 * Calcula la razón de deuda a capital patrimonial.
 *
 * @param {number} deudaTotal - Total de la deuda de la empresa.
 * @param {number} capitalPatrimonial - Capital patrimonial de la empresa.
 * @returns {number} - Razón de deuda a capital patrimonial.
 */
 export const calcularRazonDeudaCapitalPatrimonial = (deudaTotal, capitalPatrimonial) => {
    if (capitalPatrimonial === 0) {
        throw new Error("El capital patrimonial no puede ser cero."); // Evita división por cero
    }
    return deudaTotal / capitalPatrimonial;
};


/**
 * Calcula el margen de utilidad bruta.
 *
 * @param {number} ventasNetas - Ventas netas de la empresa.
 * @param {number} costoBienesVendidos - Costo de los bienes vendidos (COGS).
 * @returns {number} - Margen de utilidad bruta en porcentaje.
 */
export const calcularMargenUtilidadBruta = (ventasNetas, costoBienesVendidos) => {
    if (ventasNetas === 0) {
        throw new Error("Las ventas netas no pueden ser cero."); // Evita división por cero
    }

    const utilidadBruta = ventasNetas - costoBienesVendidos; // Cálculo de utilidad bruta
    return (utilidadBruta / ventasNetas) * 100; // Cálculo del margen de utilidad bruta
};



/**
 * Calcula la rotación de activos totales.
 *
 * @param {number} ventasTotales - Ventas totales de la empresa.
 * @param {number} activosTotales - Activos totales de la empresa.
 * @returns {number} - Rotación de activos totales.
 */
export const calcularRotacionActivosTotales = (ventasTotales, activosTotales) => {
    if (activosTotales === 0) {
        throw new Error("Los activos totales no pueden ser cero."); // Evita división por cero
    }

    return ventasTotales / activosTotales; // Cálculo de la rotación de activos totales
};


 /**
 * Calcula la razón de cobertura de pagos fijos.
 *
 * @param {number} EBIT - Ganancia antes de intereses e impuestos.
 * @param {number} gastosArrendamiento - Gastos de arrendamiento.
 * @param {number} interesesAPagar - Total de intereses a pagar.
 * @returns {number} - Razón de cobertura de pagos fijos.
 */
 export const calcularRazonCoberturaPagosFijos = (EBIT, gastosArrendamiento, interesesAPagar) => {
    const totalGastosFijos = interesesAPagar + gastosArrendamiento; // Total de gastos fijos
    if (totalGastosFijos === 0) {
        throw new Error("La suma de intereses a pagar y gastos de arrendamiento no puede ser cero."); // Evita división por cero
    }

    return (EBIT + gastosArrendamiento) / totalGastosFijos; // Cálculo de la razón de cobertura de pagos fijos
};


/**
 * Calcula el margen de utilidad operativa.
 *
 * @param {number} ventasTotales - Ventas totales de la empresa.
 * @param {number} costoBienesVendidos - Costo de los bienes vendidos (COGS).
 * @param {number} gastosOperativos - Gastos operativos de la empresa.
 * @returns {number} - Margen de utilidad operativa en porcentaje.
 */
export  const calcularMargenUtilidadOperativa = (ventasTotales, costoBienesVendidos, gastosOperativos) => {
    const utilidadOperativa = ventasTotales - costoBienesVendidos - gastosOperativos; // Cálculo de utilidad operativa
    if (ventasTotales === 0) {
        throw new Error("Las ventas totales no pueden ser cero."); // Evita división por cero
    }

    return (utilidadOperativa / ventasTotales) * 100; // Cálculo del margen de utilidad operativa
};

/**
 * Calcula el margen de utilidad neta.
 *
 * @param {number} ventasTotales - Ventas totales de la empresa.
 * @param {number} costoBienesVendidos - Costo de los bienes vendidos (COGS).
 * @param {number} gastosOperativos - Gastos operativos de la empresa.
 * @param {number} gastosFinancieros - Gastos financieros de la empresa.
 * @param {number} impuestos - Impuestos a pagar.
 * @returns {number} - Margen de utilidad neta en porcentaje.
 */
export const calcularMargenUtilidadNeta = (ventasTotales, costoBienesVendidos, gastosOperativos, gastosFinancieros, impuestos) => {
    const utilidadNeta = ventasTotales - costoBienesVendidos - gastosOperativos - gastosFinancieros - impuestos; // Cálculo de utilidad neta
    if (ventasTotales === 0) {
        throw new Error("Las ventas totales no pueden ser cero."); // Evita división por cero
    }

    return (utilidadNeta / ventasTotales) * 100; // Cálculo del margen de utilidad neta
};


/**
 * Calcula las ganancias disponibles para los accionistas comunes.
 *
 * @param {number} utilidadNeta - Utilidad neta de la empresa.
 * @param {number} dividendosAccionesPreferentes - Dividendos de acciones preferentes.
 * @returns {number} - Ganancias disponibles para los accionistas comunes.
 */
export const calcularGananciasDisponibles = (utilidadNeta, dividendosAccionesPreferentes) => {
    return utilidadNeta - dividendosAccionesPreferentes; // Cálculo de ganancias disponibles
};



/**
 * Calcula el valor en libros por acción común.
 *
 * @param {number} patrimonioNeto - Patrimonio neto de la empresa.
 * @param {number} accionesComunesCirculacion - Número de acciones comunes en circulación.
 * @returns {number} - Valor en libros por acción común.
 */
export const calcularValorEnLibrosPorAccion = (patrimonioNeto, accionesComunesCirculacion) => {
    if (accionesComunesCirculacion === 0) {
        throw new Error("El número de acciones comunes en circulación no puede ser cero."); // Evita división por cero
    }

    return patrimonioNeto / accionesComunesCirculacion; // Cálculo del valor en libros por acción
};


/**
 * Calcula el rendimiento sobre los activos totales (ROA).
 *
 * @param {number} utilidadNeta - Utilidad neta de la empresa.
 * @param {number} activosTotales - Activos totales de la empresa.
 * @returns {number} - Rendimiento sobre los activos totales (ROA) en porcentaje.
 */
export const ROA = (utilidadNeta, activosTotales) => {
    if (activosTotales === 0) {
        throw new Error("Los activos totales no pueden ser cero."); // Evita división por cero
    }

    return (utilidadNeta / activosTotales) ; // Cálculo de ROA
};

/**
 * Calcula el rendimiento sobre el patrimonio (ROE).
 *
 * @param {number} utilidadNeta - Utilidad neta de la empresa.
 * @param {number} patrimonioNeto - Patrimonio neto de la empresa.
 * @returns {number} - Rendimiento sobre el patrimonio (ROE) en porcentaje.
 */
export const ROE = (utilidadNeta, patrimonioNeto) => {
    if (patrimonioNeto === 0) {
        throw new Error("El patrimonio neto no puede ser cero."); // Evita división por cero
    }

    return (utilidadNeta / patrimonioNeto) ; // Cálculo de ROE
};