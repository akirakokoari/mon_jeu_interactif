// 🎮 SYSTÈME DE JEU COMPLET - Romance Royale

class RomanceGame {
    constructor() {
        this.gameState = {
            currentScene: 0,
            lovePoints: 50,
            diamonds: 150,
            playerOutfit: 0,
            pet: {
                hunger: 80,
                happiness: 60,
                name: "Mimi"
            },
            inventory: [],
            relationships: {},
            progress: 10
        };
        
        this.story = this.createStory();
        this.init();
    }

    createStory() {
        return [
            {
                speaker: "Narrateur",
                message: "Bienvenue à l'Académie Royale des Arts ! Tu viens tout juste d'arriver dans cette prestigieuse école. Le soleil brille sur les jardins magnifiques...",
                choices: [
                    { text: "Explorer les jardins", nextScene: 1, effects: { lovePoints: 5 } },
                    { text: "Aller directement en classe", nextScene: 2, effects: { lovePoints: 2 } },
                    { text: "Chercher la cafétéria", nextScene: 3, effects: { lovePoints: 3 } }
                ]
            },
            {
                speaker: "Narrateur",
                message: "Dans les jardins, tu tombes sur un étudiant mystérieux en train de dessiner. Il te remarque et te sourit timidement.",
                choices: [
                    { text: "Lui demander ce qu'il dessine", nextScene: 4, effects: { lovePoints: 10 } },
                    { text: "Sourire et continuer ton chemin", nextScene: 5, effects: { lovePoints: 5 } },
                    { text: "Ignorer et chercher un endroit calme", nextScene: 6, effects: { lovePoints: 1 } }
                ]
            },
            {
                speaker: "Sophia",
                message: "Oh, bonjour ! Tu dois être le nouveau. Je suis Sophia, en section peinture. Ton style est vraiment mignon !",
                choices: [
                    { text: "Merci ! Ton style est incroyable aussi", nextScene: 7, effects: { lovePoints: 15 } },
                    { text: "Enchanté, je cherche ma classe", nextScene: 8, effects: { lovePoints: 8 } },
                    { text: "Peux-tu me montrer autour ?", nextScene: 9, effects: { lovePoints: 12 } }
                ]
            },
            {
                speaker: "Alex",
                message: "Je dessinais les roses... Elles sont magnifiques cette saison. Je m'appelle Alex. Tu aimes l'art ?",
                choices: [
                    { text: "J'adore ! Surtout la peinture", nextScene: 10, effects: { lovePoints: 20 } },
                    { text: "Un peu, je débute", nextScene: 11, effects: { lovePoints: 12 } },
                    { text: "Je préfère la musique", nextScene: 12, effects: { lovePoints: 8 } }
                ]
            }
        ];
    }

    init() {
        this.loadGame();
        this.displayScene(this.gameState.currentScene);
        this.updateUI();
    }

    displayScene(sceneIndex) {
        const scene = this.story[sceneIndex];
        if (!scene) {
            this.endChapter();
            return;
        }

        document.getElementById('speaker').textContent = scene.speaker;
        document.getElementById('message').textContent = scene.message;

        const choicesContainer = document.getElementById('choicesContainer');
        choicesContainer.innerHTML = '';

        scene.choices.forEach((choice, index) => {
            const choiceElement = document.createElement('div');
            choiceElement.className = 'choice';
            choiceElement.textContent = choice.text;
            choiceElement.onclick = () => this.makeChoice(choice);
            choicesContainer.appendChild(choiceElement);
        });

        this.gameState.currentScene = sceneIndex;
        this.updateProgress();
    }

    makeChoice(choice) {
        // Appliquer les effets du choix
        if (choice.effects) {
            Object.keys(choice.effects).forEach(effect => {
                this.gameState[effect] += choice.effects[effect];
            });
        }

        // Animation de feedback
        this.showLoveAnimation(choice.effects.lovePoints);

        // Passer à la scène suivante
        setTimeout(() => {
            this.displayScene(choice.nextScene);
            this.updateUI();
            this.saveGame();
        }, 800);
    }

    showLoveAnimation(points) {
        const animation = document.createElement('div');
        animation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2em;
            color: #e75480;
            z-index: 1000;
            animation: floatUp 1s ease-out;
        `;
        
        animation.textContent = points > 0 ? `+${points} 💖` : `${points} 💔`;
        document.body.appendChild(animation);

        setTimeout(() => {
            document.body.removeChild(animation);
        }, 1000);
    }

    updateUI() {
        document.getElementById('lovePoints').textContent = this.gameState.lovePoints;
        document.getElementById('diamonds').textContent = this.gameState.diamonds;
        
        // Mettre à jour l'animal
        this.updatePetDisplay();
        
        // Mettre à jour la progression
        this.updateProgress();
    }

    updatePetDisplay() {
        const hungerFill = document.querySelector('.hunger-fill');
        const happinessFill = document.querySelector('.happiness-fill');
        
        if (hungerFill && happinessFill) {
            hungerFill.style.width = `${this.gameState.pet.hunger}%`;
            happinessFill.style.width = `${this.gameState.pet.happiness}%`;
        }
    }

    updateProgress() {
        const progress = ((this.gameState.currentScene + 1) / this.story.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    // Système Animal de Compagnie
    feedPet() {
        if (this.gameState.pet.hunger < 100) {
            this.gameState.pet.hunger += 20;
            this.gameState.pet.happiness += 10;
            if (this.gameState.pet.hunger > 100) this.gameState.pet.hunger = 100;
            if (this.gameState.pet.happiness > 100) this.gameState.pet.happiness = 100;
            this.updateUI();
            this.showMessage("🍖 Mimi a été nourri !");
        }
    }

    playWithPet() {
        if (this.gameState.pet.happiness < 100) {
            this.gameState.pet.happiness += 15;
            this.gameState.pet.hunger -= 5;
            if (this.gameState.pet.happiness > 100) this.gameState.pet.happiness = 100;
            if (this.gameState.pet.hunger < 0) this.gameState.pet.hunger = 0;
            this.updateUI();
            this.showMessage("🎾 Mimi s'amuse !");
        }
    }

    // Système de Garde-Robe
    changeOutfit(outfitIndex) {
        this.gameState.playerOutfit = outfitIndex;
        const outfits = document.querySelectorAll('.outfit');
        outfits.forEach((outfit, index) => {
            outfit.classList.toggle('active', index === outfitIndex);
        });
        this.showMessage(`👗 Tenue changée !`);
    }

    // Système de Sauvegarde
    saveGame() {
        localStorage.setItem('romanceRoyaleSave', JSON.stringify(this.gameState));
        this.showMessage("💾 Jeu sauvegardé !");
    }

    loadGame() {
        const saved = localStorage.getItem('romanceRoyaleSave');
        if (saved) {
            this.gameState = { ...this.gameState, ...JSON.parse(saved) };
            this.showMessage("📂 Partie chargée !");
        }
    }

    // Fin de chapitre
    endChapter() {
        const message = `🎉 Chapitre terminé !\n\nPoints d'amour: ${this.gameState.lovePoints}\nDiamants: ${this.gameState.diamonds}\n\nPrépare-toi pour le prochain chapitre !`;
        alert(message);
        this.gameState.currentScene = 0;
        this.displayScene(0);
    }

    showMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--rose-principal);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        messageDiv.textContent = text;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
}

// Menu flottant
function toggleMenu() {
    const menu = document.getElementById('menuContent');
    menu.classList.toggle('show');
}

function showSettings() {
    alert('⚙️ Paramètres - En développement !');
}

// Initialisation du jeu
let game;

document.addEventListener('DOMContentLoaded', function() {
    game = new RomanceGame();
    
    // Styles d'animation supplémentaires
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -70%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -100%) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Fonctions globales pour les boutons HTML
function makeChoice(index) {
    // Cette fonction est gérée par la classe
}

function feedPet() {
    if (game) game.feedPet();
}

function playWithPet() {
    if (game) game.playWithPet();
}

function changeOutfit(index) {
    if (game) game.changeOutfit(index);
}

function saveGame() {
    if (game) game.saveGame();
}

function loadGame() {
    if (game) game.loadGame();
    if (game) game.updateUI();
}
