const { expect } = require('chai');
const lincController = require('./lincController');
const calculate = require('./calculate');

describe('Link Controller Tests', () => {
  it('should clear links to cell', () => {
    const sheet = {
      a1: { value: '=b1', result: '0', linksToCell: [], cellReferences: ['b1'] },
      b1: { value: '10', result: '10', linksToCell: ['a1'], cellReferences: [] },
    };

    lincController.clearLinksToCell(sheet, sheet['a1'].cellReferences, 'a1');

    expect(sheet['b1'].linksToCell).to.not.include('a1');
    expect(sheet['a1'].linksToCell).to.be.empty;
    expect(sheet['b1'].cellReferences).to.be.empty;
  });

  it('should calculate links to cell', () => {
    const sheet = {
      a1: { value: '=b1', result: '10', linksToCell: [], cellReferences: ['b1'] },
      b1: { value: '10', result: '10', linksToCell: ['a1'], cellReferences: [] },
    };

    sheet.b1 = { value: '20', result: '20', linksToCell: ['a1'], cellReferences: [] }

    lincController.calculateLinksToCell(sheet, sheet['b1'].linksToCell);

    expect(sheet['a1'].result).to.equal('20');
    expect(sheet['b1'].result).to.equal('20');
  });

  it('change numbers to text',()=>{
    const sheet = {
        a1: { value: '=b1+1', result: '11', linksToCell: [], cellReferences: ['b1'] },
        b1: { value: '10', result: '10', linksToCell: ['a1'], cellReferences: [] },
      };

      sheet.b1 = { value: 'test', result: 'test', linksToCell: ['a1'], cellReferences: [] }

      expect(() => lincController.calculateLinksToCell(sheet, sheet['b1'].linksToCell).to.throw());
  })
});
