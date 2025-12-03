import React, { useRef, useState } from 'react';
import { CardElement, useBasisTheory } from '@basis-theory/react-elements';
import type { Token, ICardElement } from '@basis-theory/react-elements';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Divider } from '@mui/material';
import { elementStyle, ttl } from './constants';

interface Props {
  onTokenize?: (token: Token) => unknown;
}

export const CardForm = ({ onTokenize }: Props) => {
  const [cardComplete, setCardComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<ICardElement>(null);

  const { bt } = useBasisTheory();

  const tokenize = async () => {
    if (bt) {
      setBusy(true);
      const token = await bt.tokens.create({
        type: 'card',
        data: cardRef.current,
        metadata: {
          issuer: 'manual',
        },
      });

      cardRef.current?.clear();
      setCardComplete(false);
      setBusy(false);
      onTokenize?.(token);
    }
  };

  return (
    <Card sx={{ width: 480 }} variant="outlined">
      <CardContent>
        <CardElement
          id="card"
          onChange={({ complete }) => setCardComplete(complete)}
          ref={cardRef}
          style={elementStyle}
        />
        <Divider sx={{ mt: 3 }} />
        <Box display="flex" justifyContent="center" mt={3}>
          <LoadingButton
            color="primary"
            disabled={!cardComplete}
            loading={busy}
            onClick={tokenize}
            variant="contained"
          >
            {'Submit'}
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};
