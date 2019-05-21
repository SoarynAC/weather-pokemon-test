pokemonList = [];

function loadUserLocation() {
  var xhttploc = new XMLHttpRequest();
  xhttploc.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      res = JSON.parse(this.responseText);

      marker.setLngLat([res.longitude, res.latitude])

      loadInfo(res.longitude, res.latitude);
    }
  };
  xhttploc.open("GET", "https://ipapi.co/json/", true);
  xhttploc.send();
}

function emptyResponse() {
  document.getElementById("cidade").innerHTML = '-';
  document.getElementById("clima").innerHTML = '-';
  document.getElementById("temp").innerHTML = '-';
  document.getElementById("pokemon").innerHTML = '-';
  document.getElementById("imgtipo").src = "/assets/img/bg.png";
  document.getElementById("erroModal").style.display = 'flex';
}

function loadPoke(id) {
  document.getElementById("imgstipo").innerHTML = "<p>Types</p>";
  document.getElementById("moves").innerHTML = "";
  document.getElementById("pokeImg").src = pokemonList[id].sprites.front_default;
  document.getElementById("hp").innerHTML = pokemonList[id].stats[5].base_stat;
  document.getElementById("attack").innerHTML = pokemonList[id].stats[4].base_stat;
  document.getElementById("defense").innerHTML = pokemonList[id].stats[3].base_stat;
  document.getElementById("sattack").innerHTML = pokemonList[id].stats[2].base_stat;
  document.getElementById("sdefense").innerHTML = pokemonList[id].stats[1].base_stat;
  document.getElementById("speed").innerHTML = pokemonList[id].stats[0].base_stat;
  document.getElementById("altura").innerHTML = (pokemonList[id].height / 10.0) + "m";
  document.getElementById("peso").innerHTML = (pokemonList[id].weight / 10.0) + "kg";
  document.getElementById("modalPokemon").innerHTML = pokemonList[id].name;

  for (var i = 0; i < 4; i++) {

    var num = Math.floor(Math.random() * pokemonList[id].moves.length);

    var move = document.createElement("DIV");
    move.innerHTML = pokemonList[id].moves[num].move.name;
    move.classList.add('move');

    document.getElementById('moves').appendChild(move);
  }

  pokemonList[id].types.forEach(function(element) {
    var img = document.createElement("IMG");
    img.src = "/assets/img/types/" + element.type.name + ".png";
    document.getElementById("imgstipo").appendChild(img);
  })
  document.body.style.overflow = 'hidden';
  document.getElementById("pokemonModal").style.display = 'flex';
}

function loadInfo(lon, lat) {

  document.body.style.overflow = 'hidden';
  document.getElementById('overlay').style.display = 'flex';
  timeout = setTimeout(() => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('errorText').innerHTML = 'Connection timed out.';
    emptyResponse();
    xhttp.abort();
  }, 20000);;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      res = JSON.parse(this.responseText);

      weather = JSON.parse(res.resWeather.text);
      type = JSON.parse(res.resType.text);
      pokemon = JSON.parse(res.resPokemon.text);

      if (res.resWeather.status != 200) {
        document.getElementById('errorText').innerHTML = 'Location not found.';
        emptyResponse();
      } else {
        pokemonList.push(pokemon);
        addPokeToMap(pokemon, lon, lat);

        date = moment().tz(tzlookup(lat, lon));
        dateString = date.format("HH:mm");

        document.getElementById("cidade").innerHTML = (weather.name ? weather.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : 'Unknown') + " (" + dateString + ")";
        document.getElementById("clima").innerHTML = weather.weather[0].description.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        document.getElementById("temp").innerHTML = weather.main.temp + "°C";
        document.getElementById("pokemon").innerHTML = pokemon.name;
        document.getElementById("imgtipo").src = "/assets/img/types/" + type.name + ".png";

        document.body.style.overflow = 'auto';

        document.getElementById('info').scrollIntoView({
          behavior: 'smooth'
        })
      }

      document.getElementById('overlay').style.display = 'none';

      clearTimeout(timeout);
    }
  };
  xhttp.open("GET", "/buscar?lon=" + lon + "&lat=" + lat, true);
  xhttp.send();
}