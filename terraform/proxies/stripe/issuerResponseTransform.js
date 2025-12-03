const { BasisTheoryClient } = require('@basis-theory/node-sdk-2');

module.exports = async function (req) {
  const {
    args: { headers, body },
    applicationOptions: { apiKey },
  } = req;

  const bt = new BasisTheoryClient({ apiKey });

  const { number, exp_month, exp_year, cvc, ...rest } = body;

  const token = await bt.tokens.create({
    type: 'card',
    data: {
      number,
      expiration_month: exp_month,
      expiration_year: exp_year,
      cvc,
    },
    metadata: {
      issuer: 'stripe',
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
