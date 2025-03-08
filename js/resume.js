document.addEventListener("DOMContentLoaded", () => {
  fetch("data/cv-data.json")
    .then((response) => response.json())
    .then((data) => {
      renderEducation(data.education);
      renderWorkExperience(data.workExperience);
      setupEducationModal();
    })
    .catch((error) => console.error("Fel vid inläsning av JSON:", error));
});

function renderEducation(education) {
  const educationSection = document.querySelector(".cv-education ul");
  educationSection.innerHTML = "";

  education.forEach((edu) => {
    let li = document.createElement("li");
    li.innerHTML = `<strong>${edu.school}</strong>, ${edu.location} (${edu.years})`;

    li.setAttribute(
      "data-description",
      edu.description || "Ingen beskrivning tillgänglig."
    );

    educationSection.appendChild(li);
  });
}

function renderWorkExperience(workExperience) {
  const workSection = document.querySelector(".cv-section ul");
  workSection.innerHTML = "";
  workExperience.forEach((job) => {
    let li = document.createElement("li");
    li.innerHTML = `<strong>${job.company}</strong>, ${job.location} (${job.years}) <p>${job.role}</p>`;
    workSection.appendChild(li);
  });
}

function setupEducationModal() {
  document.querySelectorAll(".cv-education ul li").forEach((item) => {
    item.addEventListener("click", () => {
      const description = item.getAttribute("data-description");
      const schoolName = item.querySelector("strong").innerHTML;

      document.querySelector(".modal-content").innerHTML = `
        <h3>${schoolName}</h3>
        <p>${description}</p>
      `;
      document.querySelector(".modal").classList.add("show");
    });
  });

  document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("show");
  });
}

window.addEventListener("scroll", () => {
  document.querySelector(".scroll-top").style.display =
    window.scrollY > 300 ? "block" : "none";
});

document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
