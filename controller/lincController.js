const calculate = require('./calculate.js')

const removeElementFromArray = (arr, elementToRemove) => {
    try {
        const index = arr.indexOf(elementToRemove);

        if (index !== -1) {
            arr.splice(index, 1);
        }
    }catch (error) {
        throw new Error(error.message)
    }
}

const clearLinksToCell = (sheet, arr, cell_id) => {
    try {
        for (let i = 0; i < arr.length; i++) {
            removeElementFromArray(sheet[arr[i]].linksToCell, cell_id)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
const calculateLinksToCell = (sheet, linksToCell) => {
    try {
        for (let i = 0; i < linksToCell.length; i++) {
            const { value } = sheet[linksToCell[i]]

            const calculationAnswer = calculate(value, sheet, linksToCell[i], false)

            sheet[linksToCell[i]].result = calculationAnswer
        }
        return
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { clearLinksToCell, calculateLinksToCell }