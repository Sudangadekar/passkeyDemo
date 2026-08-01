const { generateAuthenticationOptions, verifyAuthenticationResponse } = require('@simplewebauthn/server');

const users = require('../store/users');
const challenges = require('../store/challenges');

const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN;

exports.generateOptions = async (username) => {
    const user = users.get(username);
    if (!user) {
        throw new Error('User not found');
    }
    const options = await generateAuthenticationOptions({
        rpID,
        userVerification: 'preferred',
        allowCredentials: user.credentials.map((credential) => ({
            id: credential.id,
            type: 'public-key',
        })),
    });

    challenges.set(username, options.challenge);
    return options;
};

exports.verifyLogin = async (username, credential) => {
    const user = users.get(username);

    if (!user) {
        throw new Error('User not found');
    }

    const authenticator = user.credentials.find(
        (c) => c.id === credential.id
    );

    if (!authenticator) {
        throw new Error('Authenticator not found');
    }

    const expectedChallenge = challenges.get(username);

    const verification = await verifyAuthenticationResponse({
        response: credential,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
            id: authenticator.id,
            publicKey: authenticator.publicKey,
            counter: authenticator.counter,
        },
    });

    const { verified, authenticationInfo } = verification;

    if (verified && authenticationInfo) {
        authenticator.counter = authenticationInfo.newCounter;
    }

    return {
        verified,
        message: verified ? 'Login Successful' : 'Login Failed',
    };
};