const arrow = document.getElementById("arrow");
const secondContent = document.getElementById("second-content");
const daysContent = document.getElementById("days");
const vento = document.getElementById("vento");
const condicao = document.getElementById("condicao");
const humidade = document.getElementById("humidade");
const cidade = document.getElementById("cidade");
const temperatura = document.getElementById("temperatura");
const nascer_sol = document.getElementById("nascer_sol");
const por_sol = document.getElementById("por_sol");
const data = document.getElementById("data");

let contentOpen = false;
let defaultColor = "yellow";
let listCidades = [];
let skycons = new Skycons({"color": "white"});

skycons.add("icon", Skycons.RAIN);
skycons.add("iconFooter", Skycons.RAIN);

const key = "65331f65";

const getResponse = async (city) => {
    try {
        document.getElementById('loading').style.display = "block";

        const response = await axios.get(`https://api.hgbrasil.com/weather?format=json-cors&city_name=${city}&key=${key}`);


        console.log(response);
        if (response.data.by === "default") {
            Toastify({
                text: "Cidade não encontrada",
                duration: 3000,
                newWindow: true,
                backgroundColor: "linear-gradient(to right, #c62828, #b71c1c)",
                stopOnFocus: true
              }).showToast();

              document.getElementById('loading').style.display = "none";
        } else {
            for(let i = daysContent.childElementCount - 1; i >= 0; i--) {
                daysContent.children[i].remove();
            }

            const { results: { forecast, city_name, description, temp, wind_speedy, date, condition_slug, sunrise, sunset, humidity, currently } } = response.data;

            writeText(cidade, city_name);
            writeText(condicao, description);
            writeText(vento, wind_speedy);
            writeText(humidade, `${humidity}%`);
            writeText(temperatura, `${temp}º`);
            writeText(data, setDate(date));
            writeText(por_sol, sunset);
            writeText(nascer_sol, sunrise);

            setBackgroundColor(currently);

            document.getElementById("body").style.backgroundColor = defaultColor;
            document.getElementById("data").style.color = defaultColor;
            temperatura.style.color = defaultColor;

            skycons.set("icon", setIcon(condition_slug));
            skycons.set("iconFooter", setIcon(condition_slug));

            forecast.map(day => {
                const { max, min, weekday } = day;
            
                let Day = document.createElement('div');
                Day.setAttribute('class', 'day');
                Day.setAttribute('style', `background-color: ${defaultColor}`);
            
                let Title = document.createElement('h4');
                Title.appendChild(document.createTextNode(weekday));
            
                let Temp = document.createElement('h4');
                Temp.appendChild(document.createTextNode(`${(max + min) / 2}º`));
            
                let Icon = document.createElement('canvas');
                Icon.setAttribute('width', '50');
                Icon.setAttribute('height', '50');

                skycons.add(Icon, setIcon(day.condition));
            
                Day.appendChild(Title);
                Day.appendChild(Icon);
                Day.appendChild(Temp);
            
                daysContent.appendChild(Day);
            });

            setListCidades(city);

            skycons.play();

            document.getElementById('loading').style.display = "none";
        }
    } catch(err) {
        Toastify({
            text: err,
            duration: 3000,
            newWindow: true,
            backgroundColor: "linear-gradient(to right, #c62828, #b71c1c)",
            stopOnFocus: true
          }).showToast();

          document.getElementById('loading').style.display = "none";
    }
}

document.getElementById('button').addEventListener('click', () => {
    getResponse(document.getElementById('inputCidade').value);
});

const writeText = (element, text) => {
    element.innerHTML = text;
}

document.getElementById('inputCidade').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        getResponse(document.getElementById('inputCidade').value);
    }
});

arrow.addEventListener('click', () => {
    if(contentOpen){
        arrow.style.transform = "rotate(0deg)";
        arrow.style.bottom = "-20px";
        secondContent.style.bottom = "-205px";
        secondContent.style.display = "hidden";
    } else {
        arrow.style.transform = "rotate(180deg)";
        secondContent.style.bottom = "0px";
        secondContent.style.display = "flex";
        arrow.style.bottom = "180px";
    }
    
    contentOpen = !contentOpen;
});

const setBackgroundColor = (currently) => {
    if (currently === "dia") {
        defaultColor = "#1E88E5";
    } else {
        defaultColor = "#263238";
    }
}

const setListCidades = (city) => {
    if (listCidades.indexOf(city) > -1) {
        null;
    } else {
        listCidades[listCidades.length] = city;
        localStorage.setItem("@CodeApi:listCidades", JSON.stringify(listCidades));
    }
}

const getListCidades = () => {
    return JSON.parse(localStorage.getItem("@CodeApi:listCidades"));
}

getListCidades() ? listCidades = getListCidades() : null;

window.onload = getResponse("Palmeira dos Indios");

const setDate = (date) => {
    switch (date.split('/')[1]) {
        case "01": 
            return `${date.split("/")[0]} de Janeiro`;
        case "01": 
            return `${date.split("/")[0]} de Fevereiro`;
        case "02": 
            return `${date.split("/")[0]} de Março`;
        case "03": 
            return `${date.split("/")[0]} de Abril`;
        case "04": 
            return `${date.split("/")[0]} de Maio`;
        case "05": 
            return `${date.split("/")[0]} de Junho`;
        case "06": 
            return `${date.split("/")[0]} de Julho`;
        case "07": 
            return `${date.split("/")[0]} de Agosto`;
        case "08": 
            return `${date.split("/")[0]} de Setembro`;
        case "09": 
            return `${date.split("/")[0]} de Outubro`;
        case "11": 
            return `${date.split("/")[0]} de Novembro`;
        case "12": 
            return `${date.split("/")[0]} de Dezembro`;
    }
}
