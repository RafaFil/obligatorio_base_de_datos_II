const {helpRequest} = require('../entities/helpRequest.entity')
const {getRequestsByUserIdService} = require('../services/request.service')

const getRequestsByUserId = async (req,res) =>{
    getRequestsByUserIdService(req.params['userId']).then( requests =>
        {
            if(requests.success){
                return res.status(200).json({
                    success : true,
                    data : requests.data
                })}
            else{
                return res.status(404).json({
                    success : false,
                    data : requests.message
                })}
            }).catch( err => {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message ? err.message : "INTERNAL ERROR"
                });
            });
        }


