const math = require('mathjs');

const calculate = (value, sheet, cell_id, recursionCheck) => {
    try {
        value = String(value)
        if (value.startsWith('=')) {

            value = value.substring(1).toLowerCase()
            const check = sheet[value] ?? ""

            value = value.replace(/[^+\-*/()]+/gi, (el) => {

                if (typeof Number(el) === "number" && !isNaN(Number(el))) {
                    return el
                } else if (el == cell_id) {
                    throw new Error("Cyclicity")
                } else if (sheet[el]) {
                    if (recursionCheck) {
                        if (sheet[cell_id].cellReferences.indexOf(el) === -1) {
                            sheet[cell_id].cellReferences.push(el)
                        }
                        if (sheet[el]) {
                            if (sheet[el].linksToCell.indexOf(cell_id) === -1) {
                                sheet[el].linksToCell.push(cell_id)
                            }

                        } else {
                            throw new Error("Unknown variable ")
                        }
                    }
                    return calculate(sheet[el].value, sheet, cell_id, false)
                } else {
                    throw new Error("Unknown variable ")
                }
            })

            console.log(check.value);
            console.log(value);

            if (check.value === value) return String(check.value)

            return String(math.evaluate(value))
        } else {
            return String(value)
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = calculate