const skillsQueryBuilder = (requestSkills)=>{
    buildingQuery = `INSERT INTO habilidades_solicitudes(solicitud_id,habilidad_id,nivel) VALUES`
    arrayOfValues = []
    for (let index = 0; index < requestSkills.length;index = index + 3) {
        if(index+3 == requestSkills.length){
            buildingQuery = buildingQuery.concat(`($${index+1},$${index+2},$${index+3}) RETURNING *;`);
        }
        else{
            buildingQuery = buildingQuery.concat(`($${index+1},$${index+2},$${index+3}),`);
        }
    }
    return buildingQuery;
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