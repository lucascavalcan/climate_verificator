document.querySelector(".busca").addEventListener("submit", async (event)=> {
    event.preventDefault();

    //pegar o que o usuário digitou
    let input = document.querySelector("#searchInput").value; 

    if (input !== "") { 
        clearInfo();
        
        //mostrar que a requisição está sendo feita
        showWarning("Carregando...");
        //com as informações repassadas pela API, vai se construir uma URL:
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3447b657ad685bd1213ad6e046e7226c&units=metric&lang=pt_br`;

        //após montar a url, deve-se fazer a requisição de fato e pegar o resultado dela
        let results = await fetch(url);

        let json = await results.json();

        if (json.cod === 200) { //200 é o valor do cod quando a cidade é encontrada
            showInfo({  
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Não encontramos essa localização.");
        }

    } else { 
        clearInfo();
    }
});

//FUNCTIONS
function showInfo(json) {
    showWarning(""); //tira o aviso "carregando..."

    //preenchendo as informações:
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle-90}deg)`;

    //mostrando as infromações que foram preenchidas
    document.querySelector(".resultado").style.display = "block";    
};

function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.display = "none"
};

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
};

