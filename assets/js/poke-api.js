
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    // pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // pokemon.type = pokemon.types.get(0)

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => { //atribuindo valores default
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)   //fetch para a listagem principal dos pokemons
    .then((response) => response.json())    //obtendo o json da resposta (body)
    .then((jsonBody) => jsonBody.results)   //obtendo apenasa part do json que contém o nome dos pokémons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //convertendo os pokémons para uma lista com os detalhes dos pokemons
    .then((detailRequests) => Promise.all(detailRequests))  
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error))
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch('https://pokeapi.co/api/v2/pokemon/4')
// ]).then((results) => {
//     console.log(results)
// })