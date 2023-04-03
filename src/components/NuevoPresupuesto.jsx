import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({ setPresupuesto, presupuesto, setIsValidPresupuesto }) => {
    
    const [ mensaje, setmensaje ] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if( !presupuesto || presupuesto < 0 ){
            setmensaje('No es un Presupuesto válido')
            return
        }
        setmensaje('');
        setIsValidPresupuesto(true);
    }
  return (  
    <div className="contenedor-presupuesto contenedor sombra">

    <form onSubmit={ handleSubmit } className="formulario">
        <div className="campo">
            <label>Definir Presupuesto</label>

            <input 
                className="nuevo-presupuesto"
                type="number" 
                placeholder="Añade tu Presupuesto"    
                value={ presupuesto }
                onChange={ e => setPresupuesto( Number(e.target.value) ) }
            />
        </div>
        <input type="submit" value="Añadir" />
        {
            mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje>
        }
    </form>
</div>
  )
}
