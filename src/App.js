// En App.js
import React, { useState } from 'react';
import './App.css';
import { FormularioTareas } from './componentes/FormularioTareas';
import { Header } from './componentes/Header';
import { ListaTareas } from './componentes/ListaTareas';

function App() {
  const [tareas, cambiarTareas] = useState([
    /*{ id: 1, texto: 'Estudiar para el examen DI', completada: false },
    { id: 2, texto: 'Estudiar para recuperar QGIS', completada: false },*/
  ]);

  const actualizarTareas = (nuevasTareas) => {
    cambiarTareas(nuevasTareas);
  };

  console.log(tareas);

  return (
    <div className="contenedor">
      <Header />
      <FormularioTareas tareas={tareas} cambiarTareas={actualizarTareas} />
      <ListaTareas tareas={tareas} cambiarTareas={actualizarTareas} />
    </div>
  );
}

export default App;

