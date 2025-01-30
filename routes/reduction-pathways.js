const express = require('express');
const router = express.Router();

// Example strategies
const strategies = [
    { name: 'Switch to renewable energy', reduction: 30 },
    { name: 'Improve energy efficiency', reduction: 20 },
    { name: 'Optimize transportation logistics', reduction: 10 },
    { name: 'Adopt carbon capture technology', reduction: 25 },
    { name: 'Reduce fuel consumption', reduction: 15 }
];

// Route to get reduction pathways
router.post('/', (req, res) => {
    const { currentEmissions, targetEmissions } = req.body;

    if (!currentEmissions || !targetEmissions || targetEmissions >= currentEmissions) {
        return res.status(400).json({ error: 'Invalid emissions data provided.' });
    }

    let remainingReduction = currentEmissions - targetEmissions;
    const selectedStrategies = [];

    // Select strategies based on their reduction potential
    strategies.forEach(strategy => {
        if (remainingReduction <= 0) return;

        if (remainingReduction >= strategy.reduction) {
            selectedStrategies.push(strategy.name);
            remainingReduction -= strategy.reduction;
        } else if (remainingReduction > 0) {
            selectedStrategies.push(`${strategy.name} (partial: ${remainingReduction} Tons CO₂)`);
            remainingReduction = 0;
        }
    });

    if (remainingReduction > 0) {
        selectedStrategies.push(`Additional reductions of ${remainingReduction.toFixed(2)} Tons CO₂ required.`);
    }

    res.json({ strategies: selectedStrategies });
});

module.exports = router;
