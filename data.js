
// Rows and columns of the grid.
const TRAITS_ROW = ["Ace", "Clan", "Giant", "Goblin", "P.E.K.K.A", "Noble", "Undead"];
const TRAITS_COL = ["Assassin", "Blaster", "Brawler", "Brutalist", "Ranger", "Superstar"];


const CARD_DATA = [
    // Row: Ace
    { id: "ace_assassin", displayName: "Bandit", rowTrait: "Ace", colTrait: "Assassin", image: "images/bandit.webp" },
    { id: "ace_blaster", displayName: "Executioner", rowTrait: "Ace", colTrait: "Blaster", image: "images/executioner.webp" },
    { id: "ace_brawler", displayName: "Mega Knight", rowTrait: "Ace", colTrait: "Brawler", image: "images/mega-knight.webp" },
    { id: "ace_superstar", displayName: "Monk", rowTrait: "Ace", colTrait: "Superstar", image: "images/monk.webp" },

    // Row: Clan
    { id: "clan_blaster", displayName: "Wizard", rowTrait: "Clan", colTrait: "Blaster", image: "images/wizard.webp" },
    { id: "clan_brawler", displayName: "Barbarian", rowTrait: "Clan", colTrait: "Brawler", image: "images/barbarian.webp" },
    { id: "clan_brutalist", displayName: "Valkyrie", rowTrait: "Clan", colTrait: "Brutalist", image: "images/valkyrie.webp" },
    { id: "clan_ranger", displayName: "Archer Queen", rowTrait: "Clan", colTrait: "Ranger", image: "images/archer-queen.webp" },

    // Row: Giant
    { id: "giant_ranger", displayName: "Royal Giant", rowTrait: "Giant", colTrait: "Ranger", image: "images/royal-giant.webp" },
    { id: "giant_superstar", displayName: "Electro Giant", rowTrait: "Giant", colTrait: "Superstar", image: "images/electro-giant.webp" },

    // Row: Goblin
    { id: "goblin_assassin", displayName: "Goblin", rowTrait: "Goblin", colTrait: "Assassin", image: "images/goblin.webp" },
    { id: "goblin_blaster", displayName: "Spear Goblin", rowTrait: "Goblin", colTrait: "Blaster", image: "images/spear-goblin.webp" },
    { id: "goblin_brutalist", displayName: "Goblin Machine", rowTrait: "Goblin", colTrait: "Brutalist", image: "images/goblin-machine.webp" },
    { id: "goblin_ranger", displayName: "Dart Goblin", rowTrait: "Goblin", colTrait: "Ranger", image: "images/dart-goblin.webp" },

    // Row: P.E.K.K.A
    { id: "pekka_brawler", displayName: "P.E.K.K.A", rowTrait: "P.E.K.K.A", colTrait: "Brawler", image: "images/pekka.webp" },
    { id: "pekka_brutalist", displayName: "Mini P.E.K.K.A", rowTrait: "P.E.K.K.A", colTrait: "Brutalist", image: "images/mini-pekka.webp" },

    // Row: Noble
    { id: "noble_assassin", displayName: "Golden Knight", rowTrait: "Noble", colTrait: "Assassin", image: "images/golden-knight.webp" },
    { id: "noble_blaster", displayName: "Princess", rowTrait: "Noble", colTrait: "Blaster", image: "images/princess.webp" },
    { id: "noble_brawler", displayName: "Prince", rowTrait: "Noble", colTrait: "Brawler", image: "images/prince.webp" },
    { id: "noble_superstar", displayName: "Musketeer", rowTrait: "Noble", colTrait: "Superstar", image: "images/musketeer.webp" },
    // Row: Undead
    { id: "undead_assassin", displayName: "Royal Ghost", rowTrait: "Undead", colTrait: "Assassin", image: "images/royal-ghost.webp" },
    { id: "undead_brawler", displayName: "Skeleton King", rowTrait: "Undead", colTrait: "Brutalist", image: "images/skeleton-king.webp" },
    { id: "undead_ranger", displayName: "Skeleton Dragons", rowTrait: "Undead", colTrait: "Ranger", image: "images/skeleton-dragons.webp" },
    { id: "undead_superstar", displayName: "Witch", rowTrait: "Undead", colTrait: "Superstar", image: "images/witch.webp" }
];
