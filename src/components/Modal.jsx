import { Mensaje } from './Mensaje';
import { useEffect, useRef, useState } from 'react';
import CerrarBtn from '../img/cerrar.svg';

export const Modal = ({
  setModal, 
  animarModal,
  setAnimarModal,
  guardarGastos,
  gastoEditar,
  setGastoEditar
 }) => {
  
  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0 ) {
      setNombreGasto( gastoEditar.nombreGasto );
      setCantidad( gastoEditar.cantidad )
      setCategoria( gastoEditar.categoria );
      setId( gastoEditar.id );
      setFecha( gastoEditar.fecha );

    }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if([ nombreGasto, cantidad, categoria].includes('') || cantidad === 0 ) {
        setMensaje('Todos los campos deben estar llenos')
        return
    }
    guardarGastos({ nombreGasto, cantidad, categoria, id, fecha });
    setMensaje('');
  }

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    
    setTimeout(() => {
      setModal(false);
    }, 500);


  }
  return (
    <div className="modal">
        <div className="cerrar-modal"> 
          <img 
            src={CerrarBtn}  
            alt='cerrar modal'
            onClick={ ocultarModal }
          />
        </div>
        <form onSubmit={ handleSubmit } className={`formulario ${ animarModal ? "animar" : "cerrar" }`}>
          <legend>{ gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
          {mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje> }
          <div className='campo'>  
            <label htmlFor="nombre">Nombre Gasto</label>
            <input 
              id='nombmre'
              type='text' 
              placeholder='Añade el Nombre del Gasto'
              value={ nombreGasto }
              onChange={ (e) => setNombreGasto( e.target.value )}
            />
          </div>

          <div className='campo'>
            <label htmlFor="cantidad">Cantidad</label>
            <input 
              id='cantidad'
              type='number' 
              placeholder='Añade La cantidad del gasto ej. 300'
              value={ cantidad }
              onChange={ (e) => setCantidad( Number(e.target.value))}
            />
          </div>

          <div className='campo'>
            <label htmlFor="categoria">Categoría</label>
            <select id='categoria' value={ categoria } onChange={ (e) =>  setCategoria(e.target.value) }>
              <option value="">-- Selecciona una opción --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>
          <input type='submit' value={ gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto' } />
        </form>
    </div>
  )
}
