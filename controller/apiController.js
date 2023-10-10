const calculate = require('./calculate.js')
const dbController = require('./DB/DB.js')
const lincController = require('./lincController.js')

const dbFilePath = './controller/DB/DB.json';


const calculatePost = (req, res) => {

    let { sheet_id, cell_id } = req.params;
    const value = req.body.value;

    sheet_id = sheet_id.toLowerCase()
    cell_id = cell_id.toLowerCase()

    try {
        const DB = dbController.getDBFromFile(dbFilePath)

        DB[sheet_id] = DB[sheet_id] || {};

        const sheet = DB[sheet_id]
        sheet[cell_id] = sheet[cell_id] || {};

        if (sheet[cell_id] && sheet[cell_id].hasOwnProperty('cellReferences')) {
            lincController.clearLinksToCell(sheet, sheet[cell_id].cellReferences, cell_id)
        }

        sheet[cell_id] = {
            value,
            result: 0,
            cellReferences: [], 
            linksToCell: sheet[cell_id].linksToCell ?? [] 
        };

        const calculationAnswer = calculate(value, sheet, cell_id, true)
        console.log(sheet[cell_id].linksToCell);
        sheet[cell_id].result = calculationAnswer

        lincController.calculateLinksToCell(sheet, sheet[cell_id].linksToCell)



        dbController.setDBInFile(DB, dbFilePath)

        res.status(201).json({ value, result: calculationAnswer });
    } catch (error) {
        console.log(error);
        res.status(422).json({ value, result: "ERROR" });
    }
}

const getCell = async (req, res) => {
    try {
        let { sheet_id, cell_id } = req.params;
        console.log("1");
        sheet_id = sheet_id.toLowerCase()
        cell_id = cell_id.toLowerCase()

        const DB = dbController.getDBFromFile(dbFilePath)

        if (DB[sheet_id][cell_id]) {

            const { value, result } = DB[sheet_id][cell_id]
            try {

                return res.status(200).json({ value, result })

            } catch (error) {
                res.status(404).json({result: "ERROR" })
            }
        }
        res.status(404).json({ result: "ERROR" })
    } catch (error) {
        res.status(404).json({ result: "ERROR" })
    }

}

const getSheet = (req, res) => {
    let { sheet_id } = req.params;

    sheet_id = sheet_id.toLowerCase()

    const DB = dbController.getDBFromFile(dbFilePath)

    if (DB[sheet_id]) {
        const sheet = DB[sheet_id]

        for (const el in sheet) {
            const { value, result } = sheet[el]
            try {
                sheet[el] = { value, result }
            }
            catch (error) {
                sheet[el] = { value, result: "ERROR" }
            }
        }

        return res.status(200).json(sheet)
    }
    res.status(404).json({ sheet_id, result: "ERROR" })

}

module.exports = { calculatePost, getCell, getSheet }