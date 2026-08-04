// Données des invités depuis Google Sheets
// Importation via lien public ou intégration API
const guestData = [
    { firstName: 'Jean', lastName: 'Dupont', table: 1 },
    { firstName: 'Marie', lastName: 'Dupont', table: 1 },
    { firstName: 'Pierre', lastName: 'Martin', table: 1 },
    { firstName: 'Sophie', lastName: 'Bernard', table: 1 },
    { firstName: 'Luc', lastName: 'Moreau', table: 1 },
    { firstName: 'Isabelle', lastName: 'Moreau', table: 1 },
    { firstName: 'Claude', lastName: 'Renard', table: 1 },
    { firstName: 'Nathalie', lastName: 'Gaston', table: 1 },
    
    { firstName: 'Michel', lastName: 'Laurent', table: 2 },
    { firstName: 'Véronique', lastName: 'Laurent', table: 2 },
    { firstName: 'François', lastName: 'Lefevre', table: 2 },
    { firstName: 'Christine', lastName: 'Arnaud', table: 2 },
    { firstName: 'Alain', lastName: 'Deschamps', table: 2 },
    { firstName: 'Nicole', lastName: 'Deschamps', table: 2 },
    { firstName: 'Robert', lastName: 'Faure', table: 2 },
    { firstName: 'Sylvie', lastName: 'Gibert', table: 2 },
    
    { firstName: 'Jacques', lastName: 'Mercier', table: 3 },
    { firstName: 'Danielle', lastName: 'Mercier', table: 3 },
    { firstName: 'Guy', lastName: 'Hubert', table: 3 },
    { firstName: 'Monique', lastName: 'Jolivet', table: 3 },
    { firstName: 'Georges', lastName: 'Keller', table: 3 },
    { firstName: 'Françoise', lastName: 'Keller', table: 3 },
    { firstName: 'Henri', lastName: 'Lalande', table: 3 },
    { firstName: 'Jacqueline', lastName: 'Marchand', table: 3 },
    
    { firstName: 'Yves', lastName: 'Noel', table: 4 },
    { firstName: 'Martine', lastName: 'Noel', table: 4 },
    { firstName: 'Patrick', lastName: 'Olivier', table: 4 },
    { firstName: 'Brigitte', lastName: 'Perrot', table: 4 },
    { firstName: 'René', lastName: 'Quentin', table: 4 },
    { firstName: 'Simone', lastName: 'Quentin', table: 4 },
    { firstName: 'Serge', lastName: 'Remy', table: 4 },
    { firstName: 'Valérie', lastName: 'Saunier', table: 4 },
    
    { firstName: 'Thierry', lastName: 'Tavernier', table: 5 },
    { firstName: 'Stéphanie', lastName: 'Tavernier', table: 5 },
    { firstName: 'Olivier', lastName: 'Ugo', table: 5 },
    { firstName: 'Cécile', lastName: 'Valentin', table: 5 },
    { firstName: 'Xavier', lastName: 'Weiss', table: 5 },
    { firstName: 'Aurore', lastName: 'Weiss', table: 5 },
    { firstName: 'Yannick', lastName: 'Xavier', table: 5 },
    { firstName: 'Zoé', lastName: 'Zacharie', table: 5 },
    
    { firstName: 'André', lastName: 'Adams', table: 6 },
    { firstName: 'Ève', lastName: 'Adams', table: 6 },
    { firstName: 'Bruno', lastName: 'Blanc', table: 6 },
    { firstName: 'Chantal', lastName: 'Caron', table: 6 },
    { firstName: 'Dominique', lastName: 'David', table: 6 },
    { firstName: 'Elise', lastName: 'David', table: 6 },
    { firstName: 'Frédéric', lastName: 'Fabre', table: 6 },
    { firstName: 'Geneviève', lastName: 'Gautier', table: 6 },
    
    { firstName: 'Hadrien', lastName: 'Henry', table: 7 },
    { firstName: 'Hortense', lastName: 'Henry', table: 7 },
    { firstName: 'Ignace', lastName: 'Innocent', table: 7 },
    { firstName: 'Janine', lastName: 'Jobert', table: 7 },
    { firstName: 'Kevin', lastName: 'Koutsis', table: 7 },
    { firstName: 'Léa', lastName: 'Koutsis', table: 7 },
    { firstName: 'Mathieu', lastName: 'Leblanc', table: 7 },
    { firstName: 'Noemie', lastName: 'Lemaire', table: 7 }
];

// Normalisation des chaînes
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim();
}

// Calcul distance Levenshtein
function levenshtein(a, b) {
    const aLen = a.length;
    const bLen = b.length;
    const matrix = [];
    
    for (let i = 0; i <= aLen; i++) matrix[i] = [i];
    for (let j = 0; j <= bLen; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= aLen; i++) {
        for (let j = 1; j <= bLen; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    
    return matrix[aLen][bLen];
}

// Recherche intelligente
function searchGuests(query) {
    if (!query || query.length < 1) return [];
    
    const normalized = normalizeString(query);
    const results = [];
    
    guestData.forEach(guest => {
        const firstName = normalizeString(guest.firstName);
        const lastName = normalizeString(guest.lastName);
        const fullName = `${firstName} ${lastName}`;
        
        // Exacte
        if (firstName === normalized || lastName === normalized || fullName === normalized) {
            results.push({ guest, score: 100 });
            return;
        }
        
        // Fuzzy
        const fnScore = 100 - (levenshtein(firstName, normalized) * 10);
        const lnScore = 100 - (levenshtein(lastName, normalized) * 10);
        const fullScore = 100 - (levenshtein(fullName, normalized) * 10);
        
        const maxScore = Math.max(fnScore, lnScore, fullScore);
        
        if (maxScore > 50) {
            results.push({ guest, score: maxScore });
        }
    });
    
    return results.sort((a, b) => b.score - a.score);
}