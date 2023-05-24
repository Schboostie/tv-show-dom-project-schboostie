function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// level 100
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

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

// Function to initialize the page
function initializePage() {
  const allEpisodes = getAllEpisodes();
  displayEpisodes(allEpisodes);
}

// Call the initializePage() function to populate the page with episodes
window.onload = initializePage;
