// === SYSTÈME DE JEU PROFESSIONNEL ===
class RomanceGame {
    constructor() {
        this.gameData = {
            scene: 0,
            alex: 0,
            sophia: 0,
            lucas: 0,
            diamonds: 150,
            lovePoints: 50,
            level: 1,
            currentOutfit: 0,
            outfits: [0, 1, 2],
            inventory: [],
            bedroom: {
                decorations: ['bed', 'desk', 'plant'],
                pet: '🐱'
            }
        };
        
        this.story = this.createStory();
        this.init();
    }

    init() {
        this.loadGame();
        this.updateStats();
    }

    createStory() {
        return [
            // CHAPITRE 1 - LA RENCONTRE
            {
                background: 'linear-gradient(135deg, #87ceeb, #98fb98)',
                characters: {
                    left: null,
                    right: null
                },
                speaker: "Narrateur",
                text: "Tu te tiens devant les imposantes portes de l'Académie Romance. Le soleil caresse les vitraux colorés, créant des reflets irisés sur le sol de marbre. Tu sens ton cœur battre la chamade alors que tu contemples ce bâtiment majestueux... C'est ton premier jour, et tout semble possible.",
                choices: [
                    { text: "Prendre une profonde inspiration et pousser les lourdes portes en chêne", next: 1, effects: { courage: 5 } },
                    { text: "Observer les autres étudiants élégants qui entrent et sortent", next: 2, effects: { observation: 5 } },
                    { text: "Vérifier son apparence dans le reflet doré des poignées de porte", next: 3, effects: { confiance: 3 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #ddc0b4, #e8d0c1)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: null
                },
                speaker: "Alex",
                text: "Oh, bonjour ! Je ne t'ai jamais vu ici. Tu dois être le nouveau dont tout le monde parle depuis une semaine. Je m'appelle Alex, je suis en section peinture. Ton style est... plutôt unique, j'aime beaucoup !",
                choices: [
                    { text: "Merci ! Je m'appelle... Ravi de te rencontrer ! Tu as l'air très talentueux", next: 4, effects: { alex: 15, charisme: 5 } },
                    { text: "Oui, je viens d'arriver. C'est immense ici ! Un peu intimidant, non ?", next: 5, effects: { alex: 10, honnêteté: 3 } },
                    { text: "Tout le monde parle de moi ? Dans quel sens ? Je suis curieux maintenant", next: 6, effects: { alex: 8, curiosité: 5 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #ddc0b4, #e8d0c1)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: null
                },
                speaker: "Alex",
                text: "Ravi de te rencontrer aussi ! Désolé si j'ai été un peu direct. C'est juste que... eh bien, on n'a pas souvent de nouveaux étudiants en milieu d'année. Les rumeurs courent vite ici. Tu viens d'où, si ce n'est pas indiscret ?",
                choices: [
                    { text: "D'une petite ville tranquille à la campagne. C'est très différent d'ici !", next: 7, effects: { alex: 12, authenticité: 5 } },
                    { text: "Je préfère garder un peu de mystère pour l'instant, si tu permets", next: 8, effects: { alex: 5, mystère: 8 } },
                    { text: "De la grande ville, mais c'est une longue histoire pleine de rebondissements", next: 9, effects: { alex: 10, intrigue: 7 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #ddc0b4, #e8d0c1)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: { name: "Sophia", avatar: "👩‍🎓" }
                },
                speaker: "Sophia",
                text: "Alex ! En train d'embêter les nouveaux déjà ? Laisse-le respirer un peu avant de l'accabler de questions ! Désolée, Alex peut être un peu... enthousiaste quand il rencontre de nouvelles personnes. Moi c'est Sophia, je suis la préfète de l'académie.",
                choices: [
                    { text: "Pas de problème, Alex est très sympathique ! On faisait juste connaissance", next: 10, effects: { alex: 10, sophia: 15, diplomatie: 8 } },
                    { text: "Merci de venir à mon secours ! Il était en train de m'interroger comme un suspect", next: 11, effects: { sophia: 20, alex: -5, humour: 6 } },
                    { text: "Je me débrouillais très bien, mais ton intervention est la bienvenue", next: 12, effects: { sophia: 10, alex: 5, confiance: 7 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #ddc0b4, #e8d0c1)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: { name: "Sophia", avatar: "👩‍🎓" }
                },
                speaker: "Sophia",
                text: "Dans tous les cas, bienvenue officiellement à l'Académie Romance ! Je peux te faire visiter si tu veux. Les couloirs peuvent être un vrai labyrinthe pour les nouveaux, et je connais tous les raccourcis secrets.",
                choices: [
                    { text: "Avec plaisir ! Une visite guidée par la préfète elle-même, c'est un honneur", next: 13, effects: { sophia: 15, respect: 8 } },
                    { text: "Je devrais peut-être d'abord trouver ma chambre et me poser un peu...", next: 14, effects: { sophia: 8, prudence: 5 } },
                    { text: "Alex, tu veux bien nous accompagner ? À deux guides, ce sera encore mieux", next: 15, effects: { alex: 12, sophia: 10, sociabilité: 10 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #aec6cf, #b19cd9)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: { name: "Sophia", avatar: "👩‍🎓" }
                },
                speaker: "Alex",
                text: "Bien sûr ! Je connais tous les coins secrets de cette académie. Je peux vous montrer l'atelier de peinture, c'est mon endroit préféré ! Les fenêtres donnent sur les jardins, et la lumière y est magnifique en fin d'après-midi.",
                choices: [
                    { text: "J'adorerais voir ton atelier ! Je suis curieux de découvrir ton univers artistique", next: 16, effects: { alex: 20, intérêt: 10 } },
                    { text: "Je suivrai Sophia pour la visite officielle d'abord, mais on pourra y aller après", next: 17, effects: { sophia: 15, politesse: 8 } },
                    { text: "Pourquoi ne pas faire les deux ? Commençons par la visite puis allons à l'atelier", next: 18, effects: { alex: 10, sophia: 10, enthousiasme: 12 } }
                ]
            },
            {
                background: 'linear-gradient(135deg, #aec6cf, #b19cd9)',
                characters: {
                    left: { name: "Alex", avatar: "👨‍🎨" },
                    right: { name: "Sophia", avatar: "👩‍🎓" }
                },
                speaker: "Sophia",
                text: "Parfait ! Commençons par le hall principal, puis la bibliothèque, les salles de classe, et enfin l'atelier d'Alex. Au fait, as-tu déjà choisi ta spécialisation ? Beaux-arts, musique, danse, ou littérature ?",
                choices: [
                    { text: "Je penche pour les beaux-arts, la peinture m'a toujours fasciné", next: 19, effects: { alex: 15, sophia: 5 } },
                    { text: "La musique, je joue du piano depuis mon enfance", next: 20, effects: { sophia: 10 } },
                    { text: "Je n'ai pas encore décidé, j'aimerais tout explorer d'abord", next: 21, effects: { sophia: 8, alex: 8 } }
                ]
            }
        ];
    }

    // === SYSTÈME DE NAVIGATION ===
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenName).classList.add('active');
        this.updateScreen(screenName);
    }

    updateScreen(screenName) {
        switch(screenName) {
            case 'gameScreen':
                this.loadScene();
                break;
            case 'wardrobe':
                this.updateWardrobe();
                break;
            case 'bedroom':
                this.updateBedroom();
                break;
        }
        this.updateStats();
    }

    updateStats() {
        document.getElementById('lovePoints').textContent = this.gameData.lovePoints;
        document.getElementById('diamonds').textContent = this.gameData.diamonds;
        document.getElementById('level').textContent = this.gameData.level;
    }

    // === SYSTÈME D'HISTOIRE ===
    startStory() {
        this.showScreen('gameScreen');
        this.gameData.scene = 0;
        this.loadScene();
    }

    loadScene() {
        const scene = this.story[this.gameData.scene];
        if (!scene) {
            this.endChapter();
            return;
        }

        // Met à jour le fond
        document.getElementById('gameBackground').style.background = scene.background;

        // Met à jour les personnages
        this.displayCharacters(scene.characters);

        // Met à jour le dialogue
        document.getElementById('speakerName').textContent = scene.speaker;
        document.getElementById('dialogueText').textContent = scene.text;

        // Met à jour les choix
        this.displayChoices(scene.choices);
    }

    displayCharacters(characters) {
        const leftChar = document.getElementById('characterLeft');
        const rightChar = document.getElementById('characterRight');
        const leftName = document.getElementById('characterLeftName');
        const rightName = document.getElementById('characterRightName');

        // Personnage gauche
        if (characters.left) {
            leftChar.querySelector('.character-avatar').textContent = characters.left.avatar;
            leftName.textContent = characters.left.name;
            leftChar.style.display = 'block';
        } else {
            leftChar.style.display = 'none';
        }

        // Personnage droite
        if (characters.right) {
            rightChar.querySelector('.character-avatar').textContent = characters.right.avatar;
            rightName.textContent = characters.right.name;
            rightChar.style.display = 'block';
        } else {
            rightChar.style.display = 'none';
        }
    }

    displayChoices(choices) {
        const container = document.getElementById('choicesContainer');
        container.innerHTML = '';

        choices.forEach(choice => {
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
                if (!this.gameData[key]) this.gameData[key] = 0;
                this.gameData[key] += value;
            });
        }

        // Animation de feedback
        this.showChoiceEffect(choice.effects);

        // Passe à la scène suivante
        this.gameData.scene = choice.next;
        this.loadScene();
        this.updateStats();
        this.saveGame();
    }

    showChoiceEffect(effects) {
        if (!effects) return;
        
        let message = "";
        Object.entries(effects).forEach(([key, value]) => {
            if (value > 0 && ['alex', 'sophia', 'lucas', 'lovePoints'].includes(key)) {
                message += `+${value} ${this.getRelationName(key)}\n`;
            }
        });
        
        if (message) {
            this.showNotification(message, '#ff9eb5');
        }
    }

    getRelationName(key) {
