class Postulation{
    constructor(
        userId,
        requestId,
        dateOfPostulation = new Date(Date.now()),
        wasAccepted = false
    ){
        this.userId = userId;
        this.requestId = requestId;
        this.wasAccepted = wasAccepted;
        this.dateOfPostulation = dateOfPostulation;

        console.log(this)
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