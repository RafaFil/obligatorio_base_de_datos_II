class Skill{
    
    constructor(id, skillName){
        this.id = id;
        this.name = skillName
    }
}
class userSkill extends Skill{
    
    constructor(skillId, skillName, userId, lvl){
        
        super(skillId, skillName);
        this.userId = userId
        
        if(lvl > 5){
            lvl = 5;
        }
        else if(lvl < 0){
            lvl = 0
        }

        this.lvl = lvl        
    }
}
class requiredSkill extends Skill{
    
    constructor(skillId, skillName, lvl){
        
        super(skillId, skillName);

        if(lvl > 5){
            lvl = 5;
        }
        else if(lvl < 0){
            lvl = 0
        }
        else{
            this.lvl = lvl
        }
        
    }
}

module.exports = {
    Skill,
    userSkill,
    requiredSkill
}