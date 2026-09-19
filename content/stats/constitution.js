export default {
    id: "constitution",
    name: "Constitution",
    abbreviation: "CON",
    color: "#dc2626",
    abilities: [],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};