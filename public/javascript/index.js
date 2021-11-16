const charactersAPI = new APIHandler("https://minions-api.herokuapp.com/");
const cloneDiv = document.querySelector(".character-info").cloneNode(true)

function showCharacter(character) {

  cloneDiv.querySelector(".name").innerHTML += `<span>${character.data.name}</span>`
  cloneDiv.querySelector(".occupation").innerHTML += `<span>${character.data.occupation}</span>`
  cloneDiv.querySelector(".cartoon").innerHTML += `<span>${character.data.cartoon}</span>`
  cloneDiv.querySelector(".weapon").innerHTML += `<span>${character.data.weapon}</span>`

  document.querySelector(".characters-container").appendChild(cloneDiv)
}

function loadCharactersFromAPI() {
  charactersAPI.getFullList()
    .then(all => {
      all.data.forEach(elem => {
        let cloneDiv = document.querySelector(".character-info").cloneNode(true)

        cloneDiv.querySelector(".name").innerHTML += `<span>${elem.name}</span>`
        cloneDiv.querySelector(".occupation").innerHTML += `<span>${elem.occupation}`
        cloneDiv.querySelector(".cartoon").innerHTML += `<span>${elem.cartoon}`
        cloneDiv.querySelector(".weapon").innerHTML += `<span>${elem.weapon}`

        document.querySelector(".characters-container").appendChild(cloneDiv)
      })
    })
    .catch(err => console.log(err))
}


window.addEventListener('load', () => {
  
  document.getElementById('fetch-all').addEventListener('click', function (e) {
    e.preventDefault();
    loadCharactersFromAPI()
  });

  document.getElementById('fetch-one').addEventListener('click', function (e) {
    e.preventDefault();
    const id = document.querySelector("#id").value

    charactersAPI.getOneRegister(id)
    .then(character => {
      showCharacter(character)
      console.log("esta es mi funcion id y este es el nombre del caracter ", character.data.name)
    })
    .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (e) {
    
    const id = document.querySelector("#id-delete").value
    charactersAPI.getOneRegister(id)
    .then(character => {
      
      const name = character.data.name
      const occupation = character.data.occupation
      const cartoon = character.data.cartoon
      const weapon = character.data.weapon

      const info = { name, occupation, cartoon, weapon};

      console.log("Esto es mi id y mi info antes de meterlas", info)

      charactersAPI.deleteOneRegister(id, info)
        .then((character) => {
          showCharacter(character)
          console.log(character)})
        .catch(err => console.log(err))

    })
  

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
      const buttonChangeColor = document.querySelector("#edit-character-form button[id='send-data']")

      const id = document.querySelector("#edit-character-form input[name='chr-id']").value
      const name = document.querySelector("#edit-character-form input[name='name']").value
      const occupation = document.querySelector("#edit-character-form input[name='occupation']").value
      const weapon = document.querySelector("#edit-character-form input[name='weapon']").value

      const cartoon = document.querySelector("#edit-character-form input[name='cartoon']").checked;
      cartoon ? true : false;
  

      const info = {name, occupation, cartoon, weapon}


      charactersAPI.updateOneRegister(id, info)
      .then((character) => {
        showCharacter(character)
        buttonChangeColor.classList.add("active")})
      .catch(err => { 
        buttonChangeColor.classList.add("disactive")
        console.log(err)})
    })

  document.getElementById('new-character-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const buttonChangeColor = document.querySelector("#new-character-form button[id='send-data']")

    const name = document.getElementById("create-name").value;
    const occupation = document.getElementById("create-occupation").value;
    const weapon = document.getElementById("create-weapon").value;

    const cartoon = document.getElementById("checkbox-create").checked;
    cartoon ? true : false;


    const info = { name, occupation, cartoon, weapon}
    
    charactersAPI.createOneRegister(info)
    .then((character) => {
      showCharacter(character)
      buttonChangeColor.classList.add("active")
      console.log(character)})
    .catch(err => {
      buttonChangeColor.classList.add("disactive")
      console.log(err)})
});

});
