


async function fetchData() {
    
    try {
    
        
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase()
        const imgElementPokemonSprite = document.getElementById("pokemonSprite")
        const pElementName = document.getElementById("pName")
        const pElementId = document.getElementById("pId")
        const pElementType = document.getElementById("pType")

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json()

        const pokemonSprite = data.sprites.front_default
        const fetchedPokemonName = data.name
        const fetchedPokemonId = data.id
        const fetchedPokemonTypes = data.types.map(t => t.type.name);

        

        console.log(fetchedPokemonTypes)
        
        imgElementPokemonSprite.src = pokemonSprite
        pElementName.innerText = fetchedPokemonName
        pElementId.innerText = fetchedPokemonId

        const typeContainer = document.querySelector(".pokemonTypes");
        typeContainer.innerHTML = ""; 

        fetchedPokemonTypes.forEach(type => 
            {
            const typeElement = document.createElement("p");
            typeElement.classList.add("pType");
            typeElement.innerText = type;
            typeContainer.appendChild(typeElement);
        });


                


        


    } catch (error) {
        console.error(error)
    }

}