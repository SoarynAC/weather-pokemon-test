# TESTE POKEMON POR TEMPERATURA

## COMO USAR

Primeiro é necessário instalar as dependências utilizando o comando "**npm install**".

Depois, basta abrir o terminal e utilizar o comando "**node index**" estando na pasta raíz do projeto.

Após isso aparecerá no console o endereço onde o servidor foi inicializado, sendo provavelmente **<http://localhost:5000/>**.

Agora é só abrir o navegador no endereço acima e utilizar o sistema.

Para saber qual tipo de Pokemon pode ser encontrado em determinada cidade basta **pesquisar o nome da cidade** ou **clicar sobre ela no mapa**.

## TECNOLOGIAS USADAS

- FRONTEND
	- HTML
	- CSS
	- Javascript
	- Mapbox GL JS
- BACKEND
	- Node
	- Express
	- Superagent
	
## APIS UTILIZADAS

- [OpenWeatherMap](https://openweathermap.org/)
- [PokeAPI](https://pokeapi.co/)

## O DESAFIO

O objetivo é criar uma aplicação web seguindo os seguintes critérios:

- Em uma página HTML deve ser possível informar uma cidade de qualquer lugar do mundo;

- De acordo com as condições climáticas desta cidade deve-se exibir um Pokémon baseado em seu tipo (fogo, água, vento, elétrico, etc) seguindo as seguintes regras:
  - Lugares onde a temperatura for menor que **5ºC**, deve-se retornar um pokémon de **gelo (ice)**.
  - Lugares onde a temperatura estiver entre **5ºC e 10ºC**, deve-se retornar um pokémon do tipo **água (water)**.
  - Lugares onde a temperatura estiver entre **12ºC e 15ºC**, deve-se retornar um pokémon do tipo **grama (grass)**.
  - Lugares onde a temperatura estiver entre **15ºC e 21ºC**, deve-se retornar um pokémon do tipo **terra (ground)**.
  - Lugares onde a temperatura estiver entre **23ºC e 27ºC**, deve-se retornar um pokémon do tipo **inseto (bug)**.
  - Lugares onde a temperatura estiver entre **27ºC e 33ºC** inclusive, deve-se retornar um pokémon do tipo **pedra (rock)**.
  - Lugares onde a temperatura for maior que **33ºC**, deve-se retornar um pokémon do tipo **fogo (fire)**.
  - **Para qualquer outra temperatura**, deve-se retornar um pokémon do tipo **normal**.
  - E, no caso em que **esteja chovendo na região** um pokémon **elétrico (electric)** deve ser retornado, independente da temperatura.

- Após a consulta deve-se exibir na tela:
  - Temperatural atual da cidade em graus Celcius;
  - Se está chovendo ou não;
  - Nome do Pokémon seguindo as regras acima.