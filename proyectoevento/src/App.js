import './App.css';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Masonry from 'react-masonry-css';

const GET_EVENTOS = gql`
query getEVentos {
  getEventos {
    titulo,
    descripcion,
    imagen
    plataforma
    lanzamiento
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(GET_EVENTOS);
  if (loading) return (<p>Cargando...</p>)
  if (error) return (<p>Error!</p>)
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };
  var items = data.getEventos.map(({ titulo, descripcion, imagen, plataforma, lanzamiento }) => {
    return (
      <div className='card text-center'>
        <div className='card-body'>
          <h4 className='card-title'>{titulo}</h4>
          <h6 className="card-subtitle mb-2 text-muted">Lanzado el {lanzamiento}</h6>
          <h6 className='card-subtitle mb-2 text-muted'>Disponible en {plataforma}</h6>
          <p className='card-text justify-content-center'>{descripcion}</p>
          <img className='card-img-bottom w-100'
            src={process.env.PUBLIC_URL + "./static/images/" + imagen}
            alt="Card image" />

        </div>
      </div>
    )
  })

  const element = (
    <div className='container mt-5'>
      <Masonry breakpointCols={breakpointColumnsObj} rows={3} className="masonryGrid row" columnClassName='columnMasonry'>
        {items}
      </Masonry>
    </div>
  );
  return (element);
}

export default App;
