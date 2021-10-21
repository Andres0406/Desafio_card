console.log("holaaaaa");

//esperamos a que se cargue primero el html y despues el js
document.addEventListener("DOMContentLoaded",()=>{
    const random = getRandomInt(1,151);
    fetchData(random);
});
//funcion que devulve un numero ramdon con un limite
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//realizamos la funcion que nos traiga la api
async function fetchData(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);//traemos la url de la api
        const data = await res.json();//transformamos en json
        console.log(data);
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat
        }
        pintarCarta(pokemon);
    } catch (error) {
        console.log(error);
    }
}
//funcion pintar carta

function pintarCarta(pokemon){
    //console.log(pokemon);
    const flex = document.querySelector('.flex');//seleccionamos en donde ira el tamplate
    const template = document.querySelector('#template-carta').content;//capturamos el template
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();//algo invisible que solo se genera en js
    clone.querySelector('.carta-cuerpo-img').setAttribute("src",pokemon.img);//asignamos los atributos a la imagen que fue llamado por el clon
    clone.querySelector('.carta-cuerpo-titulo').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.carta-cuerpo-texto').textContent = pokemon.experiencia + "Exp";
    clone.querySelectorAll('.carta-pie-social h3')[0].textContent = pokemon.ataque + "K";
    clone.querySelectorAll('.carta-pie-social h3')[1].textContent = pokemon.especial + "K";
    clone.querySelectorAll('.carta-pie-social h3')[2].textContent = pokemon.defensa + "K";
    
    
    
    
    
    fragment.appendChild(clone);//nuestro fragmento estara nuestro codigo de la imagen
    flex.appendChild(fragment);







}