document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const key =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwZWJlMjkxM2Y2NTAwMThkMDhlZmMiLCJpYXQiOjE3MDYxMDEyNjIsImV4cCI6MTcwNzMxMDg2Mn0.POcO6BdWyyHLoLpbbbY9T4QffwAqkYCFvbv2Dx2ypQQ";

  if (id) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "GET",
      headers: {
        Authorization: key,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        displayBookDetails(data);
      })
      .catch((error) => {
        console.error("Errore", error);
      });
  }
});

function displayBookDetails(book) {
  const bookDetails = document.getElementById("details");

  bookDetails.innerHTML = `
      <img src="${book.imageUrl}"  style="max-width: 20%;">
         <div>
         
           <h2>${book.name}</h2>
           <h2>Categoria: ${book.description}</h2>
           <h2>Prezzo: ${book.price} $</h2>
          
        </div>  
        `;
}
