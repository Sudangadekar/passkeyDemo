1.Passkey Registration:-

User enters username
        ↓
Clicks "Register Passkey"
        ↓
Angular calls Backend API
POST /register/options
        ↓
Backend generates Challenge
        ↓
Challenge returned to Angular
        ↓
Angular calls WebAuthn API
startRegistration()
        ↓
Browser opens Windows Hello /
Fingerprint / Face ID
        ↓
User verifies identity
        ↓
Device creates
Public Key + Private Key
        ↓
Private Key stays on device
(Never leaves device)
        ↓
Public Key sent to Backend
POST /register/verify
        ↓
Backend verifies response
        ↓
Public Key stored in database
        ↓
Registration Successful



2. Authentication flow

User enters username
        ↓
Clicks "Login Using Passkey"
        ↓
Angular calls Backend API
POST /login/options
        ↓
Backend generates Challenge
        ↓
Challenge returned to Angular
        ↓
Angular calls WebAuthn API
startAuthentication()
        ↓
Browser opens Windows Hello /
Fingerprint / Face ID
        ↓
User verifies identity
        ↓
Private Key signs challenge
        ↓
Signed challenge sent to Backend
POST /login/verify
        ↓
Backend verifies signature
using stored Public Key
        ↓
Verification Successful
        ↓
User Logged In
