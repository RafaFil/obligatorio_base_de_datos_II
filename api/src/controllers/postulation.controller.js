const { Postulation } = require("../entities/postulation.entity")
const { getRequestPostulationsService, getFullPostulationtByIdService, deletePostulationByIdService, applyToRequestService } = require("../services/postulation.service")

const getRequestPostulations = async (req, res) => {

    getRequestPostulationsService(req.params['requestId'], req.username,).then( postulations => {
        if(postulations.success && postulations.data){
            return res.status(200).json({
                success: true,
                data: postulations.data
            });}
        else if (postulations.success){
            return res.status(204).json({
                success: true,
                data: postulations.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: postulations.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

const getFullPostulationtById = async (req, res) => {
    getFullPostulationtByIdService(req.params['helperId'], req.params['requestId']).then( postulation => {
        if(postulation.success){
            return res.status(200).json({
                success: true,
                data: postulation.data
        });}
        else{
            return res.status(404).json({
                success: false,
                data: postulation.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message ? err.message : "INTERNAL ERROR"
        });
    });
}

const deletePostulationById = async (req, res) => {
    deletePostulationByIdService(req.params['id'], req.username).then( postulation => {
        if(postulation.success){
            return res.status(200).json({
                success: true,
                data: postulation.data
        });}
        else{
            return res.status(404).json({
                success: false,
                data: postulation.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message ? err.message : "INTERNAL ERROR"
        });
    });
}

const applyToRequest = async ( req , res) => {

    const { requestId } = req.body;

    if (!requestId || !req.username) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    const postulation = new Postulation(req.username, requestId);

    applyToRequestService(postulation).then ( result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    })
}

module.exports = {
    getRequestPostulations,
    getFullPostulationtById,
    deletePostulationById,
    applyToRequest
}