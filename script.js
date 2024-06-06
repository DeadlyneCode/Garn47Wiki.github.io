document.addEventListener("DOMContentLoaded", function() {
    const charactersContainer = document.getElementById("characters-container");
    const searchInput = document.getElementById("search");

    // Utilisez l'URL GitHub Pages pour le fichier JSON
    fetch("https://deadlynecode.github.io/Garn47Wiki.github.io/data/characters_list.json")
        .then(response => response.json())
        .then(characterFiles => {
            // Fetch chaque fichier de personnage
            return Promise.all(characterFiles.map(file => 
                fetch(`https://deadlynecode.github.io/Garn47Wiki.github.io/${file}`)
                .then(response => response.json())
            ));
        })
        .then(characters => {
            characters.forEach(character => {
                const characterDiv = document.createElement("div");
                characterDiv.className = "character-info";
                characterDiv.setAttribute("data-json", `https://deadlynecode.github.io/Garn47Wiki.github.io/data/char${character.name.toLowerCase()}.json`);

                const img = document.createElement("img");
                img.src = `https://deadlynecode.github.io/Garn47Wiki.github.io/${character.image}`;
                img.alt = character.name;
                img.addEventListener("click", function() {
                    fetch(characterDiv.getAttribute("data-json"))
                        .then(response => response.json())
                        .then(data => {
                            sessionStorage.setItem("characterDetails", JSON.stringify(data));
                            window.location.href = "character_details.html";
                        });
                });

                const descriptionDiv = document.createElement("div");
                descriptionDiv.className = "description";

                const h2 = document.createElement("h2");
                h2.textContent = character.name;

                const p = document.createElement("p");
                p.textContent = character.shortDescription; // Utilisation de shortDescription

                descriptionDiv.appendChild(h2);
                descriptionDiv.appendChild(p);

                characterDiv.appendChild(img);
                characterDiv.appendChild(descriptionDiv);

                charactersContainer.appendChild(characterDiv);
            });

            searchInput.addEventListener("input", function() {
                const searchTerm = this.value.toLowerCase();
                characters.forEach(character => {
                    const characterName = character.name.toLowerCase();
                    const characterSummary = character.shortDescription.toLowerCase(); // Utilisation de shortDescription
                    const characterDiv = document.querySelector(`[data-json="https://deadlynecode.github.io/Garn47Wiki.github.io/data/char${character.name.toLowerCase()}.json"]`);

                    if (characterName.includes(searchTerm) || characterSummary.includes(searchTerm)) {
                        characterDiv.style.display = "block";
                    } else {
                        characterDiv.style.display = "none";
                    }
                });
            });
        })
        .catch(error => console.error('Error loading character details:', error));
});
