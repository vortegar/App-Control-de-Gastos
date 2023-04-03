import { useEffect, useState } from 'react';
import { Filtros, Header, ListadoGastos, Modal } from './components';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [ presupuesto, setPresupuesto ] = useState(Number(localStorage.getItem('presupuesto') ?? 0));
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [ gastos, setGastos ] = useState( 
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0 ) {
      setModal(true);
      
      setTimeout(() => {
        setAnimarModal(true)
    }, 100);
    }
  }, [ gastoEditar ])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0 );
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0 ;

    if(presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados( gastosFiltrados );
    }
  }, [filtro])
  

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])
  

  const handleNuevoGasto = () => {  
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true)
    }, 100);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    setGastos(gastosActualizados);
  }

  const guardarGastos = (gasto) => {
    //Actualizar Gasto
      if(gasto.id) {
        const gastoTotalActualizado = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );
        setGastos( gastoTotalActualizado );
        setGastoEditar({});
      }else{
    //Crear Nuevo Gasto
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGastos([...gastos , gasto])
      }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }
  
  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header
        gastos = { gastos }
        setGastos = { setGastos }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = { setIsValidPresupuesto}
        presupuesto={ presupuesto }
        setPresupuesto={ setPresupuesto }
      />

      {
        
        isValidPresupuesto && (
         <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={ gastos }
              setGastoEditar={ setGastoEditar }
              eliminarGasto = { eliminarGasto }
              filtro = { filtro }
              gastosFiltrados = { gastosFiltrados }
            />
          </main>
          <div className='nuevo-gasto'>
              <img 
                src={ IconoNuevoGasto }
                alt='icono nuevo gasto'  
                onClick={ handleNuevoGasto }
              />
            </div>
          </>
        )
      }
      {
        modal && <Modal 
                    setModal={ setModal } 
                    animarModal = { animarModal }  
                    setAnimarModal = { setAnimarModal }
                    guardarGastos = { guardarGastos }
                    gastoEditar = { gastoEditar }
                    setGastoEditar = { setGastoEditar }
                  />
      }

    </div>
  )
}

export default App
 