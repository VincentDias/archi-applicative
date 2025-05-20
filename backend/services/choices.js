const init = require("./init");

const choices = {
  findCombinations: (dices, isDefi, isFirstRoll) => {
    const allCombinations = init.allCombinations();
    const availableCombinations = [];
    const counts = Array(7).fill(0); 
    let sum = 0;

    dices.forEach((dice) => {
      const value = parseInt(dice.value);
      counts[value]++;
      sum += value;
    });

    const hasThreeOfAKind = counts.some((count) => count === 3);

    const hasPair = counts.some((count) => count === 2);

    const hasFourOfAKind = counts.some((count) => count >= 4);

    const yam = counts.some((count) => count === 5);

    const hasStraight =
      counts.slice(1, 6).every((count) => count >= 1) ||
      counts.slice(2, 7).every((count) => count >= 1);

    const isLessThanEqual8 = sum <= 8;

    let full = false;
    if (hasThreeOfAKind && hasPair) {
      const threeOfAKindValue = counts.findIndex((count) => count === 3);
      const pairValue = counts.findIndex((count) => count === 2);
      full = threeOfAKindValue !== pairValue;
    }

    // Determine available combinations based on the current state of the dices
    allCombinations.forEach((combination) => {
      if (
        (combination.id.startsWith("brelan") &&
          counts[parseInt(combination.id.slice(-1))] >= 3) ||
        (combination.id === "full" && full) ||
        (combination.id === "carre" && hasFourOfAKind) ||
        (combination.id === "yam" && yam) ||
        (combination.id === "suite" && hasStraight) ||
        (combination.id === "moinshuit" && isLessThanEqual8) ||
        (combination.id === "defi" && isDefi)
      ) {
        availableCombinations.push(combination);
      }
    });

    // -------------------------------- //
    // (8) Sec
    // -------------------------------- //
    if (isFirstRoll) {
      const nonBrelanCombinations = availableCombinations.filter(
        (combination) => !combination.id.startsWith("brelan")
      );
      if (nonBrelanCombinations.length > 0) {
        availableCombinations.push({ id: "sec", value: "Sec" });
      }
    }

    return availableCombinations;
    // return [
    //   { id: "brelan1", value: "Brelan 1" },
    //   { id: "brelan3", value: "Brelan 3" },
    //   { id: "brelan4", value: "Brelan 4" },
    //   { id: "brelan6", value: "Brelan 6" },
    //   { id: "full", value: "Full" },
    //   { id: "carre", value: "Carré" },
    //   { id: "yam", value: "Yam" },
    //   { id: "moinshuit", value: "≤8" },
    //   { id: "sec", value: "Sec" },
    // ]; // For testing purposes
  },

  filterChoicesEnabler: (grid, combinations) => {
    combinations.map((combination) => {
      // Check if any row has at least one cell that can use this combination
      const isCombinationUsable = grid.some((row, rowIndex) => {
        return row.some((cell) => {
          return cell.id === combination.id && cell.owner === null;
        });
      });

      // Set the combination enabled property based on the result
      combination.enabled = isCombinationUsable;
    });
    return combinations;
  },
};

module.exports = choices;