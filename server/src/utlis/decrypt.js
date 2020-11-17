// Includes crypto module
const crypto = require("crypto");

const Decryptation = (encryptedData) => {
  const algorithm = "aes-192-cbc";
  const password = "learnifiifun";
  const key = crypto.scryptSync(password, "GfG", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = "";
  decipher.on("readable", () => {
    let chunk;
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString("utf8");
    }
  });
  decipher.on("end", () => {
    return decrypted;
  });
  // const encrypted = "uMG1w54JAzBGkEFegd6qEeJYgEa2xCS3eBE/RVMQkgs=";
  decipher.write(encryptedData, "base64");
  decipher.end();
  return decrypted;
};
module.exports = Decryptation;
