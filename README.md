# 🌸 Yoane & Marie-Aude - Site Compagnon de Mariage

Site web interactif et premium pour le mariage du 08 août 2026 à Menara Garden, Yopougon.

## 🎯 Caractéristiques principales

### 📱 Écran d'accueil immersif
- Présentation élégante du couple
- Carousel de photos du couple
- Verset biblique intégré
- Navigation fluide vers l'expérience principale

### 🪑 Trouver sa place
- Recherche intelligente des invités (fuzzy matching)
- Gestion des accents, tirets et majuscules
- Autocomplétion en temps réel
- Affichage personnalisé:
  - Numéro de table
  - Numéro de place
  - Liste des compagnons de table
  - Visualisation graphique de la table

### 🍽️ Saveurs de la réception
- Menu interactif avec plats ivoiriens
- Catégories: entrées, plats traditionnels, douceurs, boissons
- Design élégant et sans kitsch

### 💝 Informations utiles
- Présentation discrète des cadeaux
- Itinéraire recommandé avec 2 routes alternatives
- Carte Google Maps intégrée
- Notes sur les accès le jour de l'indépendance

## 🎨 Design & Thème

**Tropical Sunset**

Palette de couleurs:
- Blanc, Ivoire
- Rose poudré, Pêche
- Corail, Orange Sunset
- Touches dorées

### Typographie
- Headings: Playfair Display (élégant, chic)
- Body: Montserrat (lisible, moderne)

## 📱 Optimisation mobile

- Mobile first responsive design
- Optimisé pour connexion lente
- Service Worker pour mode hors ligne
- Chargement progressif des images
- Navigation par onglets au bottom

## 🔧 Structure technique

```
.
├── index.html          # Structure HTML
├── styles.css          # Styles CSS avec variables personnalisées
├── app.js              # Logique application (navigation, recherche)
├── data.js             # Données invités et fonctions de recherche
├── sw.js               # Service Worker pour cache/offline
└── README.md           # Ce fichier
```

## 👥 Données invités

Les données sont stockées dans `data.js`:
- 7 tables de 8 invités chacune
- Placement pré-défini
- Listes de compagnons de table

## 🔍 Recherche intelligente

Fonctionnalités de recherche:
- **Fuzzy matching**: trouve même avec fautes de frappe
- **Gestion des accents**: é, è, ê, ç, etc.
- **Variantes**: Marie-Aude = Marie Aude
- **Ordre flexible**: "Aude Marie" ou "Marie Aude"
- **Autocomplétion**: suggestions en temps réel

## 💾 Persistance

- LocalStorage pour places occupées
- Service Worker pour cache hors ligne
- Données préservées même sans internet

## 🚀 Installation & Déploiement

1. Cloner le repo
2. Configurer les données invités dans `data.js`
3. Personnaliser les images du couple
4. Publier sur GitHub Pages ou serveur

## 📖 Utilisation

### Pour les invités
1. Ouvrir le site
2. Cliquer "Entrer dans notre univers"
3. Entrer son prénom ou nom
4. Consulter sa place et ses compagnons
5. Explorer le menu et les infos

### Pour mettre à jour les données
Modifier `data.js`:
- Ajouter/supprimer des invités
- Modifier les placements
- Mettre à jour les compagnons

## 📊 Accessibilité

- Contraste élevé pour lisibilité
- Textes alternatifs sur images
- Navigation au clavier possible
- Responsive sur tous les appareils

## 💬 Support

Pour toute question sur le site, contactez les mariés.

---

**Thème**: Tropical Sunset 🌅
**Date**: 08 Août 2026
**Lieu**: Menara Garden, Yopougon