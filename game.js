// SYSTÈME TRÈS SIMPLE - ÇA MARCHE !
let gameData = {
    scene: 0,
    alex: 0
};

const story = [
    // SCÈNE 0
    {
        personnage: "Narrateur",
        texte: "Tu arrives à l'Académie. C'est ton premier jour...",
        choix: [
            { texte: "Entrer dans le bâtiment", next: 1 },
            { texte: "Explorer le jardin", next: 2 }
        ]
    },
    // SCÈNE 1
    {
        personnage: "Alex",
        texte: "Salut ! Tu es nouveau ici ? Je m'appelle Alex.",
        choix: [
            { texte: "Ravi de te rencontrer !", next: 3, effet: { alex: 10 } },
            { texte: "Oui, je cherche ma classe", next: 4, effet: { alex: 5 } }
        ]
    },
    // SCÈNE 3
    {
        personnage: "Alex", 
        texte: "Moi je suis en peinture. Et toi, tu aimes l'art ?",
        choix: [
            { texte: "J'adore !", next: 5, effet: { alex: 15 } },
            { texte: "Je préfère la musique", next: 6, effet: { alex: 8 } }
        ]
    }
];

// FONCTIONS SIMPLES
function demarrerJeu() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    chargerScene(0);
}

function chargerScene(id) {
    const scene = story[id];
    if (!scene) return;
    
    gameData.scene = id;
    
    document.getElementById('speakerName').textContent = scene.personnage;
    document.getElementById('dialogueText').textContent = scene.texte;
    
    const choixContainer = document.getElementById('choicesContainer');
    choixContainer.innerHTML = '';
    
    scene.choix.forEach(choix => {
        const bouton = document.createElement('button');
        bouton.className = 'choice-btn';
        bouton.textContent = choix.texte;
        bouton.onclick = () => faireChoix(choix);
        choixContainer.appendChild(bouton);
    });
}

function faireChoix(choix) {
    if (choix.effet) {
        Object.keys(choix.effet).forEach(cle => {
            gameData[cle] += choix.effet[cle];
        });
    }
    chargerScene(choix.next);
}

function montrerEcran(nomEcran) {
    // Cache tout
    document.querySelectorAll('.screen').forEach(ecran => {
        ecran.classList.add('hidden');
    });
    // Montre l'écran demandé
    document.getElementById(nomEcran).classList.remove('hidden');
}

// SAUVEGARDE SIMPLE
function sauvegarder() {
    localStorage.setItem('jeuSauvegarde', JSON.stringify(gameData));
    alert('💾 Sauvegardé !');
}

function charger() {
    const sauvegarde = localStorage.getItem('jeuSauvegarde');
    if (sauvegarde) {
        gameData = JSON.parse(sauvegarde);
        chargerScene(gameData.scene);
    }
}

// QUAND LA PAGE CHARGE
document.addEventListener('DOMContentLoaded', function() {
    // Cache l'écran de chargement après 1 sec
    setTimeout(() => {
        montrerEcran('mainMenu');
    }, 1000);
});
