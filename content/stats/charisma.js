export default {
    id: "charisma",
    name: "Charisma",
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
