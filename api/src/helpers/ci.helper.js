
const checkDO = (DO) => {
    if (!DO) {
        return false;
    }
    else {
        const sevenDigitID = [1, 2, 3, 4, 7, 6];
        const eightDigitID = [8, 1, 2, 3, 4, 7, 6]
        const charID = DO.split('');
        let sum = 0;

        if (charID.length == 7) {
            for (let index = 0; index <= charID.length - 2; index++) {
                let number = Number.parseInt(charID[index]);
                sum += number * sevenDigitID[index];
            };
            const lastDigit = sum % 10;
            if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
                return false;
            }
            return true;
        }

        else if (charID.length == 8) {
            for (let index = 0; index <= charID.length - 2; index++) {
                let number = Number.parseInt(charID[index]);
                sum += number * eightDigitID[index];
            };
            const lastDigit = sum % 10;
            if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
                return false;
            }
            return true;
        }

        else {
            return false
        }
    }
};

module.exports = {
    checkDO
}