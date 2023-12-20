import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export const FormularioTareas = ({ tareas, cambiarTareas }) => {
  const [nuevaTarea, setNuevaTarea] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    cambiarTareas([
      ...tareas,
      {
        id: tareas.length + 1,
        texto: nuevaTarea,
        completada: false
      }
    ]);

    // Limpiar el campo de entrada después de enviar la tarea
    setNuevaTarea('');
  };

  return (
    <form onSubmit={manejarEnvio} className='formulario-tareas'>
      <input
        type='text'
        className='formulario-tareas__input'
        placeholder='Introduce una tarea'
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
      />
      <button type='submit' className='formulario-tareas__btn'>
        <FontAwesomeIcon icon={faPlusSquare} className='formulario-tareas__icono-btn' />
      </button>
    </form>
  );
};
