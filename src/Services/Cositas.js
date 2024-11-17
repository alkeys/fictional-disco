export const transformData = () => {
    const data = JSON.parse(localStorage.getItem("BalancesPorAnio"));
    // Extrae cada año del objeto
    return Object.entries(data).map(([year, entries]) => {
        const entry = entries[0];
        const empresa = entry.name_empresa;

        // Extrae dinámicamente solo los valores de "Activos" y "Pasivo y Capital"
        const activos = Object.keys(entry.Activos).reduce((acc, key) => {
            acc[key] = entry.Activos[key];
            return acc;
        }, {});

        const pasivoCapital = Object.keys(entry["Pasivo y Capital"]).reduce((acc, key) => {
            acc[key] = entry["Pasivo y Capital"][key];
            return acc;
        }, {});

        return {
            empresa,
            year,
            Activos: activos,
            "Pasivo y Capital": pasivoCapital,
        };
    });
};


export function transformarDatosDinamicos() {
    const data = JSON.parse(localStorage.getItem("EstadosPorAnio"));
    let resultado = {};

    // Recorremos los años disponibles
    Object.keys(data).forEach(anio => {
        // Inicializamos el objeto para cada año
        resultado[anio] = {};

        // Recorremos las propiedades del año
        data[anio].forEach(item => {
            // Agregar el año a los datos
            resultado[anio].año = anio;

            // Recorremos las claves del item y las agregamos al resultado
            Object.keys(item).forEach(key => {
                // Filtramos las claves que no son necesarias (como id, name, etc.)
                if (key !== "id" && key !== "name" && key !== "name_empresa" && key !== "fecha") {
                    // Si el valor es "null", lo cambiamos por "0" o por lo que desees
                    resultado[anio][key] = item[key] === "null" ? "0" : item[key];
                }
            });
        });
    });

    return resultado;
}


export function transformarDatosA_Balance() {
    const data = JSON.parse(localStorage.getItem("BalancesPorAnio"));
    let resultado = {};

    // Recorremos los años disponibles
    Object.keys(data).forEach(anio => {
        // Inicializamos el objeto para cada año
        resultado[anio] = {};

        // Recorremos las propiedades del año
        data[anio].forEach(item => {
            // Agregar el año a los datos
            resultado[anio].año = anio;

            // Recorremos las claves del item y las agregamos al resultado
            Object.keys(item).forEach(key => {
                // Filtramos las claves que no son necesarias (como id, name, etc.)
                if (key !== "id"  && key !== "fecha") {
                    // Si el valor es "null", lo cambiamos por "0" o por lo que desees
                    resultado[anio][key] = item[key] === "null" ? "0" : item[key];
                }
            });
        });
    });

    return resultado;
}


