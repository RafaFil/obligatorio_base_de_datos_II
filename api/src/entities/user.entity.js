class User {

    do
    name
    lastName
    birthDate
    willHelp
    verified
    description
    rating
    contact = []
    skills = []

    constructor(doId) {
        this.do = doId
    }

    constructor(
        ci = "11111111", 
        name = "Jane", 
        lastName = "Doe", 
        birthDate = new Date("2000-01-01"),
        willHelp = false,
        verified = false) 
        
        {
        this.do = ci
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