import { useMutation, gql } from "@apollo/client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './addEvento.css';

const ADD_EVENTO = gql`
  mutation addEvento(
    $titulo: String!
    $descripcion: String!
    $imagen: String!
    $plataforma: String!
    $lanzamiento: String!
  ) {
      addEvento(input: {titulo: $titulo, descripcion: $descripcion, imagen: $imagen, plataforma: $plataforma, lanzamiento: $lanzamiento}) {
        id
        titulo
        descripcion
        imagen
        plataforma
        lanzamiento
      }
  }
`

function element(bool, addE, formState, setFormState) {
  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3" id="mainContainer">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Agregar Juego</h2>
                <h5 className="text-uppercase text-center mb-5 text-success">{bool && <>JUEGO AGREGADO</>}</h5>
                <form id="mainForm" onSubmit={e => {
                  e.preventDefault();
                  addE({
                    variables: {
                      titulo: formState.titulo,
                      descripcion: formState.descripcion,
                      imagen: formState.imagen,
                      plataforma: formState.plataforma,
                      lanzamiento: formState.lanzamiento.toString()
                    }
                  })
                  setFormState({ titulo: "", descripcion: "", imagen: "", plataforma: "", lanzamiento: "" });
                }}>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.titulo} onChange={e => {
                      setFormState({ ...formState, titulo: e.target.value })
                    }} required={true} />
                    <label className="form-label" >TITULO</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.descripcion} onChange={e => {
                      setFormState({ ...formState, descripcion: e.target.value })
                    }} required={true} />
                    <label className="form-label" >DESCRIPCION</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.imagen} onChange={e => {
                      setFormState({ ...formState, imagen: e.target.value })
                    }} required={true} />
                    <label className="form-label" >IMAGEN</label>
                  </div>


                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" value={formState.plataforma} onChange={e => {
                      setFormState({ ...formState, plataforma: e.target.value })
                    }} required={true} />
                    <label className="form-label" >PLATAFORMA</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="date" className="form-control form-control-lg" value={formState.lanzamiento} onChange={e => {
                      setFormState({ ...formState, lanzamiento: e.target.value })
                    }} required={true} />
                    <label className="form-label" >LANZAMIENTO</label>
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

  )
}

export default function AddEvento() {
  const [addE, { data, loading, error }] = useMutation(ADD_EVENTO);
  const [formState, setFormState] = React.useState({
    titulo: String,
    descripcion: String,
    imagen: String,
    plataforma: String,
    lanzamiento: Date
  });
  if (loading) return (<p>Cargando...</p>)
  if (error) return (<p>Error</p>)
  if (data) return (element(true, addE, formState, setFormState));
  return (element(false, addE, formState, setFormState));
}
