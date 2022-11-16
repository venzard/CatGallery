const container = document.querySelector("main");
const createCard = function(cat, parent){
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("div");
    img.className = "card-pic";
    if (cat.img_link){
        img.style.backgroundImage = `url(${cat.img_link})`;
    } else {
        img.style.backgroundImage = "url(images/cat.png)";
        img.style.backgroundSize = "contain";
        img.style.backgroundColor = "transparent";
    }
    

    const name = document.createElement("h3");
    name.innerText = cat.name;

    card.append(img, name);
    parent.append(card);
}

// createCard({"name": "Элли",
// "img_link": "https://www.friendforpet.ru/api/sites/default/files/2022-01/1_25.jpg"}, container)

fetch("https://sb-cats.herokuapp.com/api/2/venzard/show")
    .then(res => res.json())
    .then(result => {
        console.log(result);
        if (result.message === "ok") {
            console.log(result.data[0]);
            result.data.forEach(element => {createCard(element, container);
            });
        }
    })

const cat = {
    id:3,
    name: "Том",
    img_link: "https://documents.infourok.ru/b15649ae-78ff-40d2-810f-49e07e465ac8/0/image001.png"
}

const addCat = function(){
    fetch("https://sb-cats.herokuapp.com/api/2/venzard/add",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat),
    })
        .then(res => res.json())
        .then(data => {
            if (data.message === "ok"){
                createCard(cat, container);
            }
        })
}

document.querySelector("#add").addEventListener("click", function(e){
    e.preventDefault();
    addCat();
})