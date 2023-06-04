class Postulation{
    constructor(
        id,
        userId,
        requestId,
        dateOfPostulation,
        wasAccepted = false
    ){
        this.id = id;
        this.userId = userId;
        this.requestId = requestId;
        this.dateOfPostulation = dateOfPostulation;
        this.wasAccepted = wasAccepted;
    }

    acceptPostulation(){
        this.wasAccepted = true;
    }
    cancelPostulation(){
        this.wasAccepted = false;
    }
}