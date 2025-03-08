document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.getElementById("projects-container");
  const loadingIndicator = document.getElementById("loading");
  const githubUsername = "lord48"; //
  const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;

  fetch(githubApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nätverksfel vid hämtning av GitHub-projekt");
      }
      return response.json();
    })
    .then((repos) => {
      loadingIndicator.style.display = "none";

      repos.forEach((repo) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("projects-card");

        const title = document.createElement("h3");
        title.textContent = repo.name;

        const description = document.createElement("p");
        description.textContent =
          repo.description || "Ingen beskrivning tillgänglig.";

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.textContent = "Se projektet";
        link.target = "_blank";

        projectCard.appendChild(title);
        projectCard.appendChild(description);
        projectCard.appendChild(link);

        projectContainer.appendChild(projectCard);
      });
    })
    .catch((error) => {
      console.error("Misslyckades att hämta GitHub-projekt:", error);
      loadingIndicator.textContent = "Misslyckades att ladda GitHub-projekt.";
    });
});
