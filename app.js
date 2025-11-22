document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("search-btn");

    button.addEventListener("click", () => {
        fetch("superheroes.php")
            .then(response => response.text())
            .then(data => {
                // this parses the HTML from the PHP file
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;

                const listItems = tempDiv.querySelectorAll("li");

                if (listItems.length === 0) {
                    alert("No superheroes found.");
                    return;
                }

                let heroesText = "";
                listItems.forEach(li => heroesText += li.textContent + "\n");

                alert(heroesText); // shows the JS alert
            })
            .catch(error => {
                alert("Error fetching superheroes: " + error);
                console.error(error);
            });
    });
});
