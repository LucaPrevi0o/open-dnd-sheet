export default {
    id: "strength",
    name: "Strength",
    abbreviation: "STR",
    color: "#d97706",
    abilities: [
        { id: "athletics", name: "Athletics" }
    ],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};
