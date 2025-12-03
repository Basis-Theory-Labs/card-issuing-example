import {
  Card,
  CardContent,
  Collapse,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  ICardExpirationDateElement,
  ICardNumberElement,
  ICardVerificationCodeElement,
} from '@basis-theory/react-elements';
import { Box } from '@mui/system';

interface Props {
  visible?: boolean;
  token?: any;
}
export const CardDetails = ({ visible, token }: Props) => {
  const theme = useTheme();
  const cardNumberRef = useRef<ICardNumberElement>(null);
  const cardExpRef = useRef<ICardExpirationDateElement>(null);
  const cvcRef = useRef<ICardVerificationCodeElement>(null);

  useEffect(() => {
    if (token) {
      cardNumberRef.current?.setValue(token.data.number);
      cardExpRef.current?.setValue({
        month: token.data.expiration_month,
        year: token.data.expiration_year,
      });
      cvcRef.current?.setValue(token.data.cvc);
    }
  }, [token]);

  return (
    <Collapse in={visible && !!token}>
      <Card variant="outlined" sx={{ mt: 3 }}>
        <CardContent sx={{ display: 'flex' }}>
          <Typography fontWeight="600" width="30%">
            Card Number
          </Typography>
          <Box ml={4} flex={1}>
            <CardNumberElement
              id="cardDetailsNumber"
              ref={cardNumberRef}
              iconPosition="none"
              readOnly
              enableCopy
              placeholder="•••• •••• •••• ••••"
              style={{
                base: {
                  color: theme.palette.text.primary,
                  '::placeholder': {
                    color: theme.palette.text.primary,
                  },
                },
                invalid: {
                  // workaround for invalid test card numbers
                  color: theme.palette.text.primary,
                  '::placeholder': {
                    color: theme.palette.text.primary,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardContent sx={{ display: 'flex' }}>
          <Typography fontWeight="600" width="30%">
            Expiration Date
          </Typography>
          <Box ml={4} flex={1}>
            <CardExpirationDateElement
              id="cardExp"
              ref={cardExpRef}
              readOnly
              enableCopy
              placeholder=" "
              style={{
                base: {
                  color: theme.palette.text.primary,
                  '::placeholder': {
                    color: theme.palette.text.primary,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardContent sx={{ display: 'flex' }}>
          <Typography fontWeight="600" width="30%">
            CVC
          </Typography>
          <Box ml={4} flex={1}>
            <CardVerificationCodeElement
              id="cvc"
              ref={cvcRef}
              readOnly
              enableCopy
              placeholder=" "
              style={{
                base: {
                  color: theme.palette.text.primary,
                  '::placeholder': {
                    color: theme.palette.text.primary,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardContent sx={{ display: 'flex' }}>
          <Typography fontWeight="600" width="30%">
            Issuer / Source
          </Typography>
          <Box ml={4} flex={1}>
            <Typography variant="body2">
              {token?.metadata?.issuer?.toUpperCase() || 'n/a'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Collapse>
  );
};
