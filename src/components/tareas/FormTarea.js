import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import uuid from "uuid/dist/v4";
const FormTarea = () => {
  //state local del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;
  //context Proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  //context Tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    actualizarTarea,
    limiarTarea,
  } = tareasContext;

  useEffect(() => {
    //Detectar si existe una tarea selecionada y cambiar el state local
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  if (!proyecto) return null;
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    //validar si se esta agregando o editando una tarea
    if (tareaseleccionada === null) {
      //agregar nueva tarea al state de tareas
      tarea.estado = false;
      tarea.proyectoId = proyectoActual.id;
      tarea.id = uuid();
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      //limpiar la tarea seleccionada
      limiarTarea();
    }

    obtenerTareas(proyectoActual.id);
    //reiniciar form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={
              tareaseleccionada !== null ? "Editar Tarea" : "Agregar Tarea"
            }
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
