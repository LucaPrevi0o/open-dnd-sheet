export default {
    id: "wisdom",
    name: "Wisdom",
    abilities: [
        { id: "animal_handling", name: "Animal Handling" },
        { id: "insight", name: "Insight" },
        { id: "medicine", name: "Medicine" },
        { id: "perception", name: "Perception" },
        { id: "survival", name: "Survival" }
    ],
    savingThrow: true,
    calculateModifier: function(score) {
        return Math.floor((score - 10) / 2);
    }
};
