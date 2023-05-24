// Assuming you have a function getAllEpisodes() that returns an array of episode objects
let episodes = [];

// Function to pad a number with leading zeros to two digits
function padNumber(num) {
  return num.toString().padStart(2, "0");
}

// Function to generate the episode code in the format S02E07
function generateEpisodeCode(season, episode) {
  const paddedSeason = padNumber(season);
  const paddedEpisode = padNumber(episode);
  return `S${paddedSeason}E${paddedEpisode}`;
}

// Function to create an episode card element
function createEpisodeCard(episode) {
  const episodeCard = document.createElement("div");
  episodeCard.className = "episode-card";

  const episodeName = document.createElement("h2");
  episodeName.textContent = episode.name;
  episodeCard.appendChild(episodeName);

  const episodeCode = generateEpisodeCode(episode.season, episode.number);
  const episodeInfo = document.createElement("p");
  episodeInfo.textContent = `Episode Code: ${episodeCode}`;
  episodeCard.appendChild(episodeInfo);

  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  episodeImage.alt = "Episode Image";
  episodeCard.appendChild(episodeImage);

  const episodeSummary = document.createElement("p");
  episodeSummary.textContent = episode.summary;
  episodeCard.appendChild(episodeSummary);

  const episodeLink = document.createElement("a");
  episodeLink.href = episode.url;
  episodeLink.textContent = "View on TVMaze.com";
  episodeCard.appendChild(episodeLink);

  return episodeCard;
}

// Function to display episodes based on search input
function displayEpisodes(searchTerm) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = ""; // Clear the previous results

  let matchingEpisodes;
  if (searchTerm.trim() === "") {
    matchingEpisodes = episodes; // Show all episodes if search box is cleared
  } else {
    const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive search regex
    matchingEpisodes = episodes.filter(
      (episode) =>
        searchRegex.test(episode.name) || searchRegex.test(episode.summary)
    );
  }

  matchingEpisodes.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElement.appendChild(episodeCard);
  });

  const searchCount = document.getElementById("search-count");
  searchCount.textContent = `Episodes found: ${matchingEpisodes.length}`;
}

// Function to handle search input changes
function handleSearchInput() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim();
  displayEpisodes(searchTerm);
}

// Function to initialize the app
function initializeApp() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearchInput);

  episodes = getAllEpisodes(); // Fetch episodes from API or assign them manually
  displayEpisodes("");
}

// Call the initializeApp() function to populate the page with episodes and set up the search functionality
initializeApp();
