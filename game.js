v// game.js - CODE TRÈS SIMPLE
let sceneActuelle = 0;

const histoire = [
    {
        personnage: "Narrateur",
        texte: "Tu arrives à l'Académie des Arts. C'est ton premier jour...",
        choix: [
            { texte: "Entrer dans le bâtiment", next: 1 },
            { texte: "Explorer le jardin", next: 2 }
        ]
    },
    {
        personnage: "Alex",
        texte: "Salut ! Tu es nouveau ici ? Je m'appelle Alex.",
        choix: [
            { texte: "Ravi de te rencontrer !", next: 3 },
            { texte: "Oui, je cherche ma classe", next: 4 }
        ]
    },
    {
        personnage: "Alex",
        texte: "Super ! Moi je suis en section peinture. Et toi ?",
        choix: [
            { texte: "Moi aussi !", next: 5 },
            { texte: "Je préfère la musique", next: 6 }
        ]
    }
];

function demarrerJeu() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    chargerScene(0);
}

function chargerScene(id) {
    sceneActuelle = id;
    const scene = histoire[id];
    
    document.getElementById('speakerName').textContent = scene.personnage;
    document.getElementById('dialogueText').textContent = scene.texte;
    
    const container = document.getElementById('choicesContainer');
    container.innerHTML = '';
    
    scene.choix.forEach(choix => {
        const bouton = document.createElement('button');
        bouton.textContent = choix.texte;
        bouton.onclick = () => chargerScene(choix.next);
        bouton.style.cssText = `
            display: block;
            width: 100%;
            padding: 15px;
            margin: 5px 0;
            background: #ff9eb5;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        `;
        container.appendChild(bouton);
    });
}

function montrerMenu() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
}
