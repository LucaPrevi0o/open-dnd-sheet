export default {
    id: "charisma",
    name: "Charisma",
    abbreviation: "CHA",
    color: "#c026d3",
    abilities: [
        { id: "deception", name: "Deception" },
        { id: "intimidation", name: "Intimidation" },
        { id: "performance", name: "Performance" },
        { id: "persuasion", name: "Persuasion" }
    ],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};
