var modal = document.getElementById('pokemonModal');
var button = document.getElementById("pokeInfo");
var close = document.getElementsByClassName("close")[0];

button.onclick = function () {
    modal.style.display = "flex";
    document.body.style.overflow = 'hidden';
}

close.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}
