export default {
    id: "dexterity",
    name: "Dexterity",
    abbreviation: "DEX",
    color: "#0d9488",
    abilities: [
        { id: "acrobatics", name: "Acrobatics" },
        { id: "sleight_of_hand", name: "Sleight of Hand" },
        { id: "stealth", name: "Stealth" }
    ],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};