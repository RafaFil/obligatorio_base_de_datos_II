class Postulation{
    constructor(
        userId,
        requestId,
        dateOfPostulation = Date.now(),
        wasAccepted = false
    ){
        this.userId = userId;
        this.requestId = requestId;
        this.wasAccepted = wasAccepted;
        this.dateOfPostulation = dateOfPostulation;
    }

    acceptPostulation(){
        this.wasAccepted = true;
    }
    cancelPostulation(){
        this.wasAccepted = false;
    }
}

module.exports = {
    Postulation
}