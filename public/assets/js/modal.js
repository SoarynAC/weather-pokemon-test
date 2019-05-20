var modal = document.getElementById('pokemonModal');
var modal2 = document.getElementById('erroModal');
var button = document.getElementById("pokeInfo");
var close = document.getElementsByClassName("close")[0];
var close2 = document.getElementsByClassName("close")[1];

button.onclick = function() {
  loadPoke(pokemonList.length - 1);
}

close.onclick = function() {
  modal.style.display = "none";
  document.body.style.overflow = 'auto';
}

close2.onclick = function() {
  modal2.style.display = "none";
  document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
  if (event.target == modal || event.target == modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
    document.body.style.overflow = 'auto';
  }
}