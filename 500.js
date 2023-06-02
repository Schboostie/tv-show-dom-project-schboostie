// Step 1: Complete Level 400 requirements

// Step 2: Create shows listing view
const showsListing = document.getElementById("shows-listing"); // Assuming there's an HTML element with id 'shows-listing'

// Function to display shows in the shows listing view
function displayShowsList(shows) {
  shows.forEach((show) => {
    const showItem = document.createElement("div");
    showItem.classList.add("show-item");

    // Display show information
    const showName = document.createElement("h3");
    showName.textContent = show.name;
    showItem.appendChild(showName);

    // Add click event listener to fetch and display episodes
    showName.addEventListener("click", () => {
      fetchEpisodes(show.id); // Assuming show object has an 'id' property
      showsListing.style.display = "none";
    });

    // Display other show details like image, summary, genres, status, rating, runtime, etc.
    // Add them as child elements to showItem

    showsListing.appendChild(showItem);
  });
}

// Step 3: Fetch episodes for a selected show
function fetchEpisodes(showId) {
  const episodesUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;

  // Fetch episodes using episodesUrl and display them
  fetch(episodesUrl)
    .then((response) => response.json())
    .then((episodes) => displayEpisodes(episodes))
    .catch((error) => console.log("Error fetching episodes:", error));
}

// Step 4: Hide shows listing and display episodes listing
const episodesListing = document.getElementById("episodes-listing"); // Assuming there's an HTML element with id 'episodes-listing'

function displayEpisodes(episodes) {
  episodesListing.style.display = "block";

  // Display episodes in the episodes listing view
  // You can use the existing code for episode search and selection
}

// Step 5: Add navigation link to return to shows listing
const returnToShowsListingLink = document.getElementById(
  "return-to-shows-listing"
); // Assuming there's an HTML element with id 'return-to-shows-listing'

returnToShowsListingLink.addEventListener("click", () => {
  showsListing.style.display = "block";
  episodesListing.style.display = "none";
});

// Step 6: Implement show search functionality
const searchInput = document.getElementById("search-input"); // Assuming there's an HTML input element with id 'search-input'
const searchButton = document.getElementById("search-button"); // Assuming there's an HTML button element with id 'search-button'

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.toLowerCase();

  // Filter shows based on search query
  const filteredShows = shows.filter(
    (show) =>
      show.name.toLowerCase().includes(searchQuery) ||
      show.genres.join(", ").toLowerCase().includes(searchQuery) ||
      show.summary.toLowerCase().includes(searchQuery)
  );

  // Clear existing shows from the listing
  showsListing.innerHTML = "";

  // Display filtered shows
  displayShowsList(filteredShows);
});

// Step 7: Ensure episode search and selection still work correctly

// Assuming you have existing code for episode search and selection that needs to be maintained

// Fetch the list of shows (using getAllShows() or any other method you have)
const shows = getAllShows(); // Assuming you have a function called getAllShows() that returns an array of shows

// Display the shows in the shows listing view
displayShowsList(shows);
