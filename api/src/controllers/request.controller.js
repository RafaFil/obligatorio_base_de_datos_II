const { getRequestsByUserDOService, getRequestByIdService, getQuestionsFromRequestService, createRequestService, createQuestionService, answerQuestionService, isRequestActiveService, getRequestsService, deleteRequestService } = require('../services/request.service')

const getRequestsByUserDO = async (req, res) => {
    getRequestsByUserDOService(req.params['userId']).then(requests => {
        if (requests.success) {
            return res.status(200).json({
                success: true,
                data: requests.data
            })
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se hallaron solicitudes para el usuario dado"
            })
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    });
}

const getRequestById = async (req,res) => {
    getRequestByIdService(req.params['requestId']).then(request =>{
        if (request.success){
            return res.status(200).json({
                success: true,
                data: request.data
            })
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se hallaron solicitudes con el id dado"
            })
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    });
}

const getQuestionsFromRequest = async (req,res) => {
    getQuestionsFromRequestService(req.params['requestId']).then(questions => {
        if (questions.success && questions.data){
            return res.status(200).json({
                success: true,
                data: questions.data
            })
        }
        else if (questions.success){
            return res.status(204).json({
                success: true,
                data: questions.data
            })
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se hallaron preguntas para la solicitud dada"
            })
        }
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    });
}

const createRequest = async (req, res) =>{
    const {title, lat, lng, userDO, dateOfPublishing, description,skills} = req.body
    if(!title || !lat || !lng || !userDO || !dateOfPublishing || !description || !skills){
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }
    createRequestService(req.body).then(helpRequest =>{
        if (!helpRequest.success) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo crear la solicitud, revise los datos enviados.'
            });
        }
        return res.status(201).json({
            success: true,
            data: helpRequest.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

const createQuestion = async (req, res) =>{
    const {requestId,question} = req.body;
    if(!requestId || !question){
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }
    else if(!req.username){
        return res.status(400).json({
            success: false,
            message: 'missing fields in request'
        });
    }
    createQuestionService(requestId,req.username,question).then(question =>{
        if (!question.success) {
            return res.status(400).json({
                success: false,
                message: "No se pudo crear la pregunta"
            });
        }
        return res.status(201).json({
            success: true,
            data: question.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

const answerQuestion = async (req,res) => {
    const {requestId,answer} = req.body;
    if(!requestId || !answer){
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }
    else if(!req.username){
        return res.status(400).json({
            success: false,
            message: 'missing fields in request'
        });
    }
    answerQuestionService(requestId,req.username,answer).then(question =>{
        if (!question.success) {
            return res.status(400).json({
                success: false,
                message: "No se pudo responder la duda"
            });
        }
        return res.status(201).json({
            success: true,
            data: question.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

const isRequestActive = (req,res) => {
    requestId = req.params['requestId'];
    isRequestActiveService(requestId).then(isActive =>{
        if (!isActive.success) {
            return res.status(404).json({
                success: false,
                message: "No se hallaron solicitudes para el id dado"
            });
        }
        return res.status(200).json({
            success: true,
            data: isActive.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

const getRequests = (req,res) =>{
    userDO = req.username;
    getRequestsService(userDO).then(requests =>{
        if (!requests.success) {
            return res.status(404).json({
                success: false,
                message: "No se hallaron solicitudes para el usuario dado"
            });
        }
        if (!requests.data){
        return res.status(204).json({
            success: true,
            data : []
        });}
        return res.status(200).json({
            success : true,
            data : requests.data
        })
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

const deleteRequest = (req,res) =>{
    deleteRequestService(req.params['requestId']).then(requests =>{
        if (!requests.success) {
            return res.status(404).json({
                success: false,
                message: "No se pudo eliminar la solicitud, no se encuentra"
            });
        }
        else{
            return res.status(200).json({
                success : true,
                data : requests.data
            });
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
        });
    })
}

module.exports = {
    getRequestsByUserDO,
    getRequestById,
    getQuestionsFromRequest,
    createRequest,
    createQuestion,
    answerQuestion,
    isRequestActive,
    getRequests,
    deleteRequest
}