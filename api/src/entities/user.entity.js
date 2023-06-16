class User {

    DO
    name
    lastName
    birthDate
    verified
    description
    rating
    contact = []
    skills = []

    constructor(
        DO = "11111111", 
        name = "Jane", 
        lastName = "Doe", 
        birthDate = new Date("2000-01-01"),
        verified = false,
        description = null) 
        
        {
        this.DO = DO;
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.verified = verified;
        this.description = description;
    }

    checkPwd(triedPassword){
        if(typeof triedPassword === "string"){
            //hashes pwd

            //makesquery to check

            //if correct return true
        }
        return false
    }

    get rating(){
        //makes query to get all ratings

        //calcualtes median

        //returns
    }
}

module.exports = {
    User
}