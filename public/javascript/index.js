const charactersAPI = new APIHandler("https://minions-api.herokuapp.com/");


window.addEventListener('load', () => {
  
  function loadCharactersFromAPI() {
    charactersAPI.getFullList()
      .then(all => {
        all.data.forEach(elem => {
          let cloneDiv = document.querySelector(".character-info").cloneNode(true)

          cloneDiv.querySelector(".name").innerHTML += `${elem.name}`
          cloneDiv.querySelector(".occupation").innerHTML += `${elem.occupation}`
          cloneDiv.querySelector(".cartoon").innerHTML += `${elem.cartoon}`
          cloneDiv.querySelector(".weapon").innerHTML += `${elem.weapon}`

          document.querySelector(".characters-container").appendChild(cloneDiv)
        })
      })
      .catch(err => console.log(err))
  }


  document.getElementById('fetch-all').addEventListener('click', function (e) {
    e.preventDefault();
    loadCharactersFromAPI()

  });

  document.getElementById('fetch-one').addEventListener('click', function (e) {
    e.preventDefault();
    const id = document.querySelector("#id").value

    charactersAPI.getOneRegister(id)
    .then(character => {
      let cloneDiv = document.querySelector(".character-info").cloneNode(true)

          cloneDiv.querySelector(".name").innerHTML += `${character.data.name}`
          cloneDiv.querySelector(".occupation").innerHTML += `${character.data.occupation}`
          cloneDiv.querySelector(".cartoon").innerHTML += `${character.data.cartoon}`
          cloneDiv.querySelector(".weapon").innerHTML += `${character.data.weapon}`

          document.querySelector(".characters-container").appendChild(cloneDiv)

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
      .then((elem) => {console.log(elem)})
      .catch(err => console.log(err))

    })
  

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (e) {
    e.preventDefault();

      const id = document.querySelector("#edit-character-form input[name='chr-id']").value
      const name = document.querySelector("#edit-character-form input[name='name']").value
      const occupation = document.querySelector("#edit-character-form input[name='occupation']").value
      const weapon = document.querySelector("#edit-character-form input[name='weapon']").value

      const info = {name, occupation, weapon}

      const buttonChangeColor = document.querySelector("#edit-character-form button[id='send-data']")

      charactersAPI.updateOneRegister(id, info)
      .then(() => {
        buttonChangeColor.classList.add("active")})
      .catch(err => { 
        buttonChangeColor.classList.add("disactive")
        console.log(err)})
    })



  document.getElementById('new-character-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById("create-name").value;
    const occupation = document.getElementById("create-occupation").value;
    const weapon = document.getElementById("create-weapon").value;

    const cartoon = document.getElementById("checkbox-create").checked;

    const buttonChangeColor = document.querySelector("#new-character-form button[id='send-data']")


    const info = { name, occupation, weapon}

    console.log(info)

    charactersAPI.createOneRegister(info)
    .then((elem) => {
      buttonChangeColor.classList.add("active")
      console.log(elem)})
    .catch(err => {
      buttonChangeColor.classList.add("disactive")
      console.log(err)})
});

});
