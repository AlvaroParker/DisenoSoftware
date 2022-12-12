const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const Evento = require('./models/evento');


mongoose.connect("mongodb+srv://root:admin123@resumenesuai.hw7ywcq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// template string
const typeDefs = gql`
type Evento{
  id: ID!
  titulo: String!
  descripcion: String!
  imagen: String!
}
input EventoInput{
  titulo: String!
  descripcion: String!
  imagen: String!
}
type Query {
  getEventos: [Evento]
}
type Mutation {
  addEvento(input: EventoInput): Evento
}
`;

const resolvers = {
  Query: {
    async getEventos(obj) {
      const eventos = await Evento.find()
      return eventos;
    }
  },
  Mutation: {
    async addEvento(obj, { input }) {
      const evento = new Evento(input);
      await evento.save();
      return evento;
    }
  }
}

let apolloServer = null;

const corsOptions = {
  origin: 'http://localhost:8090',
  credentials: false
}

async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers, corsOptions });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
}

startServer();

const app = express();
app.use(cors());
app.listen(8090, function() {
  console.log("Servidor iniciado");
})
