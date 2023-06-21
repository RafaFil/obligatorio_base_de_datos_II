const {getAllRequestSkillsService} = require('../services/skill.service');

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

async function rebuildRequest(requestData){
    result = [...requestData];
    for (let index = 0; index < result.length; index++) {
        skillsArray = await getAllRequestSkillsService(result[index].id)
        result[index] = {
            id : result[index].id, 
            title: result[index].title, 
            lat : result[index].lat,
            lng : result[index].lng,
            userDO: result[index].userdo,
            dateOfPublishing : result[index].dateofpublishing, 
            isActive : result[index].isactive, 
            wasResolved : result[index].wasresolved, 
            description : result[index].description,
            skills : skillsArray.data
        }
    }
    return result;
}

async function rebuildRequestWithUserData(requestData){
    result = [...requestData];
    for (let index = 0; index < result.length; index++) {
        skillsArray = await getAllRequestSkillsService(result[index].id)
        result[index] = {
            id : result[index].id, 
            title: result[index].title, 
            lat : result[index].lat,
            lng : result[index].lng,
            dateOfPublishing : result[index].dateofpublishing, 
            isActive : result[index].isactive, 
            wasResolved : result[index].wasresolved, 
            description : result[index].description,
            skills : skillsArray.data,
            userDO: result[index].do,
            name: result[index].name,
            lastname : result[index].lastname,
            verified : result[index].verified,
        }
    }
    return result;
}

module.exports ={
    skillsQueryBuilder,
    getAllFriendsRequestsBuilder,
    checkForMultipleRequests,
    buildPreviewJSON,
    rebuildRequestWithUserData,
    rebuildRequest
}