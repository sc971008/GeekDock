// Add configuration setting for your server to this file

// uncomment for MONGO_URL for docker
const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb://mongodb:27017/fake_so";

// config for local testing, that is, without docker.
//const MONGO_URL = "mongodb://localhost:27017/fake_so";

const CLIENT_URL = "https://geekdockclient-production.up.railway.app";
const port = process.env.PORT || 8000;

module.exports = {
    MONGO_URL,
    CLIENT_URL,
    port
};
