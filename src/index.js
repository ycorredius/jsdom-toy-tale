// let divCollect = document.querySelector('#toy-collection');
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetchToys().then(toys => {
    toys.forEach(toy =>{
      loadToys(toy)
    })
  })
})


function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
}
function likes(event){
  event.preventDefault()
  let more = parseInt(event.target.previousElementSibling.innerText)+1

  fetch(`http://localhost:3000/toys/${event.target.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      likes: more
    })
  })
}
function loadToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src',toy.image)
  img.setAttribute('class','toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let likeBtn = document.createElement('button')
  likeBtn.setAttribute('class','like-btn')
  likeBtn.setAttribute('id', toy.id)
  likeBtn.innerText = "like"
  likeBtn.addEventListener('click',(e) =>{
    console.log(e.target.dataset);
    likes(e)
  })

  let cardDiv = document.createElement('div')
  cardDiv.setAttribute('class','card')
  cardDiv.appendChild(h2)
  cardDiv.appendChild(img)
  cardDiv.appendChild(p)
  cardDiv.appendChild(likeBtn)
  document.querySelector('#toy-collection').appendChild(cardDiv)
}

function postToys(toyData){
  return fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then((obj) => {
    let newToy = loadToys(obj)
    divCollect.append(newToy)
  })

  
}

