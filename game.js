// DANS game.js - NOUVEAU SYSTÈME DE SAUVEGARDE
class AdvancedGame {
    constructor() {
        this.gameData = {
            scene: 0,
            relations: {},
            inventory: [],
            playerName: "Joueur",
            version: "1.0"
        };
        this.story = this.createAdvancedStory();
    }

    // SYSTÈME DE SAUVEGARDE AVEC CODE
    saveGame() {
        const saveCode = btoa(JSON.stringify(this.gameData));
        localStorage.setItem('romanceSave', saveCode);
        
        // Affiche le code pour partager
        alert(`💾 SAUVEGARDÉ !\n\nCode de sauvegarde :\n${saveCode}\n\nCopie ce code pour reprendre plus tard !`);
        return saveCode;
    }

    loadGame(saveCode = null) {
        try {
            const code = saveCode || localStorage.getItem('romanceSave');
            if (code) {
                const savedData = JSON.parse(atob(code));
                this.gameData = { ...this.gameData, ...savedData };
                this.showScene(this.gameData.scene);
                alert('✅ Partie chargée !');
            }
        } catch (e) {
            alert('❌ Code de sauvegarde invalide');
        }
    }

    // HISTOIRE AVANCÉE AVEC VRAIS DIALOGUES
    createAdvancedStory() {
        return [
            // CHAPITRE 1 - LA RENCONTRE
            {
                background: "fond-academie.jpg",
                characters: {
                    left: { image: "perso_alex.png", emotion: "neutre" },
                    right: null
                },
                speaker: "Narrateur",
                text: "Tu arrives devant la prestigieuse Académie des Arts. Le cœur battant, tu pousses les lourdes portes...",
                choices: [
                    { text: "Prendre une profonde inspiration", next: 1, effects: {} },
                    { text: "Regarder autour avec curiosité", next: 2, effects: {} }
                ]
            },
            {
                background: "fond-couloir.jpg", 
                characters: {
                    left: { image: "perso_alex.png", emotion: "sourire" },
                    right: null
                },
                speaker: "Alex",
                text: "Oh, bonjour ! Je ne t'ai jamais vu ici. Tu es nouveau ? Je m'appelle Alex.",
                choices: [
                    { text: \"Salut ! Je m'appelle... [ton nom]\", next: 3, effects: { alex: 10 } },
                    { text: "Oui, je viens d'arriver. C'est immense !", next: 4, effects: { alex: 5 } }
                ]
            },
            {
                background: "fond-couloir.jpg",
                characters: {
                    left: { image: "perso_alex.png", emotion: "curieux" },
                    right: null
                },
                speaker: "Alex",
                text: \"[ton nom], joli prénom ! Moi je suis en section peinture. Et toi, tu es ici pour quoi ?\",
                choices: [
                    { text: "La peinture aussi !", next: 5, effects: { alex: 15 } },
                    { text: "La musique, plutôt", next: 6, effects: { alex: 8 } },
                    { text: "Je ne sais pas encore...", next: 7, effects: { alex: 3 } }
                ]
            }
        ];
    }

    showScene(sceneId) {
        const scene = this.story[sceneId];
        if (!scene) return;

        // Met à jour l'interface
        document.getElementById('speakerName').textContent = scene.speaker;
        document.getElementById('dialogueText').textContent = scene.text;

        // Change le fond
        document.querySelector('.game-container').style.backgroundImage = `url('${scene.background}')`;

        // Affiche les personnages
        this.displayCharacters(scene.characters);

        // Affiche les choix
        this.displayChoices(scene.choices);

        this.gameData.scene = sceneId;
    }

    displayCharacters(chars) {
        // Implémente l'affichage des personnages
    }

    displayChoices(choices) {
        const container = document.getElementById('choicesContainer');
        container.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => this.makeChoice(choice);
            container.appendChild(btn);
        });
    }

    makeChoice(choice) {
        // Applique les effets
        if (choice.effects) {
            Object.entries(choice.effects).forEach(([key, value]) => {
                if (!this.gameData.relations[key]) this.gameData.relations[key] = 0;
                this.gameData.relations[key] += value;
            });
        }

        this.showScene(choice.next);
    }
}

// FONCTIONS GLOBALES
let game;

function startGame() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    
    game = new AdvancedGame();
    game.showScene(0);
}

function loadGame() {
    const saveCode = prompt("Colle ton code de sauvegarde :");
    if (saveCode) {
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        
        game = new AdvancedGame();
        game.loadGame(saveCode);
    }
}
