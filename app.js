document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const resultDiv = document.getElementById("result");

    // Sanitize input to prevent HTML injection
    function sanitize(str) {
        const temp = document.createElement("div");
        temp.textContent = str;
        return temp.innerHTML;
    }

    button.addEventListener("click", () => {
        const query = sanitize(input.value.trim());

        // Build URL with query parameter
        let url = "superheroes.php";
        if (query) {
            url += "?query=" + encodeURIComponent(query);
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data || data.length === 0) {
                    resultDiv.innerHTML = '<p class="not-found">Superhero not found</p>';
                    return;
                }

                // If multiple results (empty search), list all aliases
                if (data.length > 1) {
                    let html = "<ul>";
                    data.forEach(hero => {
                        html += "<li>" + sanitize(hero.alias) + "</li>";
                    });
                    html += "</ul>";
                    resultDiv.innerHTML = html;
                } else {
                    // Single superhero
                    const hero = data[0];
                    resultDiv.innerHTML = `<h3>${sanitize(hero.alias)}</h3>
                                           <h4>${sanitize(hero.name)}</h4>
                                           <p>${sanitize(hero.biography)}</p>`;
                }
            })
            .catch(error => {
                resultDiv.innerHTML = "<p>Error fetching superheroes</p>";
                console.error(error);
            });
    });
});
