import axios from 'axios';
import type { RefObject } from 'react';
import type {
  BasisTheoryElements,
  ITextElement,
} from '@basis-theory/react-elements';

export const setPinMarqeta = async (
  bt: BasisTheoryElements,
  pinRef: RefObject<ITextElement>
) => {
  const token = await bt.tokens.create({
    type: 'token',
    data: pinRef.current,
  });

  await axios.post('/api/authorize/marqeta', {
    token,
  });
};
