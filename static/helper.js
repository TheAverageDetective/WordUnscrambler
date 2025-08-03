//const words = require("./words_dictionary.json")

function unscramble(word = "") {

    function createPermutations(arr = []) {

        if (arr.length === 0) return [[]];

        const permutations = []

        for (let i = 0; i < arr.length; i++) {
            const copy = Array.from(arr)
            const currentLetter = copy.splice(i, 1)[0]
            const remainingPermutations = createPermutations(copy)

            for (let i = 0; i < remainingPermutations.length; i++) {
                permutations.push([currentLetter, ...remainingPermutations[i]])
            }
        }

        return permutations;
    }


    const permutations = createPermutations(word.split("")).map(v => v.join(""))

    const possibleWords = {}

    for (let i = 0; i < permutations.length; i++) {
        // console.log(permutations[i])
        if (words[permutations[i]] === 1) possibleWords[permutations[i]] = 1;
    }

    return Object.keys(possibleWords)
}

export { unscramble }

// console.log(unscramble("olleh"))
// console.log(unscramble("reif"))
// console.log(unscramble("lmao"))
// console.log(unscramble("blah"))
// console.log(unscramble("uhgon"))

