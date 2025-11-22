// 🎭 SYSTÈME D'HISTOIRE SIMPLE
class HistoireManager {
    constructor() {
        this.sceneActuelle = 0;
        this.saisonActuelle = 1;
        this.relations = {};
        this.init();
    }

    init() {
        this.scenes = this.creerScenes();
        this.afficherScene(0);
    }

    creerScenes() {
        return [
            // SCÈNE 0 - INTRODUCTION
            {
                personnage: "Narrateur",
                message: "Tu arrives devant les portes de l'Académie Royale des Arts. Le bâtiment est magnifique, mais tu sens une pointe de nervosité...",
                choix: [
                    { texte: "Prendre une grande inspiration et entrer", next: 1, effets: { courage: 5 } },
                    { texte: "Observer les autres étudiants d'abord", next: 2, effets: { observation: 5 } },
                    { texte: "Chercher quelqu'un pour demander son chemin", next: 3, effets: { sociabilite: 5 } }
                ]
            },

            // SCÈNE 1 - INTÉRIEUR ACADÉMIE
            {
                personnage: "Narrateur", 
                message: "L'intérieur est encore plus impressionnant. Des tableaux magnifiques ornent les murs. Un étudiant semble t'avoir remarqué...",
                choix: [
                    { texte: "Sourire timidement", next: 4, effets: { alex: 10 } },
                    { texte: "Détourner le regard", next: 5, effets: { alex: 0 } },
                    { texte: "Aller vers lui", next: 6, effets: { alex: 15, courage: 5 } }
                ]
            },

            // SCÈNE 4 - RENCONTRE ALEX
            {
                personnage: "Alex",
                message: "Salut ! Je ne t'ai jamais vu ici. Tu es nouveau ? Je m'appelle Alex, je suis en section peinture.",
                choix: [
                    { texte: \"Ravi de te rencontrer ! Je m'appelle [Ton Nom]\", next: 7, effets: { alex: 20 } },
                    { texte: "Oui, je viens d'arriver. C'est immense ici !", next: 8, effets: { alex: 15 } },
                    { texte: "Je cherche la salle de dessin...", next: 9, effets: { alex: 10 } }
                ]
            },

            // SCÈNE 7 - PREMIÈRE CONVERSATION
            {
                personnage: "Alex",
                message: \"[Ton Nom], joli prénom ! Moi je passe mon temps dans l'atelier de peinture. Tu aimes l'art ?\",
                choix: [
                    { texte: \"J'adore ! Surtout la peinture à l'huile\", next: 10, effets: { alex: 25, pointsCommuns: 10 } },
                    { texte: \"Je débute, mais je suis passionné\", next: 11, effets: { alex: 20, honnetete: 5 } },
                    { texte: \"Je préfère la musique, en fait\", next: 12, effets: { alex: 10 } }
                ]
            }
        ];
    }

    afficherScene(id) {
        const scene = this.scenes[id];
        if (!scene) {
            this.finChapitre();
            return;
        }

        // Met à jour l'interface
        document.getElementById('speaker').textContent = scene.personnage;
        document.getElementById('message').textContent = scene.message;

        // Affiche les choix
        const container = document.getElementById('choicesContainer');
        container.innerHTML = '';

        scene.choix.forEach((choix, index) => {
            const btn = document.createElement('div');
            btn.className = 'choice';
            btn.textContent = choix.texte;
            btn.onclick = () => this.faireChoix(choix);
            container.appendChild(btn);
        });

        this.sceneActuelle = id;
    }

    faireChoix(choix) {
        // Applique les effets
        if (choix.effets) {
            Object.entries(choix.effets).forEach(([key, value]) => {
                if (!this.relations[key]) this.relations[key] = 0;
                this.relations[key] += value;
            });
        }

        // Animation simple
        this.showFeedback(choix.effets);

        // Scene suivante
        setTimeout(() => {
            this.afficherScene(choix.next);
        }, 500);
    }

    showFeedback(effets) {
        console.log("Effets du choix:", effets);
        // Tu peux ajouter des animations ici
    }

    finChapitre() {
        alert("🎉 Fin du chapitre !\n\n" +
              `Progression relations:\n` +
              `Alex: ${this.relations.alex || 0}/100\n` +
              `Courage: ${this.relations.courage || 0}/50`);
        
        // Recommencer ou sauvegarder
        this.sceneActuelle = 0;
        this.afficherScene(0);
    }
}

// 🚀 DÉMARRAGE DU JEU
let jeu;

function demarrerJeu() {
    jeu = new HistoireManager();
}

// Démarre quand la page est prête
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrerJeu);
} else {
    demarrerJeu();
}
