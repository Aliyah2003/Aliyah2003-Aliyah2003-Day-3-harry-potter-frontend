const main=document.getElementById('main')
const character=document.querySelector('.character')
const searchInput=document.getElementById('search')

let characterArray = [];

// Event listener for the search input
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    characterArray.forEach((characterObj) => {
        const isVisible = characterObj.name.toLowerCase().includes(value);
        characterObj.element.classList.toggle("hide", !isVisible); // Toggle visibility based on search
    });
});


// Fetch characters from API
getCharacters();

function getCharacters() {
    fetch("https://potterhead-api.vercel.app/api/characters")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showCharacters(data);
        })
        .catch(error => console.error('Error fetching characters:', error)); // Handle fetch errors
}

function showCharacters(data) {
    main.innerHTML = '';

    characterArray = data.map(character => {
        const { name, image, house, species, patronus } = character;

       // Create character container
       const characterEl = document.createElement('div');
       characterEl.classList.add('character');

       // Inner wrapper for 3D rotation
       const innerDiv = document.createElement('div');
       innerDiv.classList.add('inner');

       // Front of the card
       const front = document.createElement('div');
       front.classList.add('front');
       front.innerHTML = `
           <img src="${image}" alt="${name}" onerror="handleError(this);"/>
           <div class="character-info">
               <h3>${name}</h3>
           </div>
       `;
// Back of the card
const back = document.createElement('div');
back.classList.add('back');
back.innerHTML = `
    <h1>${name}</h1>
    <p>House: ${house || 'Unknown'}</p>
    <p>Species: ${species || 'Unknown'}</p>
    <p>Patronus: ${patronus || 'None'}</p>
`;

// Append front and back to inner div
innerDiv.appendChild(front);
innerDiv.appendChild(back);

// Append inner div to character container
characterEl.appendChild(innerDiv);

// Append character card to the main container
main.appendChild(characterEl);

return {
    name: character.name,
    element: characterEl
        }
    })
}

function handleError(imgElement) {
    imgElement.src = "images/wizard-icon.jpeg"; // Fallback image
}
