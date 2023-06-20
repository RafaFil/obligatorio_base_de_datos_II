const skillsQueryBuilder = (initialSkillsQuery,skills)=>{
    buildingQuery = initialSkillsQuery
    arrayOfValues = []
    for (let index = 0; index < requestSkills.length*2; index = index + 2) {
        if(index+3 == requestSkills.length*2){
            buildingQuery = buildingQuery.concat(`(requestId,$${index+1},$${index+2}); COMMIT;`)
        }
        else if(index = 0){
            buildingQuery = buildingQuery.concat(`SELECT requestId,$${index+1},$${index+2},`)
        }
        else{
            buildingQuery = buildingQuery.concat(`(requestId,$${index+1},$${index+2}),`)
        }
    }
    for (let index = 0; index<requestSkills.length; index++){
        arrayOfValues.push(requestSkills[index].id);
        arrayOfValues.push(requestSkills[index].lvl);
    }
    return
}

const getAllFriendsRequestsBuilder = (friends) =>{
    buildQuery = 'WHERE ';
    for (let index = 0; index < friends.length; index++) {
        if(index+1 == friends.length){
            buildQuery += `sa.solicitante_ci = $${index+1};`;
        }
        else{
            buildQuery += `sa.solicitante_ci = $${index+1} OR `;
        }
    }
    return buildQuery

}

const checkForMultipleRequests = (requestsArray) =>{
    requestsMap = new Map()
    requestsArray.forEach(request => {
        if(!requestsMap.has(request.id)){
            newRequest = buildPreviewJSON(request);
            requestsMap.set(newRequest.id,newRequest);
        }
        else{
            requestsMap.get(request.id).habilidad.push(request.habilidad);
        }
    });
    return Array.from(requestsMap.values());
}

const buildPreviewJSON = (request) =>{
    requestSkillsArray = [];
    requestSkillsArray.push(request.habilidad);
    return {
        id : request.id,
        title: request.title,
        dateOfPublishing : request.dateOfPublishing,
        lat : request.lat,
        lng : request.lng,
        habilidad : requestSkillsArray
    }
}

module.exports ={
    skillsQueryBuilder,
    getAllFriendsRequestsBuilder,
    checkForMultipleRequests,
    buildPreviewJSON
}