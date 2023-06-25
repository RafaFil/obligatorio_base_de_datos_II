class helpRequest{

    constructor(
        id, 
        title, 
        lat,
        lng,
        userDO,
        dateOfPublishing, 
        description,
        isActive = true, 
        wasResolved = false)
        {
            this.id = id
            this.title = title;
            this.lat = lat;
            this.lng = lng;
            this.userDO = userDO;
            this.description = description;
            this.dateOfPublishing = dateOfPublishing;
            this.isActive = isActive;
            this.wasResolved = wasResolved;
        }

    //for previews, reduced request
    getPreview(){
        return {
            id : this.id,
            title : this.title,
            dateOfPublishing : this.dateOfPublishing,
            isActive : this.isActive
        }
    }
}


module.exports = {
    helpRequest
}