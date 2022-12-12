import './App.css';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const GET_EVENTOS = gql`
query getEVentos {
  getEventos {
    titulo,
    descripcion,
    imagen
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(GET_EVENTOS);
  if (loading) return (<p>Cargando...</p>)
  if (error) return (<p>Error!</p>)
  return (
    <div className='container'>
      <div className='row'>
        {
          data.getEventos.map(({ titulo, descripcion, imagen }) => {
            return (
              <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='card-title'>{titulo}</h4>
                    <p className='card-text'>{descripcion}</p>
                    <img className='card-img-bottom w-100'
                      src={process.env.PUBLIC_URL + "./static/images/" + imagen}
                      alt="Card image" />

                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
