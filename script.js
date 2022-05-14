const $ = id => document.getElementById(id);

const timeElement = $("time");
const keyElement = $("key");
const inputElement = $("in");
const startButton = $("start");
const sensitivityCheck = $("sensitivity");
const numbersCheck = $("numbers");
const countInput = $("count");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fix(number) {
    return number.toFixed(2);
}

function clean() {
    timeElement.innerHTML = "-5.00s";
    keyElement.innerHTML = "?";
    inputElement.value = "";
    startButton.classList = "start";
    startButton.innerHTML = "Start";
};

async function play() {
    if (startButton.classList.contains("stop")) { return window.location.reload(); }
    const numbers = numbersCheck.checked;
    const caseSensitive = sensitivityCheck.checked;
    let count = parseInt(countInput.value);
    if (count <= 0) { return alert(`Character count should be bigger than zero.`); }

    inputElement.focus();
    startButton.classList = "stop";
    startButton.innerHTML = "Reset";

    let time = -5.00;
    async function addTimeMs() {
        await sleep(0.01);
        time += 0.01;
        time = Math.round(time * 100) / 100;
        timeElement.innerHTML = `${fix(time)}s`;        
    };
    let chars = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    if (caseSensitive) { chars += chars.toLowerCase(); }
    if (numbers) { chars += "0123456789"; }
    chars = chars.split("");

    while (time < 0) {
        await addTimeMs();
    }

    for (let i = 0; i < count; i++) {
        do {
            var char = chars[Math.floor(Math.random() * chars.length)];
        } while (keyElement.innerHTML === char) // don't display the same char twice in a row (it's confusing)
        keyElement.innerHTML = char;

        let convert = caseSensitive ? (s => s) : (s => s.toLowerCase());
        while (convert(char) != convert(inputElement.value.slice(i))) {
            await addTimeMs()
        }
    }

    await sleep(0.01); // wait for the displays
    alert(`Total time: ${time}s\n${fix(time / count)} seconds per letter\n${fix(count / time)} letters per second`);
    startButton.focus();
    clean();
}
