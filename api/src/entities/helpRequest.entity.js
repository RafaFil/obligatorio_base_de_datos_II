class helpRequest{

    questionsAndAnswers = new Map()
    //{key,value} -> {[askerName], [txtQuestion, txtAnswer]}

    constructor(
        id, 
        title, 
        dateOfPublishing, 
        isActive = true, 
        wasResolved = false, 
        skillNeeded,
        description){

            this.id = id
            this.title = title;
            this.description = description;
            this.dateOfPublishing = dateOfPublishing;
            this.isActive = isActive;
            this.wasResolved = wasResolved;
            this.skillNeeded = skillNeeded
        }

    //for previews, reduced request
    constructor(
        id, 
        title, 
        dateOfPublishing, 
        isActive = true){

            this.id = id
            this.title = title;
            this.dateOfPublishing = dateOfPublishing;
            this.isActive = isActive;
        }

    getQuestions(){
        //queries for questions and answers

        //inserts them into the map questionsAndAnswers


        //return itself to be used with constructor
        return this;
    }
}

module.exports = {
    helpRequest
}