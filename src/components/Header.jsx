import { NuevoPresupuesto, ControlPresupuesto } from "./"

export const Header = ({ 
    gastos,
    setGastos,
    setPresupuesto, 
    presupuesto, 
    setIsValidPresupuesto, 
    isValidPresupuesto 
    }) => {

  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {
        isValidPresupuesto ? ( 
            <ControlPresupuesto
                gastos = { gastos }
                setGastos = { setGastos }
                presupuesto = { presupuesto }
                setPresupuesto = { setPresupuesto }
                setIsValidPresupuesto= { setIsValidPresupuesto }
            /> 
        ) : (
            <NuevoPresupuesto 
                setIsValidPresupuesto = { setIsValidPresupuesto }
                presupuesto={ presupuesto }
                setPresupuesto={ setPresupuesto }
            /> 
            )   
        }
    </header>
  )
}
