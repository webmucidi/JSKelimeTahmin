const ogrenciler = [
    { ad: "Enes", ipucu: "Hiperaktif" },
    { ad: "Bilal", ipucu: "Kumarbaz"  },
    { ad: "Umut", ipucu: "Çalgıcı"  },
    { ad: "Tuğba", ipucu: "Sincap"  },
    { ad: "Erayinho", ipucu: "Okulu bıraktı"  }
];

const kapsayici = document.getElementById("container");
const ipucuAlani = document.getElementById("hint");
const sonucAlani = document.getElementById("result");

const guessArea = document.getElementById("guessArea");
const aciklamalar = document.getElementById("attempts");
const guessButton = document.getElementById("guessButton");
const guessInput = document.getElementById("guessInput");
console.log(aciklamalar,guessButton)
let rastgeleOgrenci = {};
let harfler = [];

oyunuBaslat();

function oyunuBaslat() {
    rastgeleOgrenci = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];
    
    ipucuAlani.innerHTML = "Acaba kim bu? " + rastgeleOgrenci.ipucu;
    kartlariOlustur();
    sonucAlani.textContent = "";
    //tryAgainButton.style.display = "none";
    guessArea.innerHTML = "";

    aciklamalar.innerHTML="Doğru cevabı bulmak için harflere sırayla tıklayınız.";
    guessButton.style.display="none";
    guessInput.style.display="none";


}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function kartlariOlustur() {
    kapsayici.innerHTML = "";
    harfler = shuffle(rastgeleOgrenci.ad.toUpperCase().split(""));
    
    harfler.forEach((harf, index) => {
        let kart = document.createElement("div");
        kart.innerHTML = harf;
        kart.className = "card";
        kart.dataset.value = harf;
        kart.dataset.index = index;
        kapsayici.appendChild(kart);
        kart.addEventListener("click", kartAc);
    });
}


function kartAc() {
    
    guessArea.appendChild(this);

    let selectedLetters = [];
    let guessAreaCards = guessArea.getElementsByClassName("card");
    for (let i = 0; i < guessAreaCards.length; i++) {
        selectedLetters.push(guessAreaCards[i].dataset.value);
    }    
    let guess = selectedLetters.join("");

    if (guess.length === harfler.length) {
        if (guess === rastgeleOgrenci.ad.toUpperCase()) {
            sonucAlani.textContent = "Tebrikler, doğru tahmin!";
            for (let j = 0; j < guessAreaCards.length; j++) {
                guessAreaCards[j].classList.add("revealed");
                guessAreaCards[j].classList.remove("wrong");
            }


        } else {
            sonucAlani.textContent = "Maalesef, yanlış tahmin. Tekrar deneyin!";
            for (let j = 0; j < guessAreaCards.length; j++) {
                guessAreaCards[j].classList.add("wrong");
                guessAreaCards[j].classList.remove("revealed");
            }

        }
        
        guessButton.style.display = "block";
        guessButton.disabled=false;
        guessButton.innerHTML="Yeniden Başlat";
        guessButton.addEventListener("click",oyunuBaslat);
    }
}
