const { Postulation } = require("../entities/postulation.entity")
const { getRequestPostulationsService, getFullPostulationtByIdService, deletePostulationByIdService, applyToRequestService, getAllUserPostulationsService } = require("../services/postulation.service")

const getRequestPostulations = async (req, res) => {

    getRequestPostulationsService(req.params['requestId'], req.username).then(postulations => {
        if (postulations.success && postulations.data) {
            return res.status(200).json({
                success: true,
                data: postulations.data
            });
        }
        else if (postulations.success) {
            return res.status(204).json({
                success: true,
                data: postulations.data
            });
        } else {
            return res.status(400).json({
                success: false,
                data: "No se pudo obtener la postulación con la información dada"
            });
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: `Internal server error.`
            });
        });
}

const getFullPostulationtById = async (req, res) => {
    getFullPostulationtByIdService(req.params['helperId'], req.params['requestId']).then(postulation => {
        if (postulation.success) {
            return res.status(200).json({
                success: true,
                data: postulation.data
            });
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se pudo obtener la postulación con la información dada"
            });
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "INTERNAL ERROR"
            });
        });
}

const getAllUserPostulations = async (req, res) => {
    getAllUserPostulationsService(req.username).then(postulation => {
        if (postulation.success && postulation.data) {
            return res.status(200).json({
                success: true,
                data: postulation.data
            });
        } else if (postulation.success) {
            return res.status(204).json({
                success: true,
                data: []
            })
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se pudo obtener la postulación con la información dada"
            });
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "INTERNAL ERROR"
            });
        });
}

const deletePostulationById = async (req, res) => {
    deletePostulationByIdService(req.params['helperId'], req.params['requestId'], req.username).then(postulation => {
        if (postulation.success) {
            return res.status(200).json({
                success: true,
                data: postulation.data
            });
        }
        else {
            return res.status(404).json({
                success: false,
                data: "No se pudo encontrar la postulación con la información dada"
            });
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "INTERNAL ERROR"
            });
        });
}

const applyToRequest = async (req, res) => {

    const { requestId } = req.body;

    if (!requestId || !req.username) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    const postulation = new Postulation(req.username, requestId);

    applyToRequestService(postulation).then(result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "No se pudo crear la postulación con la información dada"
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
        });
    })
        .catch(err => {
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
    getAllUserPostulations,
    applyToRequest
}