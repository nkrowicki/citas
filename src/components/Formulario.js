import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4'
import PropTypes from 'prop-types';

const Formulario = ({ crearCita}) => {

    //Crear State de Citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, setError] = useState(false);

    // Funcion que se ejecuta cuando el usuario escribe en un input
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    // Funcion para enviar formulario
    const submitCita = e => {
        e.preventDefault()

        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            console.log('hay error');
            setError(true)
            return;
        }

        //Si la validación está ok: Eliminar mensaje de error
        setError(false)

        //Asignar ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita)
        
        //Reiniciar el formulario
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Error, todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={handleChange}
                    value={propietario}


                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}


                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}


                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}

                >
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary">
                    Agregar cita
                </button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;