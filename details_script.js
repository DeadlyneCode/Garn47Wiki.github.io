document.addEventListener("DOMContentLoaded", function() {
    const characterDetails = JSON.parse(sessionStorage.getItem("characterDetails"));

    const detailsHTML = `
        <div class="character-info">
            <img src="https://deadlynecode.github.io/Garn47Wiki.github.io/${characterDetails.image}" alt="${characterDetails.name}">
            <h2>${characterDetails.name}</h2>
            <div class="description-box">
                <p>${characterDetails.description}</p>
            </div>
            <div class="additional-info">
                <p><strong>Age:</strong> ${characterDetails.age}</p>
                <p><strong>Family:</strong> ${characterDetails.family}</p>
                <p><strong>Background:</strong> ${characterDetails.background}</p>
            </div>
        </div>
    `;

    const characterDetailsContainer = document.querySelector(".character-details");
    characterDetailsContainer.innerHTML = detailsHTML;
});
