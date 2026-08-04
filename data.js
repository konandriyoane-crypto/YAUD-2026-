// Données des invités et placements
const guestData = [
    // Table 1
    { firstName: 'Jean', lastName: 'Dupont', table: 1, seat: 1, companions: ['Marie Dupont', 'Pierre Martin', 'Sophie Bernard'] },
    { firstName: 'Marie', lastName: 'Dupont', table: 1, seat: 2, companions: ['Jean Dupont', 'Pierre Martin', 'Sophie Bernard'] },
    { firstName: 'Pierre', lastName: 'Martin', table: 1, seat: 3, companions: ['Jean Dupont', 'Marie Dupont', 'Sophie Bernard'] },
    { firstName: 'Sophie', lastName: 'Bernard', table: 1, seat: 4, companions: ['Jean Dupont', 'Marie Dupont', 'Pierre Martin'] },
    { firstName: 'Luc', lastName: 'Moreau', table: 1, seat: 5, companions: ['Isabelle Moreau', 'Claude Renard', 'Nathalie Gaston'] },
    { firstName: 'Isabelle', lastName: 'Moreau', table: 1, seat: 6, companions: ['Luc Moreau', 'Claude Renard', 'Nathalie Gaston'] },
    { firstName: 'Claude', lastName: 'Renard', table: 1, seat: 7, companions: ['Luc Moreau', 'Isabelle Moreau', 'Nathalie Gaston'] },
    { firstName: 'Nathalie', lastName: 'Gaston', table: 1, seat: 8, companions: ['Luc Moreau', 'Isabelle Moreau', 'Claude Renard'] },
    
    // Table 2
    { firstName: 'Michel', lastName: 'Laurent', table: 2, seat: 1, companions: ['Véronique Laurent', 'François Lefevre', 'Christine Arnaud'] },
    { firstName: 'Véronique', lastName: 'Laurent', table: 2, seat: 2, companions: ['Michel Laurent', 'François Lefevre', 'Christine Arnaud'] },
    { firstName: 'François', lastName: 'Lefevre', table: 2, seat: 3, companions: ['Michel Laurent', 'Véronique Laurent', 'Christine Arnaud'] },
    { firstName: 'Christine', lastName: 'Arnaud', table: 2, seat: 4, companions: ['Michel Laurent', 'Véronique Laurent', 'François Lefevre'] },
    { firstName: 'Alain', lastName: 'Deschamps', table: 2, seat: 5, companions: ['Nicole Deschamps', 'Robert Faure', 'Sylvie Gibert'] },
    { firstName: 'Nicole', lastName: 'Deschamps', table: 2, seat: 6, companions: ['Alain Deschamps', 'Robert Faure', 'Sylvie Gibert'] },
    { firstName: 'Robert', lastName: 'Faure', table: 2, seat: 7, companions: ['Alain Deschamps', 'Nicole Deschamps', 'Sylvie Gibert'] },
    { firstName: 'Sylvie', lastName: 'Gibert', table: 2, seat: 8, companions: ['Alain Deschamps', 'Nicole Deschamps', 'Robert Faure'] },
    
    // Table 3
    { firstName: 'Jacques', lastName: 'Mercier', table: 3, seat: 1, companions: ['Danielle Mercier', 'Guy Hubert', 'Monique Jolivet'] },
    { firstName: 'Danielle', lastName: 'Mercier', table: 3, seat: 2, companions: ['Jacques Mercier', 'Guy Hubert', 'Monique Jolivet'] },
    { firstName: 'Guy', lastName: 'Hubert', table: 3, seat: 3, companions: ['Jacques Mercier', 'Danielle Mercier', 'Monique Jolivet'] },
    { firstName: 'Monique', lastName: 'Jolivet', table: 3, seat: 4, companions: ['Jacques Mercier', 'Danielle Mercier', 'Guy Hubert'] },
    { firstName: 'Georges', lastName: 'Keller', table: 3, seat: 5, companions: ['Françoise Keller', 'Henri Lalande', 'Jacqueline Marchand'] },
    { firstName: 'Françoise', lastName: 'Keller', table: 3, seat: 6, companions: ['Georges Keller', 'Henri Lalande', 'Jacqueline Marchand'] },
    { firstName: 'Henri', lastName: 'Lalande', table: 3, seat: 7, companions: ['Georges Keller', 'Françoise Keller', 'Jacqueline Marchand'] },
    { firstName: 'Jacqueline', lastName: 'Marchand', table: 3, seat: 8, companions: ['Georges Keller', 'Françoise Keller', 'Henri Lalande'] },
    
    // Table 4
    { firstName: 'Yves', lastName: 'Noel', table: 4, seat: 1, companions: ['Martine Noel', 'Patrick Olivier', 'Brigitte Perrot'] },
    { firstName: 'Martine', lastName: 'Noel', table: 4, seat: 2, companions: ['Yves Noel', 'Patrick Olivier', 'Brigitte Perrot'] },
    { firstName: 'Patrick', lastName: 'Olivier', table: 4, seat: 3, companions: ['Yves Noel', 'Martine Noel', 'Brigitte Perrot'] },
    { firstName: 'Brigitte', lastName: 'Perrot', table: 4, seat: 4, companions: ['Yves Noel', 'Martine Noel', 'Patrick Olivier'] },
    { firstName: 'René', lastName: 'Quentin', table: 4, seat: 5, companions: ['Simone Quentin', 'Serge Remy', 'Valérie Saunier'] },
    { firstName: 'Simone', lastName: 'Quentin', table: 4, seat: 6, companions: ['René Quentin', 'Serge Remy', 'Valérie Saunier'] },
    { firstName: 'Serge', lastName: 'Remy', table: 4, seat: 7, companions: ['René Quentin', 'Simone Quentin', 'Valérie Saunier'] },
    { firstName: 'Valérie', lastName: 'Saunier', table: 4, seat: 8, companions: ['René Quentin', 'Simone Quentin', 'Serge Remy'] },
    
    // Table 5
    { firstName: 'Thierry', lastName: 'Tavernier', table: 5, seat: 1, companions: ['Stéphanie Tavernier', 'Olivier Ugo', 'Cécile Valentin'] },
    { firstName: 'Stéphanie', lastName: 'Tavernier', table: 5, seat: 2, companions: ['Thierry Tavernier', 'Olivier Ugo', 'Cécile Valentin'] },
    { firstName: 'Olivier', lastName: 'Ugo', table: 5, seat: 3, companions: ['Thierry Tavernier', 'Stéphanie Tavernier', 'Cécile Valentin'] },
    { firstName: 'Cécile', lastName: 'Valentin', table: 5, seat: 4, companions: ['Thierry Tavernier', 'Stéphanie Tavernier', 'Olivier Ugo'] },
    { firstName: 'Xavier', lastName: 'Weiss', table: 5, seat: 5, companions: ['Aurore Weiss', 'Yannick Xavier', 'Zoé Zacharie'] },
    { firstName: 'Aurore', lastName: 'Weiss', table: 5, seat: 6, companions: ['Xavier Weiss', 'Yannick Xavier', 'Zoé Zacharie'] },
    { firstName: 'Yannick', lastName: 'Xavier', table: 5, seat: 7, companions: ['Xavier Weiss', 'Aurore Weiss', 'Zoé Zacharie'] },
    { firstName: 'Zoé', lastName: 'Zacharie', table: 5, seat: 8, companions: ['Xavier Weiss', 'Aurore Weiss', 'Yannick Xavier'] },
    
    // Table 6
    { firstName: 'André', lastName: 'Adams', table: 6, seat: 1, companions: ['Ève Adams', 'Bruno Blanc', 'Chantal Caron'] },
    { firstName: 'Ève', lastName: 'Adams', table: 6, seat: 2, companions: ['André Adams', 'Bruno Blanc', 'Chantal Caron'] },
    { firstName: 'Bruno', lastName: 'Blanc', table: 6, seat: 3, companions: ['André Adams', 'Ève Adams', 'Chantal Caron'] },
    { firstName: 'Chantal', lastName: 'Caron', table: 6, seat: 4, companions: ['André Adams', 'Ève Adams', 'Bruno Blanc'] },
    { firstName: 'Dominique', lastName: 'David', table: 6, seat: 5, companions: ['Elise David', 'Frédéric Fabre', 'Geneviève Gautier'] },
    { firstName: 'Elise', lastName: 'David', table: 6, seat: 6, companions: ['Dominique David', 'Frédéric Fabre', 'Geneviève Gautier'] },
    { firstName: 'Frédéric', lastName: 'Fabre', table: 6, seat: 7, companions: ['Dominique David', 'Elise David', 'Geneviève Gautier'] },
    { firstName: 'Geneviève', lastName: 'Gautier', table: 6, seat: 8, companions: ['Dominique David', 'Elise David', 'Frédéric Fabre'] },
    
    // Table 7
    { firstName: 'Hadrien', lastName: 'Henry', table: 7, seat: 1, companions: ['Hortense Henry', 'Ignace Innocent', 'Janine Jobert'] },
    { firstName: 'Hortense', lastName: 'Henry', table: 7, seat: 2, companions: ['Hadrien Henry', 'Ignace Innocent', 'Janine Jobert'] },
    { firstName: 'Ignace', lastName: 'Innocent', table: 7, seat: 3, companions: ['Hadrien Henry', 'Hortense Henry', 'Janine Jobert'] },
    { firstName: 'Janine', lastName: 'Jobert', table: 7, seat: 4, companions: ['Hadrien Henry', 'Hortense Henry', 'Ignace Innocent'] },
    { firstName: 'Kevin', lastName: 'Koutsis', table: 7, seat: 5, companions: ['Léa Koutsis', 'Mathieu Leblanc', 'Noemie Lemaire'] },
    { firstName: 'Léa', lastName: 'Koutsis', table: 7, seat: 6, companions: ['Kevin Koutsis', 'Mathieu Leblanc', 'Noemie Lemaire'] },
    { firstName: 'Mathieu', lastName: 'Leblanc', table: 7, seat: 7, companions: ['Kevin Koutsis', 'Léa Koutsis', 'Noemie Lemaire'] },
    { firstName: 'Noemie', lastName: 'Lemaire', table: 7, seat: 8, companions: ['Kevin Koutsis', 'Léa Koutsis', 'Mathieu Leblanc'] }
];

// Tables disponibles
const tables = {
    1: { name: 'Table Tropical', seats: 8 },
    2: { name: 'Table Sunset', seats: 8 },
    3: { name: 'Table Garden', seats: 8 },
    4: { name: 'Table Élégance', seats: 8 },
    5: { name: 'Table Romance', seats: 8 },
    6: { name: 'Table Fleurs', seats: 8 },
    7: { name: 'Table Lumière', seats: 8 }
};

// Traitement des accents et caractères spéciaux
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim();
}

// Calcul de la distance Levenshtein
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

// Recherche intelligente d'invité
function searchGuests(query) {
    if (!query || query.length < 2) return [];
    
    const normalized = normalizeString(query);
    const results = [];
    
    guestData.forEach(guest => {
        const firstName = normalizeString(guest.firstName);
        const lastName = normalizeString(guest.lastName);
        const fullName = `${firstName} ${lastName}`;
        
        // Recherche exacte
        if (firstName === normalized || lastName === normalized || fullName === normalized) {
            results.push({ guest, score: 100 });
            return;
        }
        
        // Recherche avec fuzzy matching
        const fnScore = 100 - (levenshtein(firstName, normalized) * 10);
        const lnScore = 100 - (levenshtein(lastName, normalized) * 10);
        const fullScore = 100 - (levenshtein(fullName, normalized) * 10);
        
        const maxScore = Math.max(fnScore, lnScore, fullScore);
        
        if (maxScore > 60) {
            results.push({ guest, score: maxScore });
        }
    });
    
    return results.sort((a, b) => b.score - a.score);
}

// Récupération des invités d'une table
function getTableGuests(tableNumber) {
    return guestData.filter(guest => guest.table === tableNumber);
}