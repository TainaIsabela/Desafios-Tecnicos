async function calculateContaminates(input) {
    const result = [];

    if (input < 0 || typeof input !== 'number') {
        return [];
    }
    for (let i = 1; i <= input; i++) {
        // Infelizmente não consegui fazer o calculo com base no https://ourworldindata.org/covid-cases :(
        const cases = Math.floor(Math.random() * 100);
        result.push({
            day: i,
            cases
        });

    }

   return result;
}

export default calculateContaminates;