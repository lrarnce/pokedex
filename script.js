async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const imgElementPokemonSprite = document.getElementById("pokemonSprite");
    const pElementName = document.getElementById("pName");
    const pElementId = document.getElementById("pId");
    const pElementDescription = document.getElementById("pDescription");

    if (pokemonName == '') {
        alert("Please type the name of the Pokemon.");
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
        alert("Pokémon not found! Please try again.");
        //throw new Error("Could not fetch resource");
     
    }

    const data = await response.json();

    const pokemonSprite = data.sprites.front_default;
    const fetchedPokemonName = data.name;
    const fetchedPokemonId = data.id;
    const fetchedPokemonTypes = data.types.map(t => t.type.name);

    const responseDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${fetchedPokemonId}`);

    if (!responseDescription.ok) {
        alert("Pokémon not found! Please try again.");
        //throw new Error("Could not fetch resource");
      
    }

    const dataDescription = await responseDescription.json();
    const fetchedDescription = dataDescription.flavor_text_entries;
    const englishEntry = fetchedDescription.find(entry => entry.language.name === "en");

    let flavorText = "No description available";
    if (englishEntry) {
      flavorText = englishEntry.flavor_text.replace(/\n|\f/g, " ");
    }

    imgElementPokemonSprite.src = pokemonSprite;
    pElementName.innerText = fetchedPokemonName.toUpperCase();
    pElementId.innerText = `No. ${fetchedPokemonId}`;
    pElementDescription.innerText = flavorText;

    const typeContainer = document.querySelector(".pokemonTypes");
    typeContainer.innerHTML = ""; // clear before adding new

    fetchedPokemonTypes.forEach(type => {
      const typeElement = document.createElement("p");
      typeElement.classList.add("pType", type.toLowerCase()); // add type name as class
      typeElement.innerText = type;
      typeContainer.appendChild(typeElement);
    });
  } catch (error) {
    console.error(error);
  }
}

const form = document.getElementById("pokemonForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stops form refresh
  fetchData();
});
