const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();

const targetPath = "./src/environments/environment.ts";
const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${process.env["API_URL"]}',
}
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envConfigFile);
