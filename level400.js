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

// Function to display all episodes on the page
function displayEpisodes(episodes) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = ""; // Clear previous episodes

  episodes.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElement.appendChild(episodeCard);
  });
}

// Function to create select options for all episodes
function createSelectOptions(episodes) {
  const selectElement = document.getElementById("episode-select");

  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${generateEpisodeCode(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    selectElement.appendChild(option);
  });
}

// Function to handle select change event
function handleSelectChange() {
  const selectElement = document.getElementById("episode-select");
  const selectedEpisodeId = selectElement.value;

  if (selectedEpisodeId) {
    const selectedEpisode = getAllEpisodes().find(
      (episode) => episode.id === parseInt(selectedEpisodeId)
    );
    displayEpisodes([selectedEpisode]);
  } else {
    const episodes = getAllEpisodes();
    displayEpisodes(episodes);
  }
}

// Function to handle search input changes
function handleSearchInput() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim().toLowerCase();
  const allEpisodes = getAllEpisodes();

  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.summary.toLowerCase().includes(searchTerm) ||
      episode.name.toLowerCase().includes(searchTerm)
  );

  displayEpisodes(filteredEpisodes);
  displaySearchCount(filteredEpisodes.length);
}

// Function to display the count of matching episodes
function displaySearchCount(count) {
  const searchCountElement = document.getElementById("search-count");
  searchCountElement.textContent = `Found ${count} episode(s)`;
}

////////////////////////////////////
// Function to fetch episodes for a specific show
async function fetchEpisodesForShow(showId) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );
    const episodes = await response.json();
    return episodes;
  } catch (error) {
    console.log("Error fetching episodes:", error);
    return [];
  }
}

// Function to fetch all shows
async function fetchAllShows() {
  try {
    const response = await fetch("shows.js");
    const shows = await response.json();
    return shows;
  } catch (error) {
    console.log("Error fetching shows:", error);
    return [];
  }
}

// Function to populate the show select options
function populateShowSelectOptions(shows) {
  const showSelect = document.getElementById("show-select");

  shows.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  ); // Sort shows alphabetically, case-insensitive

  shows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
}

// Function to handle show select change event
async function handleShowSelectChange() {
  const showSelect = document.getElementById("show-select");
  const selectedShowId = showSelect.value;

  if (selectedShowId) {
    const episodes = await fetchEpisodesForShow(selectedShowId);
    displayEpisodes(episodes);
    createSelectOptions(episodes);
  } else {
    const allEpisodes = getAllEpisodes();
    displayEpisodes(allEpisodes);
    createSelectOptions(allEpisodes);
  }
}

// Function to initialize the page
async function initializePage() {
  const allEpisodes = getAllEpisodes();
  displayEpisodes(allEpisodes);
  createSelectOptions(allEpisodes);

  // Fetch all shows and populate the show select options
  const shows = await fetchAllShows();
  populateShowSelectOptions(shows);

  // Call the handleSearchInput() function whenever the search input changes
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearchInput);

  // Call the handleSelectChange() function whenever the episode select option changes
  const episodeSelect = document.getElementById("episode-select");
  episodeSelect.addEventListener("change", handleSelectChange);

  // Call the handleShowSelectChange() function whenever the show select option changes
  const showSelect = document.getElementById("show-select");
  showSelect.addEventListener("change", handleShowSelectChange);
}

initializePage();
