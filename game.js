// 🎮 SYSTÈME DE JEU COMPLET - ROMANCE ACADEMY

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
        this.init();
    }

    init() {
        this.loadGame();
        this.showScreen('loadingScreen');
        
        // Simulation du chargement
        setTimeout(() => {
            this.showScreen('mainMenu');
        }, 3000);
    }

    createStory() {
        return {
            saison1: [
                {
                    background: 'fond-academie.jpg',
                    characters: {
                        left: { image: 'perso_alex.png', position: 'left' },
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
                        left: { image: 'perso_alex.png', position: 'left' },
                        right: null
                    },
                    speaker: "Alex",
                    text: "Oh, bonjour ! Tu es nouveau ici ? Je m'appelle Alex.",
                    choices: [
                        { text: \"Salut ! Je m'appelle...\", next: 3, effects: { alex: 10 } },
                        { text: "Oui, je cherche ma classe", next: 4, effects: { alex: 5 } }
                    ]
                }
            ]
        };
    }

    // 🎯 SYSTÈME DE NAVIGATION
    showScreen(screenName) {
        // Cache tous les écrans
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Montre l'écran demandé
        document.getElementById(screenName).classList.remove('hidden');
        this.gameData.currentScreen = screenName;
        
        // Met à jour l'interface selon l'écran
        this.updateScreen(screenName);
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

        // Met à jour le fond
        document.getElementById('gameBackground').style.backgroundImage = `url('${scene.background}')`;
        
        // Met à jour les personnages
        this.displayCharacters(scene.characters);
        
        // Met à jour le dialogue
        document.getElementById('speakerName').textContent = scene.speaker;
        document.getElementById('dialogueText').textContent = scene.text;
        
        // Met à jour les choix
        this.displayChoices(scene.choices);
    }

    displayCharacters(characters) {
        // Implémente l'affichage des personnages
        // Pour l'instant, on utilise des émojis
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
        // Applique les effets
        if (choice.effects) {
            Object.entries(choice.effects).forEach(([key, value]) => {
                if (!this.gameData.relationships[key]) this.gameData.relationships[key] = 0;
                this.gameData.relationships[key] += value;
            });
        }

        // Passe à la scène suivante
        this.gameData.storyProgress.saison1.currentScene = choice.next;
        this.loadScene();
        this.saveGame();
    }

    // 👗 SYSTÈME GARDE-ROBE
    updateWardrobe() {
        document.getElementById('outfitDisplay').textContent = this.getOutfitEmoji(this.gameData.player.currentOutfit);
        
        // Met à jour la sélection des tenues
        document.querySelectorAll('.outfit-item').forEach((item, index) => {
            if (index === this.gameData.player.currentOutfit) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
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

    // 🏠 SYSTÈME CHAMBRE
    updateBedroom() {
        // Met à jour l'affichage de la chambre
        document.getElementById('roomPet').textContent = '🐱'; // Ton animal
    }

    // 💾 SYSTÈME DE SAUVEGARDE
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
                console.log('Aucune sauvegarde trouvée');
            }
        }
    }

    generateSaveCode() {
        const saveCode = btoa(JSON.stringify(this.gameData));
        alert(`💾 CODE DE SAUVEGARDE :\n\n${saveCode}\n\nCopie ce code pour reprendre ta partie !`);
        return saveCode;
    }

    loadFromCode() {
        const code = prompt('Colle ton code de sauvegarde :');
        if (code) {
            try {
                this.gameData = JSON.parse(atob(code));
                this.showScreen('mainMenu');
                alert('✅ Partie chargée avec succès !');
            } catch (e) {
                alert('❌ Code invalide !');
            }
        }
    }

    endChapter() {
        alert('🎉 Chapitre terminé !\n\nRetour au menu principal.');
        this.showScreen('mainMenu');
    }
}

// 🚀 INITIALISATION DU JEU
let game;

// Fonctions globales pour les boutons HTML
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

function makeChoice(choiceIndex) {
    // Géré par la classe
}

function showSettings() {
    showScreen('settings');
}

// Démarrage du jeu
document.addEventListener('DOMContentLoaded', function() {
    game = new RomanceGame();
});
