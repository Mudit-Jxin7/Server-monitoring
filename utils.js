function getRandomValue(array) {
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
}

function doSomeHeavyTask() {
    const ms = getRandomValue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6]) === 6;
    if (shouldThrowError) {
        const randomError = getRandomValue([
            "DB Payment Error",
            "DB Server Error",
            "Access Denied",
            "Not Authorized",
        ]);
        throw new Error(randomError);
    }

    return new Promise((resolve, reject) => setTimeout(() => resolve(ms), ms));
}

module.exports = { doSomeHeavyTask }