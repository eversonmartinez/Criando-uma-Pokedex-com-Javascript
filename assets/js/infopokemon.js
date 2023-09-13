const header = document.getElementById('header')
const photo = document.getElementById('photo')
const information = document.getElementById('information')
const content = document.getElementById('main')
const likeButton = document.getElementById('like')

function getIdByURL(){
    var loc = location.search.substring(1, location.search.length);
    var start= loc.indexOf('id=')!=-1 ? loc.indexOf('id=')+3 : -1
    var end= loc.indexOf('&')!=-1 ? loc.indexOf('&') : loc.length
    return loc.substring(start, end)
}

let pokemonId = getIdByURL()

function loadPokemonInfo(id){

    pokeApi.getPokemon(id).then((pokemon) => {
        content.classList.add(pokemon.type)
        header.innerHTML+= `
            <div class="identities">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            <div class="detail" id="">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>   
            </div> 
        `
        photo.innerHTML+= `
            <img class="image" src="${pokemon.photo}">
        `
        information.innerHTML+= `
            <div class="about">
                <table class="pokemon_fields">
                    <th class="title" colspan="2">About</th>
                    <tr>
                        <td class="data_definition">Base Happiness</td>
                        <td class="data">${pokemon.baseHappiness}</td>
                    </tr>
                    <tr>
                        <td class="data_definition">Height</td>
                        <td class="data">${pokemon.height}</td>
                    </tr>           
                    <tr>
                        <td class="data_definition">Weight</td>
                        <td class="data">${pokemon.weight}</td>
                    </tr>
                    <tr>
                        <td class="data_definition">Abilities</td>
                        <td class="data">${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</td>
                    </tr>
                </table>
            </div>
            <div class="breeding">
                <table class="pokemon_fields">
                    <th class="title" colspan="2">Breeding</th>
                    <tr>
                        <td class="data_definition">Growth Rate</td>
                        <td class="data">${pokemon.growthRate}</td>
                    </tr>
                    <tr>
                        <td class="data_definition">Egg Groups</td>
                        <td class="data">${pokemon.eggGroups.map((eggGroup) => `${eggGroup}`).join(', ')}</td>
                    </tr>           
                    <tr>
                        <td class="data_definition">Habitat</td>
                        <td class="data">${pokemon.habitat}</td>
                    </tr>
                </table>
            </div>
        `
    })
}

loadPokemonInfo(pokemonId)

likeButton.addEventListener('click', () => {
    console.log(likeButton.classList.contains('clicked'))
    if(likeButton.classList.contains('clicked'))
        likeButton.classList.remove('clicked')
    else    
        likeButton.classList.add('clicked')
})
