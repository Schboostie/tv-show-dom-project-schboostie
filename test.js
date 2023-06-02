const showSelector = document.getElementById("show-selector");

// Get the list of shows
const shows = getAllShows();

// Sort the shows in alphabetical order (case-insensitive)
shows.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

// Populate the select options
shows.forEach((show) => {
  const option = document.createElement("option");
  option.value = show.id;
  option.textContent = show.name;
  showSelector.appendChild(option);
});

function fetchEpisodes() {
  const selectedShowId = showSelector.value;
  const episodesUrl = `https://api.tvmaze.com/shows/${selectedShowId}/episodes`;

  // Fetch the episodes for the selected show
  fetch(episodesUrl)
    .then((response) => response.json())
    .then((episodes) => {
      // Clear the existing episode list
      episodeList.innerHTML = "";

      // Display the episodes for the selected show
      episodes.forEach((episode) => {
        const episodeItem = document.createElement("li");
        episodeItem.textContent = episode.name;
        episodeList.appendChild(episodeItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching episodes:", error);
    });
}
