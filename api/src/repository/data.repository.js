class dataResult {
    success;
    data;
    message;

    constructor(success, data, code = 0, message = "") {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}

const usedPKCode = "23505"

module.exports = {
    dataResult,
    usedPKCode
}