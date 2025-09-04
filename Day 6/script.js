
const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#newquote");

const API_KEY = "Vjz4AV4gO27Zn9uimyDgaQ==0NLJQ2wau8VDCADe";
const API_URL = "https://api.api-ninjas.com/v1/quotes";

function getQuote() {
  fetch(API_URL, {
    headers: {
      "X-Api-Key": API_KEY
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      return response.json();
    })
    .then(data => {
      const quoteObj = data[0];
      quoteElement.textContent = `"${quoteObj.quote}"`;
      authorElement.textContent = `- ${quoteObj.author}`;
    })
    .catch(error => {
      console.log(error);
      quoteElement.textContent = "Oops! Could not fetch a quote.";
      authorElement.textContent = "";
    });
}

newQuoteBtn.addEventListener("click", getQuote);

getQuote();




 