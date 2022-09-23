const { createHash } = require('crypto');

function makeid(length: number) {  
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getPkce = (): { verifier: string; challenge: string } => {
  const id = makeid(43); //Must be min. of 43.
  return {
    verifier: id,
    challenge: createHash('sha256')
      .update(id)
      .digest('base64')
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_"),
  };
};
