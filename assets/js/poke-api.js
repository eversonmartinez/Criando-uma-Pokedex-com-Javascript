
const pokeApi = {}

// function getSpeciesInfoFromPokeDetail(urlSpecies){
//     return fetch(urlSpecies).then((response) => response.json())
// }

function addMoreDetailsToPokemon(pokemon, pokeDetail){
    const specieInfo = getSpeciesInfoFromPokeDetail(pokeDetail.species.url)
    fetch(pokeDetail.species.url)
    .then((response) => response.json())
    .then((json) => {
        pokemon.eggGroups = specieInfo.egg_groups.map((eggSlot) => eggSlot.name)
        pokemon.habitat = specieInfo.habitat.name
    })
    
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    
    //se der algum problema é pq a função esta retornando o pokemon antes de terminar os fetchs logo a cima
    return pokemon
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    // pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // pokemon.type = pokemon.types.get(0)

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

    // pokemon.height = pokeDetail.height
    // pokemon.weight = pokeDetail.weight
    // pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    
    // const specieInfo = getSpeciesInfoFromPokeDetail(pokeDetail.species.url).then(pokemon.eggGroups = specieInfo.egg_groups.map((eggSlot) => eggSlot.name))
    
    
    // pokemon.habitat = specieInfo.habitat.name

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

// Adicionei esse método para quando o objetivo for pegar informações de apenas 1 pokémon, mas informações detalhadas.
pokeApi.getPokemon = (pokemonId) => {
    const url='https://pokeapi.co/api/v2/pokemon/${id}/'
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemon) => {
        detailedPokemon = pokeApi.getPokemonDetail(pokemon)
        detailedPokemon = addMoreDetailsToPokemon(detailedPokemon, pokemon)
        return pokemon
    })
    .then((detailRequests) => Promise.all(detailRequests))  
    .then((pokemonsDetails) => pokemonsDetails)
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch('https://pokeapi.co/api/v2/pokemon/4')
// ]).then((results) => {
//     console.log(results)
// })