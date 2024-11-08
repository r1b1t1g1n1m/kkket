let lastBettingTime = 0; // Добавляем переменную для отслеживания последнего времени "betting"

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}

async function checkSignal() {
    let randomNumber1 = getRan(1.1, 1.3).toFixed(2);
    const url = 'https://games.inout.games/api/modes/diver/game?operator=86115cad-e94b-40ac-b3bb-7fb13c946275&auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiZjQ3MjViZmMtM2Q4ZC00ZTdkLTgyZWUtZGRjNmM2NjI0MDRiIn0.MIWBa_t1H5yg1qczJrtO8NMAaeLOcZsuJULGdczOgSc&currency=RUB&lang=ru&theme=eyJ1cGRhdGVkQXQiOiIyMDI0LTA0LTIyVDE4OjAzOjU3Ljg2MFoiLCJkaXNhYmxlUG93ZXJlZEJ5IjpmYWxzZSwibG9nb1VybCI6Imh0dHBzOi8vczMuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vaW5vdXQtYXNzZXRzL2FkbWluLWNhc2luby1sb2dvL3ByZWxvYWRlci9hMmYwYzRkNS03NWJkLTRhMzktOTU3Mi00MzdjZjQ1YTRiMmQiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMTcxYjM1In0&gameCustomizationId=&lobbyUrl=';
    const response = await fetch(url);
    const data = await response.json();
    const state = data.state;
    const coefficientsDiv = document.getElementById('coefficients');
    const cupImg = document.getElementById('cup');
    const supImg = document.getElementById('sup');
    const oblokoImg = document.getElementById('ob1');
    const obloko2Img = document.getElementById('ob2');
    const loadImg = document.getElementById('ld');

    let responseText = document.getElementById('responseText');
    let responseText2 = document.getElementById('responseText2');

    if (state === "betting" && Date.now() - lastBettingTime > 5000) {
        let resultText = `${randomNumber1}x`;
        responseText2.textContent = "";
        document.getElementById("responseText").textContent = resultText;
        localStorage.setItem('resultText', resultText);
        responseText.className = 'text betting';
        const bar = document.querySelector('.bar');
        bar.style.animation = 'loading 5s linear';
        const container = document.createElement('div');

        container.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = './images/loads.svg';
        img.style.maxWidth = '85px';
        img.style.maxHeight = '85px';
        container.appendChild(img);

        const text = document.createElement('div');
        text.innerText = 'WAIT\nNEXT ROUND';
        text.id = 'waitingText';
        container.appendChild(text);
        
        coefficientsDiv.innerHTML = ''; 
        coefficientsDiv.appendChild(container); 

        coefficientsDiv.classList.remove('kif');
        coefficientsDiv.classList.add('smallt');
        if (cupImg) {
            cupImg.style.display = 'none';
        }
        if (supImg) {
            supImg.style.display = 'none';
        }
        if (oblokoImg) {
            oblokoImg.style.display = 'none';
        }
        if (obloko2Img) {
            obloko2Img.style.display = 'none';
        }
        if (loadImg) {
            loadImg.style.display = 'block';
        }
        lastBettingTime = Date.now();
    } else if (state === "ending") {
        responseText.textContent = "Waiting..";
        responseText.className = 'text fly';
        responseText2.textContent = "FLIED AWAY";
        responseText2.className = 'text2 fly2';
        if (loadImg) {
            loadImg.style.display = 'none';
        }
    } else if (state === "flying") {
        responseText2.textContent = "";
        if (cupImg) {
            cupImg.style.display = 'block';
        }
        if (supImg) {
            supImg.style.display = 'block';
        }
        if (oblokoImg) {
            oblokoImg.style.display = 'block';
        }
        if (obloko2Img) {
            obloko2Img.style.display = 'block';
        }
        if (loadImg) {
            loadImg.style.display = 'none';
        }
    }   
}

function fetchDataAndUpdate() {
    fetch('https://games.inout.games/api/modes/diver/game?operator=86115cad-e94b-40ac-b3bb-7fb13c946275&auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiZjQ3MjViZmMtM2Q4ZC00ZTdkLTgyZWUtZGRjNmM2NjI0MDRiIn0.MIWBa_t1H5yg1qczJrtO8NMAaeLOcZsuJULGdczOgSc&currency=RUB&lang=ru&theme=eyJ1cGRhdGVkQXQiOiIyMDI0LTA0LTIyVDE4OjAzOjU3Ljg2MFoiLCJkaXNhYmxlUG93ZXJlZEJ5IjpmYWxzZSwibG9nb1VybCI6Imh0dHBzOi8vczMuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vaW5vdXQtYXNzZXRzL2FkbWluLWNhc2luby1sb2dvL3ByZWxvYWRlci9hMmYwYzRkNS03NWJkLTRhMzktOTU3Mi00MzdjZjQ1YTRiMmQiLCJiYWNrZ3JvdW5kQ29sb3IiOiIjMTcxYjM1In0&gameCustomizationId=&lobbyUrl=')
        .then(response => response.json())
        .then(data => {
            const kef = parseFloat(data.current_coefficients);
            updateCoefficients(kef);
        })
        .catch(error => console.error('Error fetching data:', error));
}




function updateCoefficients(coefficients) {

    const coefficientsDiv = document.getElementById('coefficients');
    

    if (coefficients !== 1) {
        coefficientsDiv.innerText = `x${coefficients}`; 
        coefficientsDiv.classList.remove('smallt');
        coefficientsDiv.classList.add('kif');
        
        
        
    } 
}


fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);
let intervalId = setInterval(checkSignal, 100);
checkSignal(); 
