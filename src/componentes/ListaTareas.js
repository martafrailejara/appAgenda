import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

export const ListaTareas = ({ tareas, cambiarTareas }) => {
  const [tareasEditadas, setTareasEditadas] = useState({});
  const [tareasCompletadas, setTareasCompletadas] = useState([]);

  useEffect(() => {
    // Guardar tareas en el almacenamiento local
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    // Guardar tareas completadas en el almacenamiento local
    localStorage.setItem('tareasCompletadas', JSON.stringify(tareasCompletadas));
  }, [tareasCompletadas]);

  const handleEditClick = (tarea) => {
    setTareasEditadas((prev) => ({ ...prev, [tarea.id]: tarea.texto }));
  };

  const handleSaveEdit = (tareaId) => {
    cambiarTareas((tareas) =>
      tareas.map((t) =>
        t.id === tareaId ? { ...t, texto: tareasEditadas[t.id] } : t
      )
    );
    setTareasEditadas((prev) => ({ ...prev, [tareaId]: undefined }));
  };

  const handleCancelEdit = (tareaId) => {
    setTareasEditadas((prev) => ({ ...prev, [tareaId]: undefined }));
  };

  const handleDelete = (tareaId) => {
    cambiarTareas((tareas) => {
      const tareaEliminada = tareas.find((t) => t.id === tareaId);
      if (tareaEliminada && tareaEliminada.completada) {
        setTareasCompletadas((prev) => [...prev, tareaEliminada]);
      }
      return tareas.filter((t) => t.id !== tareaId);
    });
  };

  return (
    <div>
      <ul className='lista-tareas'>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <li key={tarea.id} className='lista-tareas__tarea'>
              {tareasEditadas[tarea.id] !== undefined ? (
                <div className='formulario-editar-tarea'>
                  <input
                    type='text'
                    className='formulario-editar-tarea__input'
                    value={tareasEditadas[tarea.id]}
                    onChange={(e) => setTareasEditadas((prev) => ({ ...prev, [tarea.id]: e.target.value }))}
                  />
                  <button
                    className='formulario-editar-tarea__btn'
                    onClick={() => handleSaveEdit(tarea.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className='formulario-editar-tarea__btn'
                    onClick={() => handleCancelEdit(tarea.id)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span className='lista-tareas__texto'>{tarea.texto}</span>
                  <div className='lista-tareas__contenedor-botones'>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className='lista-tareas__icono lista-tareas__icono-accion'
                      onClick={() => handleEditClick(tarea)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='lista-tareas__icono lista-tareas__icono-accion'
                      onClick={() => handleDelete(tarea.id)}
                    />
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <div className='lista-tareas__mensaje'>No existen tareas</div>
        )}
      </ul>

      {tareasCompletadas.length > 0 && (
        <div>
          <h2>Tareas Completadas</h2>
          <ul>
            {tareasCompletadas.map((tarea) => (
              <li key={tarea.id}>{tarea.texto}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


