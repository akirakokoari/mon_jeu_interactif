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
                // SCÈNE 0
                {
                    background: 'fond-academie.jpg',
                    characters: {
                        left: { name: "Alex", emotion: "sourire" },
                        right: null
                    },
                    speaker: "Narrateur",
                    text: "Tu arrives devant l'Académie des Arts, le cœur battant. Cet endroit est magnifique, avec ses vitraux colorés et ses jardins bien entretenus...",
                    choices: [
                        { text: "Prendre une grande inspiration et entrer", next: 1, effects: { courage: 5 } },
                        { text: "Observer les autres étudiants avant d'entrer", next: 2, effects: { observation: 5 } },
                        { text: "Vérifier son apparence dans le reflet de la porte", next: 3, effects: { confiance: 3 } }
                    ]
                },
                // SCÈNE 1
                {
                    background: 'fond-couloir.jpg',
                    characters: {
                        left: { name: "Alex", emotion: "curieux" },
                        right: null
                    },
                    speaker: "Alex",
                    text: "Oh, bonjour ! Je ne t'ai jamais vu ici. Tu es nouveau ? Je m'appelle Alex, je suis en section peinture.",
                    choices: [
                        { text: \"Salut ! Je m'appelle... Ravi de te rencontrer !\", next: 4, effects: { alex: 10 } },
                        { text: "Oui, je viens d'arriver. C'est immense ici !", next: 5, effects: { alex: 5 } },
                        { text: "Je cherche la salle de dessin, tu saurais où c'est ?", next: 6, effects: { alex: 7 } }
                    ]
                },
                // SCÈNE 4
                {
                    background: 'fond-couloir.jpg',
                    characters: {
                        left: { name: "Alex", emotion: "sourire" },
                        right: null
                    },
                    speaker: "Alex",
                    text: \"Ravi de te rencontrer aussi ! Moi je passe la plupart de mon temps dans l'atelier de peinture. Tu aimes l'art ?\",
                    choices: [
                        { text: \"J'adore ! Surtout la peinture à l'huile\", next: 7, effects: { alex: 15, pointsCommuns: 10 } },
                        { text: \"Je débute, mais je suis très passionné\", next: 8, effects: { alex: 12, honnetete: 5 } },
                        { text: \"Je préfère la musique, en fait\", next: 9, effects: { alex: 8 } }
                    ]
                },
                // SCÈNE 7
                {
                    background: 'fond-atelier.jpg',
                    characters: {
                        left: { name: "Alex", emotion: "enthousiaste" },
                        right: null
                    },
                    speaker: "Alex",
                    text: "Vraiment ? La peinture à l'huile c'est ma spécialité ! Je pourrais te montrer quelques techniques si tu veux. J'ai justement un projet en cours...",
                    choices: [
                        { text: "Avec plaisir ! J'aimerais beaucoup apprendre", next: 10, effects: { alex: 20 } },
                        { text: "Peut-être une autre fois, je dois d'abord m'installer", next: 11, effects: { alex: 5 } },
                        { text: "Montre-moi ton projet !", next: 12, effects: { alex: 18, curiosite: 10 } }
                    ]
                },
                // SCÈNE 10 - FIN DU CHAPITRE
                {
                    background: 'fond-atelier.jpg',
                    characters: {
                        left: { name: "Alex", emotion: "heureux" },
                        right: null
                    },
                    speaker: "Alex",
                    text: "Parfait ! Rendez-vous demain à 14h dans l'atelier. Et bienvenue à l'académie ! J'ai l'impression qu'on va bien s'entendre...",
                    choices: [
                        { text: "À demain !", next: 13, effects: { alex: 25 } }
                    ]
                }
            ]
        };
    }

    // 🎯 SYSTÈME DE NAVIGATION
    showScreen(screenName) {
        console.log("🔁 Navigation vers:", screenName);
        
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
        } else {
            console.error("❌ Écran non trouvé:", screenName);
        }
    }

    updateScreen(screenName) {
        console.log("🔄 Mise à jour de l'écran:", screenName);
        
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
            case 'social':
                this.updateSocial();
                break;
        }
    }

    // 🎭 SYSTÈME D'HISTOIRE
    startStory(storyId) {
        console.log("📖 Début de l'histoire:", storyId);
        this.showScreen('gameScreen');
        this.gameData.storyProgress[storyId].currentScene = 0;
        this.loadScene();
    }

    loadScene() {
        const story = this.story.saison1;
        const sceneId = this.gameData.storyProgress.saison1.currentScene;
        const scene = story[sceneId];
        
        console.log("🎬 Chargement scène:", sceneId, scene);
        
        if (!scene) {
            this.endChapter();
            return;
        }

        // Met à jour le dialogue
        document.getElementById('speakerName').textContent = scene.speaker;
        document.getElementById('dialogueText').textContent = scene.text;
        
        // Met à jour les personnages
        this.displayCharacters(scene.characters);
        
        // Met à jour les choix
        this.displayChoices(scene.choices);
    }

    displayCharacters(characters) {
        console.log("👥 Affichage personnages:", characters);
        
        const leftChar = document.getElementById('characterLeft');
        const rightChar = document.getElementById('characterRight');
        
        // Personnage de gauche
        if (characters.left) {
            leftChar.innerHTML = `
                <div class="character-avatar">${this.getCharacterEmoji(characters.left.name)}</div>
                <div class="character-name">${characters.left.name}</div>
                <div class="character-emotion">${this.getEmotionEmoji(characters.left.emotion)}</div>
            `;
            leftChar.style.display = 'block';
        } else {
            leftChar.style.display = 'none';
        }
        
        // Personnage de droite
        if (characters.right) {
            rightChar.innerHTML = `
                <div class="character-avatar">${this.getCharacterEmoji(characters.right.name)}</div>
                <div class="character-name">${characters.right.name}</div>
                <div class="character-emotion">${this.getEmotionEmoji(characters.right.emotion)}</div>
            `;
            rightChar.style.display = 'block';
        } else {
            rightChar.style.display = 'none';
        }
    }

    getCharacterEmoji(name) {
        const emojis = {
            'Alex': '👨‍🎓',
            'Sophia': '👩‍🎓',
            'Lucas': '👨‍💼',
            'Emma': '👩‍🍳'
        };
        return emojis[name] || '👤';
    }

    getEmotionEmoji(emotion) {
        const emotions = {
            'sourire': '😊',
            'heureux': '😄',
            'triste': '😢',
            'colere': '😠',
            'surpris': '😲',
            'curieux': '🤔',
            'neutre': '😐',
            'enthousiaste': '🤩',
            'timide': '😳'
        };
        return emotions[emotion] || '😐';
    }

    displayChoices(choices) {
        const container = document.getElementById('choicesContainer');
        container.innerHTML = '';
        
        console.log("📝 Affichage des choix:", choices);
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(choice);
            container.appendChild(button);
        });
    }

    makeChoice(choice) {
        console.log("✅ Choix fait:", choice);
        
        // Applique les effets
        if (choice.effects) {
            Object.entries(choice.effects).forEach(([key, value]) => {
                if (!this.gameData.relationships[key]) this.gameData.relationships[key] = 0;
                this.gameData.relationships[key] += value;
                console.log(`📊 ${key} +${value} = ${this.gameData.relationships[key]}`);
            });
        }

        // Passe à la scène suivante
        this.gameData.storyProgress.saison1.currentScene = choice.next;
        this.loadScene();
        this.saveGame();
    }

    // 👗 SYSTÈME GARDE-ROBE
    updateWardrobe() {
        console.log("👗 Mise à jour garde-robe");
        document.getElementById('outfitDisplay').textContent = this.getOutfitEmoji(this.gameData.player.currentOutfit);
        
        // Met à jour la sélection active
        document.querySelectorAll('.outfit-item').forEach((item, index) => {
            if (index === this.gameData.player.currentOutfit) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    changeOutfit(outfitId) {
        console.log("🔄 Changement de tenue:", outfitId);
        if (this.gameData.player.outfits.includes(outfitId)) {
            this.gameData.player.currentOutfit = outfitId;
            this.updateWardrobe();
            this.saveGame();
        }
    }

    getOutfitEmoji(outfitId) {
        const emojis = ['👚', '👗', '🥻', '👘'];
        return emojis[outfitId] || '👚';
    }

    // 🏠 SYSTÈME CHAMBRE
    updateBedroom() {
        console.log("🏠 Mise à jour chambre");
        document.getElementById('roomPet').textContent = '🐱';
    }

    // 👥 RÉSEAU SOCIAL
    updateSocial() {
        console.log("👥 Mise à jour réseau social");
        // À implémenter
    }

    // 💾 SYSTÈME DE SAUVEGARDE
    saveGame() {
        const saveData = btoa(JSON.stringify(this.gameData));
        localStorage.setItem('romanceAcademySave', saveData);
        console.log("💾 Jeu sauvegardé");
    }

    loadGame() {
        const saved = localStorage.getItem('romanceAcademySave');
        if (saved) {
            try {
                const loadedData = JSON.parse(atob(saved));
                this.gameData = { ...this.gameData, ...loadedData };
                console.log("📂 Partie chargée:", this.gameData);
            } catch (e) {
                console.log("🆕 Nouvelle partie - aucune sauvegarde trouvée");
            }
        }
    }

    generateSaveCode() {
        const saveCode = btoa(JSON.stringify(this.gameData));
        alert(`💾 CODE DE SAUVEGARDE :\n\n${saveCode}\n\nCopie ce code pour reprendre ta partie plus tard !`);
        console.log("📋 Code de sauvegarde généré");
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
        const alexPoints = this.gameData.relationships.alex || 0;
        let message = "🎉 Chapitre terminé !\n\n";
        message += `Points Alex: ${alexPoints}/100\n`;
        
        if (alexPoints >= 50) {
            message += "\n🌟 Alex semble vraiment t'apprécier !";
        } else {
            message += "\n💫 Tu as fait sa connaissance, continue comme ça !";
        }
        
        alert(message);
        this.showScreen('mainMenu');
    }
}

// 🚀 INITIALISATION DU JEU
let game;

// FONCTIONS GLOBALES POUR LES BOUTONS HTML
function showScreen(screenName) {
    if (game) {
        game.showScreen(screenName);
    } else {
        console.error("❌ Jeu non initialisé");
    }
}

function startStory(storyId) {
    if (game) {
        game.startStory(storyId);
    }
}

function changeOutfit(outfitId) {
    if (game) {
        game.changeOutfit(outfitId);
    }
}

function saveGame() {
    if (game) {
        game.saveGame();
        alert('💾 Jeu sauvegardé !');
    }
}

function generateSaveCode() {
    if (game) {
        game.generateSaveCode();
    }
}

function showSettings() {
    showScreen('settings');
}

function makeChoice(choiceIndex) {
    // Cette fonction est gérée par la classe
    console.log("Choix via ancien système - à ignorer");
}

// DÉMARRAGE AUTOMATIQUE DU JEU
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Démarrage du jeu...");
    game = new RomanceGame();
    game.init();
});

// Redémarrage manuel si besoin
function restartGame() {
    game = new RomanceGame();
    game.init();
}
