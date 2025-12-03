const { BasisTheoryClient } = require('@basis-theory/node-sdk-2');

module.exports = async function (req) {
  const {
    args: { headers, body },
    applicationOptions: { apiKey },
  } = req;

  const bt = new BasisTheoryClient({ apiKey });

  const token = await bt.tokens.create({
    type: 'card',
    data: body,
    fingerprintExpression: '{{ data.number }}',
    deduplicateToken: true,
    expiresAt: new Date(
      Date.now() +
        1000 * // millis
          60 * // seconds
          60 * // minutes
          1 // hours
    ).toISOString(),
  });

  return {
    headers,
    body: token,
  };
};
