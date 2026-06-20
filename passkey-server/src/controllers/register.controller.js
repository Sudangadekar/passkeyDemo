const registerService = require('../services/register.service');

exports.generateOptions = async (req, res) => {
    try {

        const result =
            await registerService.generateOptions(
                req.body.username
            );

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

exports.verifyRegistration = async (req, res) => {

    try {

        const result =
            await registerService.verifyRegistration(
                req.body.username,
                req.body.credential
            );

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};