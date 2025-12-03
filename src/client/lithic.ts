import axios from 'axios';
import type { RefObject } from 'react';
import type {
  BasisTheoryElements,
  ITextElement,
} from '@basis-theory/react-elements';

export const setPinLithic = async (
  bt: BasisTheoryElements,
  pinRef: RefObject<ITextElement>
) => {
  const session = await bt.sessions.create();

  await axios.post('/api/authorize/lithic', {
    nonce: session.nonce,
  });

  await bt.proxy.patch({
    path: process.env.NEXT_PUBLIC_LITHIC_CARD_ID,
    headers: {
      'BT-PROXY-KEY': process.env.NEXT_PUBLIC_LITHIC_PIN_PROXY_KEY,
    },
    body: {
      pin: pinRef.current,
    },
    apiKey: session.sessionKey,
  });
};
