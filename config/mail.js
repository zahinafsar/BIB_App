if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}

const env = process.env;

module.exports = {
	host: env.EMAIL_HOST,
    port: env.EMAIL_HOST_PORT,
    email: env.EMAIL_ADDRESS,
    password: env.EMAIL_PASSWORD,
};
