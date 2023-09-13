
const pokeApi = {}


function addMoreDetailsToPokemon(pokemon, pokeDetail){
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    return fetch(pokeDetail.species.url).then((response) => response.json()).then((specieInfo) => {
        pokemon.baseHappiness = specieInfo.base_happiness
        pokemon.growthRate = specieInfo.growth_rate.name
        pokemon.habitat=specieInfo.habitat.name
        pokemon.eggGroups = specieInfo.egg_groups.map((eggSlot) => eggSlot.name)
        return pokemon})

}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

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
pokeApi.getPokemon = (pokemonId = 1) => {
    const url=`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
        detailedPokemon = convertPokeApiDetailToPokemon(pokemon)
        detailedPokemon = addMoreDetailsToPokemon(detailedPokemon, pokemon)
        return detailedPokemon
    })
}
