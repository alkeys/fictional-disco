import React, {useState} from 'react';
import './style/MetricasInfo.css';
const MetricasInfo = () => {
    const [openSection, setOpenSection] = useState(null);


    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const metricas = [
        {
            nombre: 'Margen de Utilidad',
            definicion: 'Indica el porcentaje de ingresos que se convierte en ganancia neta después de deducir todos los gastos.',
            formula: 'Utilidad Neta / Ingresos Totales',
            fuente: 'https://www.investopedia.com/terms/p/profitmargin.asp',
            uso: 'Se utiliza para identificar la eficiencia operativa de la empresa. Un margen bajo podría indicar altos costos operativos o precios bajos.'
        },
        {
            nombre: 'Liquidez Corriente',
            definicion: 'Mide la capacidad de la empresa para pagar sus obligaciones a corto plazo con sus activos corrientes.',
            formula: 'Activos Corrientes / Pasivos Corrientes',
            fuente: 'https://www.investopedia.com/terms/c/currentratio.asp',
            uso: 'Evalúa la capacidad de pago a corto plazo. Un valor bajo podría significar dificultades para cumplir con las obligaciones inmediatas.'
        },
        {
            nombre: 'Prueba Ácida',
            definicion: 'Evalúa la capacidad de la empresa para cumplir con sus obligaciones a corto plazo sin depender de la venta de inventarios.',
            formula: '(Activos Corrientes - Inventarios) / Pasivos Corrientes',
            fuente: 'https://www.investopedia.com/terms/q/quickratio.asp',
            uso: 'Proporciona una visión más estricta de la liquidez inmediata. Un valor bajo indica dependencia excesiva en los inventarios.'
        },
        {
            nombre: 'Ratio Deuda/Capital',
            definicion: 'Indica la proporción de deuda que tiene la empresa en relación con su capital.',
            formula: 'Pasivos Totales / Capital Total',
            fuente: 'https://www.bbva.com/es/salud-financiera/que-es-el-ratio-de-endeudamiento-y-como-se-calcula',
            uso: 'Muestra el nivel de apalancamiento de la empresa. Un ratio alto indica dependencia excesiva en financiamiento externo.'
        },
        {
            nombre: 'Rotación de Activos',
            definicion: 'Mide la eficiencia con la que la empresa utiliza sus activos para generar ventas.',
            formula: 'Ingresos Totales / Activos Totales',
            fuente: 'https://www.investopedia.com/terms/a/assetturnover.asp',
            uso: 'Indica qué tan bien la empresa está utilizando sus activos para generar ingresos. Un valor bajo puede reflejar activos infrautilizados.'
        },
        {
            nombre: 'Rentabilidad sobre el Capital (ROE)',
            definicion: 'Indica la rentabilidad que obtienen los accionistas sobre su inversión en la empresa.',
            formula: 'Utilidad Neta / Capital Total',
            fuente: 'https://www.investopedia.com/terms/r/returnonequity.asp',
            uso: 'Evalúa la capacidad de la empresa para generar retornos para los accionistas. Un ROE bajo puede indicar ineficiencia operativa o financiera.'
        },
        {
            nombre: 'Rentabilidad sobre los Activos (ROA)',
            definicion: 'Mide la eficiencia de la empresa para generar utilidades a partir de sus activos.',
            formula: 'Utilidad Neta / Activos Totales',
            fuente: 'https://www.investopedia.com/terms/r/returnonassets.asp',
            uso: 'Indica qué tan efectivamente la empresa utiliza sus activos para generar ganancias. Un ROA bajo puede reflejar ineficiencia operativa.'
        },
        {
            nombre: 'Periodo Promedio de Cobro',
            definicion: 'Indica el número promedio de días que tarda la empresa en cobrar a sus clientes.',
            formula: '(Cuentas por Cobrar / Ventas a Crédito) * 365',
            fuente: 'https://leanfinance.es/periodo-medio-pago-cobro/',
            uso: 'Un periodo largo puede indicar problemas en la gestión de cuentas por cobrar, afectando el flujo de efectivo.'
        },
        {
            nombre: 'Periodo Promedio de Pago',
            definicion: 'Muestra el número promedio de días que la empresa tarda en pagar a sus proveedores.',
            formula: '(Cuentas por Pagar / Compras a Crédito) * 365',
            fuente: 'https://www.investopedia.com/terms/a/accountspayableturnoverratio.asp',
            uso: 'Un periodo corto puede reflejar un flujo de efectivo ajustado, mientras que un periodo largo puede dañar relaciones con proveedores.'
        }
    ];

    const recomendaciones = [
        {
            criterio: 'Margen de Utilidad < 10%',
            accion: 'Incrementar precios o reducir costos operativos.',
            razon: 'Un margen bajo indica que la empresa no convierte suficientes ingresos en ganancias netas.',
            fuente: 'https://www.investopedia.com/terms/p/profitmargin.asp'
        },
        {
            criterio: 'Liquidez Corriente < 1',
            accion: 'Aumentar activos corrientes o reducir pasivos corrientes.',
            razon: 'Un valor bajo puede dificultar el cumplimiento de obligaciones a corto plazo.',
            fuente: 'https://www.investopedia.com/terms/c/currentratio.asp'
        },
        {
            criterio: 'ROA < 5%',
            accion: 'Incrementar la eficiencia operativa y mejorar el uso de activos.',
            razon: 'Un ROA bajo refleja una mala utilización de los activos.',
            fuente: 'https://www.investopedia.com/terms/r/returnonassets.asp'
        },
        {
            criterio: 'Periodo Promedio de Cobro > 90 días',
            accion: 'Implementar políticas más estrictas de cobro.',
            razon: 'Un periodo largo afecta el flujo de efectivo y puede aumentar el riesgo de cuentas incobrables.',
            fuente: 'https://economipedia.com/definiciones/periodo-medio-de-cobro-pmc.html'
        },
        {
            criterio: 'Ratio Deuda/Capital > 1',
            accion: 'Reducir el apalancamiento renegociando deudas o aumentando el capital propio.',
            razon: 'Un alto nivel de deuda puede comprometer la solvencia de la empresa.',
            fuente: 'https://economipedia.com/definiciones/ratio-de-deuda-sobre-capital.html'
        }
    ];

    const evaluaciones = [
        {
            criterio: 'Liquidez Corriente >= 1.5',
            evaluacion: 'Excelente capacidad para cubrir obligaciones a corto plazo.',
            fuente: 'https://www.investopedia.com/terms/c/currentratio.asp'
        },
        {
            criterio: 'ROE >= 15%',
            evaluacion: 'Excelente retorno sobre la inversión para los accionistas.',
            fuente: 'https://www.investopedia.com/terms/r/returnonequity.asp'
        },
        {
            criterio: 'Rotación de Activos >= 1',
            evaluacion: 'Alta eficiencia en el uso de activos para generar ingresos.',
            fuente: 'https://www.investopedia.com/terms/a/assetturnover.asp'
        },
        {
            criterio: 'Margen de Utilidad >= 20%',
            evaluacion: 'Operación altamente eficiente con un margen excelente.',
            fuente: 'https://www.investopedia.com/terms/p/profitmargin.asp'
        }
    ];

    return (
        <div className="bg-white h-full text-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto my-8 animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4 text-center border-b-4 border-gray-300 pb-2">
                Información de Métricas y Análisis
            </h2>

            <button
                className="w-full text-left font-bold text-2xl bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 hover:bg-gray-700 hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() => toggleSection('metricas')}
            >
                Métricas Financieras
            </button>
            {openSection === 'metricas' && (
                <div className="section-content">
                    {metricas.map((metrica, index) => (
                        <div key={index} className="card bg-gray-100 text-gray-800 p-4 rounded-lg mb-4 shadow-md animate-slideDown">
                            <h4 className="text-xl font-bold mb-2 text-gray-900">{metrica.nombre}</h4>
                            <p>
                                <span className="font-semibold text-gray-600">Definición:</span> {metrica.definicion}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Fórmula:</span> {metrica.formula}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Uso:</span> {metrica.uso}
                            </p>
                            <a
                                href={metrica.fuente}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-500"
                            >
                                Fuente
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="w-full text-left font-bold text-2xl bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 hover:bg-gray-700 hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() => toggleSection('recomendaciones')}
            >
                Recomendaciones
            </button>
            {openSection === 'recomendaciones' && (
                <div className="section-content">
                    {recomendaciones.map((rec, index) => (
                        <div key={index} className="card bg-gray-100 text-gray-800 p-4 rounded-lg mb-4 shadow-md animate-slideDown">
                            <p>
                                <span className="font-semibold text-gray-600">Criterio:</span> {rec.criterio}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Acción Sugerida:</span> {rec.accion}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Razón:</span> {rec.razon}
                            </p>
                            <a
                                href={rec.fuente}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-500"
                            >
                                Fuente
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="w-full text-left font-bold text-2xl bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 hover:bg-gray-700 hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() => toggleSection('evaluaciones')}
            >
                Criterios de Evaluación
            </button>
            {openSection === 'evaluaciones' && (
                <div className="section-content">
                    {evaluaciones.map((item, index) => (
                        <div key={index} className="card bg-gray-100 text-gray-800 p-4 rounded-lg mb-4 shadow-md animate-slideDown">
                            <p>
                                <span className="font-semibold text-gray-600">Criterio:</span> {item.criterio}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-600">Evaluación:</span> {item.evaluacion}
                            </p>
                            <a
                                href={item.fuente}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-500"
                            >
                                Fuente
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );



};

export default MetricasInfo;
