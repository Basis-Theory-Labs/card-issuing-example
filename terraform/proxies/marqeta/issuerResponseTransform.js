const { BasisTheoryClient } = require('@basis-theory/node-sdk-2');

module.exports = async function (req) {
  const {
    args: { headers, body },
    applicationOptions: { apiKey },
  } = req;

  const bt = new BasisTheoryClient({ apiKey });

  const { pan, expiration, cvv_number, ...rest } = body;

  const token = await bt.tokens.create({
    type: 'card',
    data: {
      number: pan,
      expiration_month: expiration.slice(0, 2),
      expiration_year: `20${expiration.slice(-2)}`,
      cvc: cvv_number,
    },
    metadata: {
      issuer: 'marqeta',
    },
  });

  return {
    headers,
    body: {
      ...rest,
      token,
    },
  };
};
