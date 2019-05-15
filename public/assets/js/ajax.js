function loadUserLocation() {
    var xhttploc = new XMLHttpRequest();
    xhttploc.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            res = JSON.parse(this.responseText);

            marker.setLngLat([res.longitude, res.latitude])

            loadInfo(res.longitude, res.latitude);
        }
    };
    xhttploc.open("GET", "https://ipapi.co/json/", true);
    xhttploc.send();
}

function loadInfo(lon, lat) {

    document.getElementById('overlay').style.display = 'flex'

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("imgstipo").innerHTML = "<p>Tipos</p>";

            res = JSON.parse(this.responseText);

            weather = JSON.parse(res.resWeather.text);
            type = JSON.parse(res.resType.text);
            pokemon = JSON.parse(res.resPokemon.text);

            if (res.resWeather.status != 200) {
                document.getElementById("cidade").innerHTML = '-';
                document.getElementById("clima").innerHTML = '-';
                document.getElementById("temp").innerHTML = '-';
                document.getElementById("pokemon").innerHTML = '-';
                alert('local não encontrado')
            } else {
                document.getElementById("cidade").innerHTML = weather.name ? weather.name : 'Localizacao sem nome';
                document.getElementById("clima").innerHTML = weather.weather[0].description;
                document.getElementById("temp").innerHTML = weather.main.temp + "°C";
                document.getElementById("pokemon").innerHTML = pokemon.name;
                document.getElementById("modalPokemon").innerHTML = pokemon.name;
                document.getElementById("imgtipo").src = "/assets/img/types/" + type.name + ".png";
                document.getElementById("pokeImg").src = pokemon.sprites.front_default;
                document.getElementById("hp").innerHTML = pokemon.stats[5].base_stat;
                document.getElementById("attack").innerHTML = pokemon.stats[4].base_stat;
                document.getElementById("defense").innerHTML = pokemon.stats[3].base_stat;
                document.getElementById("sattack").innerHTML = pokemon.stats[2].base_stat;
                document.getElementById("sdefense").innerHTML = pokemon.stats[1].base_stat;
                document.getElementById("speed").innerHTML = pokemon.stats[0].base_stat;
                document.getElementById("altura").innerHTML = (pokemon.height/10.0) + "m";
                document.getElementById("peso").innerHTML = (pokemon.weight/10.0) + "kg";

                for (var i = 0; i < 4; i++) {
                  var move = document.createElement("DIV");
                  move.innerHTML= pokemon.moves[i].move.name;
                  move.style.padding = '.5em';
                  move.style.boxSizing = 'border-box';
                  move.style.textTransform = 'uppercase';
                  move.style.width = '50%';

                  document.getElementById('moves').appendChild(move);
                }

                pokemon.types.forEach(function (element) {
                  var img = document.createElement("IMG");
                  img.src = "/assets/img/types/" + element.type.name + ".png";
                  document.getElementById("imgstipo").appendChild(img);
                })
            }

            document.getElementById('overlay').style.display = 'none'

            document.getElementById('info').scrollIntoView({
                behavior: 'smooth'
            })
        }
    };
    xhttp.open("GET", "/buscar?lon=" + lon + "&lat=" + lat, true);
    xhttp.send();
}
