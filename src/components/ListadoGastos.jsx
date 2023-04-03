import { Gasto } from "./"

export const ListadoGastos = ({ 
  gastos,
  setGastoEditar, 
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
          {
            filtro ? (
              <>
              <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta Categoria'}</h2>
              {
                gastosFiltrados.map((gasto) => (
                  <Gasto
                      key={ gasto.id }
                      gasto={ gasto }
                      setGastoEditar={ setGastoEditar }
                      eliminarGasto = { eliminarGasto }
                  />
                ))}
            </>
            ) : (
              <>
              <h2>{ gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos Aun'}</h2>
              {gastos.map((gasto) => (
                <Gasto
                    key={ gasto.id }
                    gasto={ gasto }
                    setGastoEditar={ setGastoEditar }
                    eliminarGasto = { eliminarGasto }
                />
            ))}
            </>
            )
          }
    </div>
    
  )
}
