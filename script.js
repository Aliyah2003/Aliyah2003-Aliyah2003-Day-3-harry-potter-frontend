const main=document.getElementById('main')
const character=document.querySelector('.character')
const searchInput=document.getElementById('search')

let characterArray=[]

searchInput.addEventListener("input",(e)=>{
    const value=e.target.value.toLowerCase();
    console.log(value)
    characterArray.forEach((character)=>{
        const isVisible=character.name.toLowerCase().
        includes(value);
        character.element.classList.toggle("hide",
        !isVisible);
    })
})

getCharacter()

function getCharacter(){
    fetch("https://day-2-add-post-delete-methods-in-harry.onrender.com/characters")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        showCharacter(data);
    })
}

function showCharacter(data){
     main.innerHTML='';

     characterArray=data.map(character=>{
         const {name, image}=character;

     const characterEl=document.createElement('div');
     characterEl.classList.add('character');
     characterEl.classList.add('front');


     characterEl.innerHTML=
     `<img src=${image}  alt=${name} onerror="handleError
     (this);"/>
     <div class="character-info">
     <h3>${name}</h3>
     </div>`

     const characterBack=document.createElement('div');
     characterBack.classList.add('character');
     characterBack.classList.add('back');

     characterBack.innerHTML=`<h3>Back of the card</h3>`

     main.appendChild(characterEl);
     main.appendChild(characterBack);
     return{
         name:character.name,
         element:characterEl
     }


})
}
function handleError(imgElement){
    imgElement.src="images/wizard-icon.jpeg"
}
