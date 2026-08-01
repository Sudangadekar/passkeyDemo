const crypto = require('crypto');
const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');
const users = require('../store/users');
const challenges = require('../store/challenges');

const rpID = process.env.RP_ID;
const rpName = process.env.RP_NAME;
const origin = process.env.ORIGIN;

exports.generateOptions = async (username) => {
    let user =
        users.get(username);
    if (!user) {
        user = {
            id: crypto.randomUUID(),
            username,
            credentials: []
        };

        users.set(username, user);
    }

    const options =
        await generateRegistrationOptions({
            rpName,
            rpID,
            userName: username,
            userID: Buffer.from(user.id),
            timeout: 60000,
            attestationType: 'none',
            authenticatorSelection: {
                residentKey: 'preferred',
                userVerification: 'preferred'
            },
            excludeCredentials:
                user.credentials.map(
                    credential => ({
                        id: credential.id,
                        type: 'public-key'
                    })
                )
        });

    challenges.set(username, options.challenge);
    return options;
};

exports.verifyRegistration = async (username, credential) => {
    const expectedChallenge = challenges.get(username);
    const verification = await verifyRegistrationResponse({
        response: credential,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID
    });
    const { verified, registrationInfo } = verification;
    if (verified && registrationInfo) {
        const user = users.get(username);
        const { credential: cred } = registrationInfo;

        user.credentials.push({
            id: cred.id,
            publicKey: cred.publicKey,
            counter: cred.counter
        });

        users.set(username, user);
    }
    return { verified };
};