const fs = require('fs');

const getDBFromFile = (dbFilePath) => {
    try {
        if (fs.existsSync(dbFilePath)) {
            const fileContent = fs.readFileSync(dbFilePath, 'utf-8');
            return JSON.parse(fileContent);
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const setDBInFile = (DB,dbFilePath) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(DB));

    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = { getDBFromFile, setDBInFile }