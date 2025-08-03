/**
 * Load the dictionary first.
 * The site is useless without this.
 */

let dictionary = {}, loading = true;

;( async ()=>{
    dictionary =  await (await fetch("./words_dictionary.json")).json()
    loading = false
})().catch( _ => document.getElementById("errors").innerText = "Naw there was an error loading :(\nTry refreshing? Let me know if this problem persists.");


/**
 * 
 * Handling the UI and user input.
 * 
 */

const form = document.getElementById("theForm")
const submitButton = document.getElementById("submitButton")
const output = document.getElementById("output")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (loading) return alert("Page still loading, please wait.");

    let data = new FormData(form);
    let word = data.get("scrambled").toString()

    if (!(word.length > 2 && word.length < 11)) return alert("Currently words between 3 and 10 characters are only accepted at this time")

    
    submitButton.disabled = true;

    let possibleWords = unscramble(word, dictionary)

    submitButton.disabled = false;
    console.log(possibleWords)

    output.parentElement.style.display = "block"
    output.innerHTML = ""

    if (possibleWords.length === 0) return output.innerText = "No possibilities!"

    possibleWords.forEach(possibleWord => {
        let row = document.createElement("tr")
        let data = document.createElement("td")
        data.innerText = possibleWord

        row.appendChild(data)
        output.appendChild(row)
    });
})





/**
 * 
 * The main logic goes here
 * 
 */

function unscramble(word = "", dictionary={}) {

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
        if (dictionary[permutations[i]] === 1) possibleWords[permutations[i]] = 1;
    }

    return Object.keys(possibleWords)
}

