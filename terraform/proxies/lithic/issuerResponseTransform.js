const { BasisTheoryClient } = require('@basis-theory/node-sdk-2');

module.exports = async function (req) {
  const {
    args: { headers, body },
    applicationOptions: { apiKey },
  } = req;

  const bt = new BasisTheoryClient({ apiKey });

  const { pan, exp_month, exp_year, cvv, ...rest } = body;

  const token = await bt.tokens.create({
    type: 'card',
    data: {
      number: pan,
      expiration_month: exp_month,
      expiration_year: exp_year,
      cvc: cvv,
    },
    metadata: {
      issuer: 'lithic',
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
