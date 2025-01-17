import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) citasIniciales = [];



  // Array de citas
  const [citas, setCitas] = useState(citasIniciales);

  // useEffect para realizar operaciones cuando el state cambia
  useEffect(() => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
    
  }, [citas])

  // Funcion para leer citas y agregue una nueva
  const crearCita = cita => {
    setCitas([
      ...citas,
      cita])
  }

  // Funcion para eliminar citas por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(
      nuevasCitas)
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'Agrega una cita' : 'Citas'

  return (
    <Fragment>

      <h1>Administrador de pacientes</h1>

      <div className="container">

        <div className="row">

          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">

            <h2>{titulo}</h2>

            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />

            ))}

          </div>


        </div>
      </div>

    </Fragment>
  );
}

export default App;
