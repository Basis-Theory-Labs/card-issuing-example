const elementStyle = {
  base: {
    padding: '0',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '500',
    color: '#606376',
    ':disabled': {
      color: '#606376',
      backgroundColor: 'transparent',
    },
    '::placeholder': {
      color: '#8C90A4',
      backgroundColor: 'transparent',
    },
  },
};

const ttl = () =>
  new Date(
    Date.now() +
      1000 * // millis
        60 * // seconds
        10 // minutes
  ).toISOString();

export { elementStyle, ttl };
