import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    mostrarFormulario,
    errorformulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //state para nuevo proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  //extraer valores del state
  const { nombre } = proyecto;
  //obener valores del input
  const handleChange = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  //crear proyecto
  const handleSubmit = (e) => {
    e.preventDefault();
    //validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }
    //agregar al state
    agregarProyecto(proyecto);
    //reiniciar form
    guardarProyecto({
      nombre: "",
    });
  };
  const handleClick = () => {
    mostrarFormulario();
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primario btn-block"
        onClick={handleClick}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? <p className="mensaje error">El nombre del Proyecto es Obligatorio</p>: null}
    </Fragment>
  );
};

export default NuevoProyecto;
