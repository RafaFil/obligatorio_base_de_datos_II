class User {

    doc
    name
    lastName
    birthDate
    willHelp
    verified
    description
    rating
    contact = []
    skills = []

    constructor(ci) {
        this.ci = ci
    }

    constructor(
        ci = "11111111", 
        name = "Jane", 
        lastName = "Doe", 
        birthDate = new Date("2000-01-01"),
        willHelp = false,
        verified = false) 
        
        {
        this.ci = ci
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