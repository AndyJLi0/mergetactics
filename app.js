// ===== CONFIG =====
const MAX_CARDS_ON_BOARD = 6;
const TRAITS_NEEDED = 6;

// Internal structures built from CARD_DATA
const cards = CARD_DATA.map((c, index) => ({
    ...c,
    index
}));

const cardById = Object.fromEntries(cards.map(c => [c.id, c]));

// coordinate -> id
const cardByCoord = {};
for (const c of cards) {
    cardByCoord[`${c.rowTrait}-${c.colTrait}`] = c.id;
}

// ===== DECK GENERATION =====

const validDecks = [];

function getActiveTraitsForIndices(indices) {
    const counts = {};
    for (const idx of indices) {
        const card = cards[idx];
        for (const t of [card.rowTrait, card.colTrait]) {
            counts[t] = (counts[t] || 0) + 1;
        }
    }
    const active = [];
    for (const [t, count] of Object.entries(counts)) {
        if (count >= 2) active.push(t);
    }
    return active;
}

function generateAllValidDecks() {
    const n = cards.length;
    const current = [];

    function backtrack(start, k) {
        if (current.length === k) {
            const activeTraits = getActiveTraitsForIndices(current);
            if (activeTraits.length >= TRAITS_NEEDED) {
                let mask = 0;
                for (const idx of current) {
                    mask |= 1 << idx;
                }
                validDecks.push({
                    mask,
                    indices: [...current],
                    activeTraits
                });
            }
            return;
        }

        for (let i = start; i <= n - (k - current.length); i++) {
            current.push(i);
            backtrack(i + 1, k);
            current.pop();
        }
    }

    backtrack(0, MAX_CARDS_ON_BOARD);
}

generateAllValidDecks();

// ===== DOM HELPERS =====

function makeDiv(cls, text) {
    const d = document.createElement("div");
    d.className = cls;
    if (text) d.textContent = text;
    return d;
}

// ===== STATE =====

let selectedIds = new Set();
const cardCells = {}; // id -> element

// ===== UI BUILD =====

function buildGrid() {
    const gridEl = document.getElementById("grid");
    gridEl.innerHTML = "";

    // Header row
    gridEl.appendChild(makeDiv("header-cell", ""));
    for (const t2 of TRAITS_COL) {
        gridEl.appendChild(makeDiv("header-cell", t2));
    }

    // Rows
    for (const rowTrait of TRAITS_ROW) {
        gridEl.appendChild(makeDiv("row-label", rowTrait));

        for (const colTrait of TRAITS_COL) {
            const key = `${rowTrait}-${colTrait}`;
            const cardId = cardByCoord[key];

            if (!cardId) {
                const empty = makeDiv("card-cell empty", "");
                gridEl.appendChild(empty);
                continue;
            }

            const card = cardById[cardId];
            const cell = makeDiv("card-cell", "");
            cell.dataset.cardId = card.id;

            // image (optional)
            if (card.image) {
                const img = document.createElement("img");
                img.src = card.image;
                img.alt = card.displayName;
                img.className = "card-img";
                cell.appendChild(img);
            }

            const name = document.createElement("div");
            name.className = "card-name";
            name.textContent = card.displayName || `${card.rowTrait} / ${card.colTrait}`;

            const traits = document.createElement("div");
            traits.className = "card-traits";
            traits.textContent = `${card.rowTrait} • ${card.colTrait}`;

            cell.appendChild(name);
            cell.appendChild(traits);

            cell.addEventListener("click", () => {
                toggleCardSelection(card.id);
            });

            gridEl.appendChild(cell);
            cardCells[card.id] = cell;
        }
    }
}

// ===== LOGIC =====

function selectedMaskFromSet(set) {
    let mask = 0;
    for (const id of set) {
        const idx = cardById[id].index;
        mask |= 1 << idx;
    }
    return mask;
}

function computeViableCards() {
    const selectedMask = selectedMaskFromSet(selectedIds);
    const viableIndices = new Set();

    for (const deck of validDecks) {
        if ((deck.mask & selectedMask) !== selectedMask) continue;
        for (const idx of deck.indices) {
            if (!(selectedMask & (1 << idx))) viableIndices.add(idx);
        }
    }

    const viableIds = new Set();
    for (const idx of viableIndices) {
        viableIds.add(cards[idx].id);
    }
    return viableIds;
}

function computeTraitCountsForSelection() {
    const counts = {};
    for (const id of selectedIds) {
        const c = cardById[id];
        for (const t of [c.rowTrait, c.colTrait]) {
            counts[t] = (counts[t] || 0) + 1;
        }
    }
    return counts;
}

function toggleCardSelection(cardId) {
    if (selectedIds.has(cardId)) {
        selectedIds.delete(cardId);
    } else {
        if (selectedIds.size >= MAX_CARDS_ON_BOARD) {
            alert("You already have 6 cards selected. Deselect one first.");
            return;
        }
        selectedIds.add(cardId);
    }
    updateUI();
}

// ===== SIDE PANEL =====
const traitSummaryEl = document.getElementById("traitSummary");
const deckCountEl = document.getElementById("deckCount");

function updateSidePanel() {
    // ----- Trait summary (unchanged behavior) -----
    const counts = computeTraitCountsForSelection();
    const entries = Object.entries(counts);

    if (entries.length === 0) {
        traitSummaryEl.innerHTML =
            "<span class='muted'>Traits: will update once you pick some cards.</span>";
    } else {
        const pills = [];
        for (const [t, count] of entries) {
            let cls = "pill";
            if (count >= 2) cls += " good";      // active trait
            else if (count === 1) cls += " almost"; // one card away
            pills.push(`<span class="${cls}">${t}: ${count}</span>`);
        }

        const activeCount = entries.filter(([, c]) => c >= 2).length;

        traitSummaryEl.innerHTML =
            `<div><strong>Trait counts</strong> (green = already active, yellow = one card away)</div>` +
            pills.join("") +
            `<div style="margin-top:4px;" class="muted">Active traits: ${activeCount} / ${TRAITS_NEEDED}</div>`;
    }

    // ----- Possible 6-trait deck count -----
    // Count how many validDecks are still compatible with current selection
    const selectedMask = selectedMaskFromSet(selectedIds);
    let remaining = 0;

    for (const deck of validDecks) {
        if ((deck.mask & selectedMask) === selectedMask) {
            remaining++;
        }
    }

    deckCountEl.innerHTML =
        `<div><strong>Possible 6 trait decks remaining: ${remaining}</strong></div>`;
}


// ===== MAIN UPDATE =====

function updateUI() {
    const viableIds = computeViableCards();

    for (const card of cards) {
        const cell = cardCells[card.id];
        const isSelected = selectedIds.has(card.id);
        const isViable = viableIds.has(card.id);

        cell.classList.remove("selected", "viable", "dead");

        if (isSelected) {
            cell.classList.add("selected");
        } else if (isViable) {
            cell.classList.add("viable");
        } else if (selectedIds.size > 0) {
            cell.classList.add("dead");
        }
    }

    updateSidePanel();
}

// ===== INIT =====

function resetSelection() {
    selectedIds = new Set();
    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    buildGrid();
    updateUI();

    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", resetSelection);
    }
});
