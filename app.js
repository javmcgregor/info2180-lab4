document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const resultDiv = document.getElementById("result");

    function sanitize(str) {
        const temp = document.createElement("div");
        temp.textContent = str;
        return temp.innerHTML;
    }

    function fetchHeroes(query = "") {
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

                if (query) {
                    // Specific hero searched: shows their alias, name, and biography
                    const hero = data[0];
                    resultDiv.innerHTML = `<h3>${sanitize(hero.alias.toUpperCase())}</h3>
                                           <h4>${sanitize(hero.name.toUpperCase())}</h4>
                                           <p>${sanitize(hero.biography)}</p>`;
                } else {
                    // No search query: show default list
                    let html = "<ul>";
                    data.forEach(hero => {
                        html += "<li>" + sanitize(hero.alias) + "</li>";
                    });
                    html += "</ul>";
                    resultDiv.innerHTML = html;
                }
            })
            .catch(error => {
                resultDiv.innerHTML = "<p>Error fetching superheroes</p>";
                console.error(error);
            });
    }

    // Show all heroes on page load
    fetchHeroes();

    // Search button click
    button.addEventListener("click", () => {
        const query = sanitize(input.value.trim());
        fetchHeroes(query);
    });
});
