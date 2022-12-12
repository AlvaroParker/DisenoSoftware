import { useMutation, gql } from "@apollo/client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './addEvento.css';

const ADD_EVENTO = gql`
  mutation addEvento(
    $titulo: String!
    $descripcion: String!
    $imagen: String!
  ) {
      addEvento(input: {titulo: $titulo, descripcion: $descripcion, imagen: $imagen}) {
        id
        titulo
        descripcion
        imagen
      }
  }
`

export default function AddEvento() {
  const [addE, { data, loading, error }] = useMutation(ADD_EVENTO);
  const [formState, setFormState] = React.useState({
    titulo: String,
    descripcion: String,
    imagen: String
  });
  if (loading) return (<p>Cargando...</p>)
  if (error) return (<p>Error</p>)
  if (data) return (<p>Creado</p>)
  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3" id="mainContainer">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Agregar Evento</h2>

                <form onSubmit={e => {
                  e.preventDefault();
                  addE({
                    variables: {
                      titulo: formState.titulo,
                      descripcion: formState.descripcion,
                      imagen: formState.imagen
                    }
                  })
                }}>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.titulo} onChange={e => {
                      setFormState({ ...formState, titulo: e.target.value })
                    }} />
                    <label className="form-label" >TITULO</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.descripcion} onChange={e => {
                      setFormState({ ...formState, descripcion: e.target.value })
                    }} />
                    <label className="form-label" >DESCRIPCION</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.imagen} onChange={e => {
                      setFormState({ ...formState, imagen: e.target.value })
                    }} />
                    <label className="form-label" >IMAGEN</label>
                  </div>


                  <div className="d-flex justify-content-center">
                    <button type="submit"
                      className="btn btn-primary btn-block btn-lg gradient-custom-1 text-body">Agregar</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
