const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${date}T00:00:00`));
}

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";
  item.innerHTML = `
    <div>
      <a class="repository-name" href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a>
      <p class="repository-description">${repository.description}</p>
      <div class="repository-meta">
        <span class="language">${repository.language}</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </div>
    </div>
  `;
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
    repositoryCount.textContent = `${repositories.length} repositories`;
  } catch (error) {
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.className = "status-message";
    message.textContent = "The repository log could not be loaded.";
    repositoryList.append(message);
    console.error(error);
  }
}

loadRepositories();