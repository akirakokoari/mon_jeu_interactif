// 🎮 SYSTÈME DE JEU CORRIGÉ - ROMANCE ACADEMY

class RomanceGame {
    constructor() {
        this.gameData = {
            currentScreen: 'mainMenu',
            storyProgress: {
                saison1: { currentScene: 0, completed: false }
            },
            player: {
                name: "Joueur",
                diamonds: 150,
                outfits: [0],
                currentOutfit: 0
            },
            relationships: {},
            inventory: [],
            settings: {
                musicVolume: 50,
                effectsVolume: 70
            }
        };
        
        this.story = this.createStory();
    }

    init() {
        this.loadGame();
        this.showScreen('loadingScreen');
        
        // Simulation du chargement
        setTimeout(() => {
            this.showScreen('mainMenu');
        }, 2000);
    }

    createStory() {
        return {
            saison1: [
                {
                    background: 'fond-academie.jpg',
                    characters: {
                        left: { image: 'perso_alex.png', name: "Alex", emotion: "sourire" },
                        right: null
                    },
                    speaker: "Narrateur",
                    text: "Tu arrives devant l'Académie des Arts, le cœur battant. Cet endroit est magnifique...",
                    choices: [
                        { text: "Entrer avec confiance", next: 1, effects: { courage: 5 } },
                        { text: "Observer les environs", next: 2, effects: { observation: 5 } }
                    ]
                },
                {
                    background: 'fond-couloir.jpg',
                    characters: {
                        left: { image: 'perso_alex.png', name: "Alex", emotion: "curieux" },
                        right: null
                    },
                    speaker: "Alex",
                    text: "Oh, bonjour ! Tu es nouveau ici ? Je m'appelle Alex.",
                    choices: [
                        { text: "Salut ! Ravi de te rencontrer", next: 3, effects: { alex: 10 } },
                        { text: "Oui, je cherche ma classe", next: 4, effects: { alex: 5 } }
                    ]
                }
            ]
        };
    }

    // 🎯 SYSTÈME DE NAVIGATION
    showScreen(screenName) {
        console.log("Navigation vers:", screenName);
        
        // Cache tous les écrans
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Montre l'écran demandé
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            this.gameData.currentScreen = screenName;
            this.updateScreen(screenName);
        }
    }

    updateScreen(screenName) {
        switch(screenName) {
            case 'wardrobe':
                this.updateWardrobe();
                break;
            case 'bedroom':
                this.updateBedroom();
                break;
            case 'gameScreen':
                this.loadScene();
                break;
        }
    }

    // 🎭 SYSTÈME D'HISTOIRE
    startStory(storyId) {
        this.showScreen('gameScreen');
        this.gameData.storyProgress[storyId].currentScene = 0;
        this.loadScene();
    }

    loadScene() {
        const story = this.story.saison1;
        const sceneId = this.gameData.storyProgress.saison1.currentScene;
        const scene = story[sceneId];
        
        if (!scene) {
            this.endChapter();
            return;
        }

        // Met à jour le dialogue
        document.getElementById('speakerName').textContent = scene.speaker;
        document.getElementById('dialogueText').textContent = scene.text;
        
        // Met à jour les choix
        this.displayChoices(scene.choices);
    }

    displayCharacters(characters) {
        // Pour l'instant avec émojis
        document.getElementById('characterLeft').textContent = characters.left ? '👨‍🎓' : '';
        document.getElementById('characterRight').textContent = characters.right ? '👩‍🎓' : '';
    }

    displayChoices(choices) {
        const container = document.getElementById('choicesContainer');
        container.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(choice);
            container.appendChild(button);
        });
    }

    makeChoice(choice) {
        if (choice.effects) {
            Object.entries(choice.effects).forEach(([key, value]) => {
                if (!this.gameData.relationships[key]) this.gameData.relationships[key] = 0;
                this.gameData.relationships[key] += value;
            });
        }

        this.gameData.storyProgress.saison1.currentScene = choice.next;
        this.loadScene();
        this.saveGame();
    }

    // 👗 GARDE-ROBE
    updateWardrobe() {
        document.getElementById('outfitDisplay').textContent = this.getOutfitEmoji(this.gameData.player.currentOutfit);
    }

    changeOutfit(outfitId) {
        if (this.gameData.player.outfits.includes(outfitId)) {
            this.gameData.player.currentOutfit = outfitId;
            this.updateWardrobe();
        }
    }

    getOutfitEmoji(outfitId) {
        const emojis = ['👚', '👗', '🥻', '👘'];
        return emojis[outfitId] || '👚';
    }

    // 🏠 CHAMBRE
    updateBedroom() {
        document.getElementById('roomPet').textContent = '🐱';
    }

    // 💾 SAUVEGARDE
    saveGame() {
        const saveData = btoa(JSON.stringify(this.gameData));
        localStorage.setItem('romanceAcademySave', saveData);
    }

    loadGame() {
        const saved = localStorage.getItem('romanceAcademySave');
        if (saved) {
            try {
                this.gameData = { ...this.gameData, ...JSON.parse(atob(saved)) };
            } catch (e) {
                console.log('Nouvelle partie');
            }
        }
    }

    generateSaveCode() {
        const saveCode = btoa(JSON.stringify(this.gameData));
        alert(`💾 CODE DE SAUVEGARDE :\n\n${saveCode}`);
        return saveCode;
    }

    endChapter() {
        alert('🎉 Chapitre terminé !');
        this.showScreen('mainMenu');
    }
}

// 🚀 INITIALISATION
let game;

// FONCTIONS GLOBALES
function showScreen(screenName) {
    if (game) game.showScreen(screenName);
}

function startStory(storyId) {
    if (game) game.startStory(storyId);
}

function changeOutfit(outfitId) {
    if (game) game.changeOutfit(outfitId);
}

function saveGame() {
    if (game) game.saveGame();
}

function generateSaveCode() {
    if (game) game.generateSaveCode();
}

function showSettings() {
    showScreen('settings');
}

// DÉMARRAGE
document.addEventListener('DOMContentLoaded', function() {
    game = new RomanceGame();
    game.init();
});
