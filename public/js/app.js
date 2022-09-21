console.log("Client side javascript!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const successMessage = document.querySelector(".success");
const errorMessage = document.querySelector(".error");
const loader = document.querySelector(".loader");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;
  successMessage.textContent = "";
  errorMessage.textContent = "";
  loader.textContent = "Loading ...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        loader.textContent = "";

        if (data.error) {
          console.log(data.error);
          successMessage.textContent = "";
          errorMessage.textContent = data.error;
        } else {
          console.log(data);
          errorMessage.textContent = "";
          successMessage.textContent = `Current temperature in ${data.location} is ${data.temperature} degrees. It feels like ${data.feelsLike} degrees.`;
        }
      });
    }
  );
});
