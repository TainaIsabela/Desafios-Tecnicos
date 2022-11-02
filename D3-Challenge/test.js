import assert from 'assert';
import calculateContaminates from './challenge.js';

describe('Tests of challenge D3 - Number of contaminates COVID-19', function () {

    it('should calculate the correct number of COVID-19 contaminants on the 1 day', async function () {

        const numberContamination = await calculateContaminates(1)
        assert.strictEqual(numberContamination.length, 1);
    })

    it('should calculate the correct number of COVID-19 contaminants on the 2 day', async function () {
        const numberContamination = await calculateContaminates(2)
        assert.strictEqual(numberContamination.length, 2);

    })

    it('should calculate the correct number of COVID-19 contaminants on the 3 day', async function () {
        const numberContamination = await calculateContaminates(3)
        assert.strictEqual(numberContamination.length, 3);
    })

    it('should calculate the correct number of COVID-19 contaminants on the 4 day', async function () {
        const numberContamination = await calculateContaminates(4)
        assert.strictEqual(numberContamination.length, 4);
    })

    it('should calculate the correct number of COVID-19 contaminants on the boolean day', async function () {
        const numberContamination = await calculateContaminates(true)
        assert.strictEqual(numberContamination.length, 0);
    })

    it('should calculate the correct number of COVID-19 contaminants on the 0 day', async function () {
        const numberContamination = await  calculateContaminates(0)
        assert.strictEqual(numberContamination.length, 0);
    })

    it('should calculate the correct number of COVID-19 contaminants on the String day', async function () {
        const numberContamination = await calculateContaminates('day 4')
        assert.strictEqual(numberContamination.length, 0);
    })

    it('should calculate the correct number of COVID-19 contaminants on the Null day', async function () {
        const numberContamination = await calculateContaminates(null)
        assert.strictEqual(numberContamination.length, 0);
    })

})