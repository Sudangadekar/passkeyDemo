const loginService = require('../services/login.service');

exports.generateOptions = async (
    req,
    res
) => {

    try {

        const result =
            await loginService
                .generateOptions(
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

exports.verifyLogin = async (
    req,
    res
) => {

    try {

        const result =
            await loginService
                .verifyLogin(
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