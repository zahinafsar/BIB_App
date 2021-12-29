if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./.env.development" });
}

const env = process.env;

module.exports = {
	saltOrRounds: 11,
	adminEmailAddress: "support@test.com",
	secretKey: env.SECRET_KEY
}
