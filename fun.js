// Get a reference to the root element where the cards will be displayed
const rootElement = document.getElementById("root");

// Fetch data from the API
fetch("https://example.com/api/data")
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data and generate cards
    data.forEach((item) => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Create elements for the card content
      const title = document.createElement("h2");
      title.textContent = item.title;

      const description = document.createElement("p");
      description.textContent = item.description;

      // Append the content elements to the card
      card.appendChild(title);
      card.appendChild(description);

      // Append the card to the root element
      rootElement.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
