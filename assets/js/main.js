function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type">grass</li>
                    <li class="type">poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>

        </li>
    `
}

// console.log( document.getElementById('pokemonList'));
const pokemonList = document.getElementById('pokemonList');
// pokemonList.appendChild(`<li>Teste</li>`)
// pokemonList.innerHTML += '<li>Teste</li>'

    pokeApi.getPokemons().then((pokemons = []) => {     //garante que por default será uma lista vazia

        // const newList = pokemons.map((value, index, array) => {
        const newList = pokemons.map((pokemon) => {
            return convertPokemonToLi(pokemon)
        })
        const newHtml = newList.join('')

        pokemonList.innerHTML += newHtml


        //    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')



        // const listItems = []

        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     listItems.push(convertPokemonToLi(pokemon))
        // }

        // console.log(listItems)
        // pokemonList.innerHTML += listItems
    })
