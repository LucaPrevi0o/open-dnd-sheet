export default {
    id: "intelligence",
    name: "Intelligence",
    abilities: [
        { id: "arcana", name: "Arcana" },
        { id: "history", name: "History" },
        { id: "investigation", name: "Investigation" },
        { id: "nature", name: "Nature" },
        { id: "religion", name: "Religion" }
    ],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};
