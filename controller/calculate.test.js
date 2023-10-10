const chai = require('chai');
const { expect } = chai;
const calculate = require('./calculate');

describe('calculate', () => {
    it('should calculate simple arithmetic expressions', () => {
        const sheet = {};
        const cell_id = 'A1';

        expect(calculate('=2+2', sheet, cell_id)).to.equal('4');
        expect(calculate('=10*5', sheet, cell_id)).to.equal('50');
        expect(calculate('=6/2', sheet, cell_id)).to.equal('3');
        expect(calculate('=4-1', sheet, cell_id)).to.equal('3');
    });

    it('should handle cell references', () => {
        const sheet = {
            'a1': { value: '5' },
            'b1': { value: '10' },
        };
        const cell_id = 'a3';

        expect(calculate('=A1+B1', sheet, cell_id)).to.equal('15');
        expect(calculate('=B1-A1', sheet, cell_id)).to.equal('5');
    });

    it('should throw an error for cyclic dependencies', () => {
        const sheet = {
            'a1': { value: '=a2' },
            'a2': { value: '=a3' },
        };
        const cell_id = 'a3';

        expect(() => calculate('=a1', sheet, cell_id)).to.throw('Cyclicity');
    });

    it('should throw an error for unknown variables', () => {
        const sheet = {};
        const cell_id = 'a1';

        expect(() => calculate('=x1', sheet, cell_id)).to.throw('Unknown variable');
    });

    it('should handle non-mathematical expressions', () => {
        const sheet = {};
        const cell_id = 'a1';

        expect(calculate('DevChallenge', sheet, cell_id)).to.equal('DevChallenge');
        expect(() => calculate('=DevChallenge', sheet, cell_id)).to.throw('Unknown variable');

    });
});
