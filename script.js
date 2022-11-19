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

    // let like = "";
	// like.onclick = () => {
	// 	//....
	// 	// cat.id
	// }

    card.append(img, name);
    parent.append(card);
}

const popupBlock = document.querySelector(".popup-wrapper");

popupBlock.querySelector(".popup__close").addEventListener("click", function(){
    popupBlock.classList.remove("active");
})

document.querySelector("#add").addEventListener("click", function(e){
    e.preventDefault();
    popupBlock.classList.add("active");
})

const addForm = document.forms.addForm;

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

// const cat = {
//     id:5,
//     name: "Томат",
//     img_link: "https://documents.infourok.ru/b15649ae-78ff-40d2-810f-49e07e465ac8/0/image001.png"
// }

const addCat = function(cat){
    fetch("https://sb-cats.herokuapp.com/api/2/venzard/add",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === "ok"){
                createCard(cat, container);
                addForm.reset;
                popupBlock.classList.remove("active");
            }
        })
}


addForm.addEventListener("submit", function(e){
    e.preventDefault();
    let body = {};

    for(let i = 0; i < addForm.elements.length; i++){
        let el = addForm.elements[i];
        console.log(el);
        if (el.name){
            body[el.name] = el.name === "favourite" ? el.checked : el.value
        }
    }

    console.log("hey!")
    addCat(body, addForm);
})