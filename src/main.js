import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Fastify from 'fastify'
import fs from 'fs'

import Pokemon from './models/Pokemon.js'
import PokeDex from './store/Pokedex.js'

//-----------------------------------------------------
// Create an instance of pokedex and load it 
// with some pokemons
//-----------------------------------------------------
let pokedex = new PokeDex()
let data = fs.readFileSync(path.join(__dirname, "./store/data.json"), {encoding: "utf-8"})
let pokemons = JSON.parse(data)
pokemons.forEach((pokemon)=>{
  pokedex.addPokemon(pokemon)
})

//-----------------------------------------------------
// API route handlers
//-----------------------------------------------------

const fastify = Fastify({
  logger: true
})

// serve index.html
fastify.get('/', async function handler (request, reply) {
  const stream = fs.createReadStream(path.join(__dirname, "./index.html"), 'utf8')
  reply.header('Content-Type', 'text/html; charset=utf-8')
  return reply.send(stream)
})

// serve index.html
fastify.get('/addPokemon', async function handler (request, reply) {
  const stream = fs.createReadStream(path.join(__dirname, "./addPokemon.html"), 'utf8')
  reply.header('Content-Type', 'text/html; charset=utf-8')
  return reply.send(stream)
})

// list pokemons
fastify.get('/api/pokedex/list', async function handler (request, reply) {
  // todo: handle filters, e.g. list by pokemon type
  return pokedex.listPokemons()
})

// add a pokemon to the pokedex
fastify.post('/api/pokedex/add', async function handler (request, reply) {

  // get the pokemon info from request
  let pokemon = request.body

  // todo: require - index, name, at least 1 type

  // add pokemon
  pokedex.addPokemon(pokemon)

  return {
    success: true,
    pokemon: pokedex.getPokemonByName(pokemon.name)
  }

})


// get a pokemon
fastify.get('/api/pokedex/:id', async function handler (request, reply) {
  const { id } = request.params;
  let pokemon = pokedex.getPokemon(id)
  if(pokemon){
    return pokemon
  } else {
    reply.code(404)
    reply.send({
      "error": "Pokemon not found"
    })
  }
})

// update a pokemon to the pokedex
fastify.post('/api/pokedex/:id/update', async function handler (request, reply) {
  return pokedex.listPokemons()
})

// delete a pokemon from the pokedex
fastify.post('/api/pokedex/:id/delete', async function handler (request, reply) {
  const { id } = request.params;
  return pokedex.deletePokemon(id)
})

//-----------------------------------------------------
// Run the server
//-----------------------------------------------------
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}