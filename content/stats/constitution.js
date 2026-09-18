export default {
    id: "constitution",
    name: "Constitution",
    abilities: [],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};