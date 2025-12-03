import axios from 'axios';
import type { RefObject } from 'react';
import type {
  BasisTheoryElements,
  ITextElement,
} from '@basis-theory/react-elements';

export const setPinGalileo = async (
  bt: BasisTheoryElements,
  pinRef: RefObject<ITextElement>
) => {
  const {
    data: { token },
  } = await axios.post('/api/authorize/galileo');

  await bt.client?.post(
    'https://agserv-sandbox.cv.gpsrv.com/agserv/pin', // request is made through the iframe
    {
      pin: pinRef.current, // passing element in the payload
      pin_reentry: pinRef.current, // passing element in the payload
      submitter_id: process.env.NEXT_PUBLIC_GALILEO_PROVIDER_ID,
      pin_change_key: token,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};
