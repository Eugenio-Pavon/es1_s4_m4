const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI4MTNjNTg5OWIxZDAwMTlhNDFjMzUiLCJpYXQiOjE3MDY1NjI1MDEsImV4cCI6MTcwNzc3MjEwMX0.OrBWO4Cfrchyht0UX1UJo2FQWV_kDhbYxYhE8ez7dmQ";
async function aggiungiCard() {
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let brand = document.getElementById("brand").value;
  let imageUrl = document.getElementById("imageUrl").value;
  let price = document.getElementById("price").value;

  const data = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price,
  };

  try {
    const rispostaPost = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
      body: JSON.stringify(data),
    });

    const risultatoPost = await rispostaPost.json();
    console.log("Risultato POST:", risultatoPost);
    effettuaRichiestaGet();
  } catch (errore) {
    console.error("Errore durante la richiesta POST:", errore);
  }
}
aggiungiCard();
async function effettuaRichiestaGet() {
  try {
    // Ora, effettua una richiesta GET
    const rispostaGet = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: key,
      },
    });

    // Supponendo che la risposta sia JSON, è possibile analizzarla
    const risultatoGet = await rispostaGet.json();
    console.log("Risultato GET:", risultatoGet);
    let creaCard = function () {
      document.querySelector(".row").innerHTML = "";
      risultatoGet.forEach(function (elementi) {
        let id = elementi._id;
        let name = elementi.name;
        let decription = elementi.description;
        let brand = elementi.brand;
        let imageUrl = elementi.imageUrl;
        let price = elementi.price;
        let row = document.querySelector(".row");
        row.innerHTML += `
        <div class="col-12 col-lg-3 col-md-4 col-sm-6 p-1">
         <div class="card" >
            <img src="${imageUrl}" class="card-img-top">
          <div class="card-body">
             <p class="card-text">${name}</p>
             <p class="card-text">${decription}</p>
             <p class="card-text">${brand}</p>
             <p> ID:${id}</p>
             <h4>PREZZO: ${price} $ </h4>
             <button class="dettagli-btn">  <a href="dettagli.html?id=${elementi._id}">Dettagli</a> </button>
          </div>
         </div>
         </div>`;
      });
    };
    creaCard();
  } catch (errore) {
    console.error("Errore durante la richiesta GET:", errore);
  }
}

effettuaRichiestaGet();

let modificaCard = async () => {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let brand = document.getElementById("brand").value;
  let imageUrl = document.getElementById("imageUrl").value;
  let price = document.getElementById("price").value;

  const data = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price,
  };
  try {
    const rispostaPost = await fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
      body: JSON.stringify(data),
    });

    const risultatoPost = await rispostaPost.json();
    console.log("Risultato POST:", risultatoPost);
    location.reload();
  } catch (errore) {
    console.error("Errore durante la richiesta POST:", errore);
  }
};

let eliminaCard = async () => {
  let id = document.getElementById("id").value;
  let btnElimina = document.querySelector(".elimina");

  try {
    const rispostaPost = await fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });

    const risultatoPost = await rispostaPost.json();
    console.log("Risultato POST:", risultatoPost);
  } catch (errore) {
    console.error("Errore durante la richiesta POST:", errore);
  }
  location.reload();
};
