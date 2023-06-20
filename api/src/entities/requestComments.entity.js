class requestComments{
    constructor(
        userDO,
        requestId,
        question,
        answer
    )
    {
        this.userDO = userDO,
        this.requestId = requestId,
        this.question = question,
        this.answer = answer
    }
}

module.exports = {
    requestComments
}