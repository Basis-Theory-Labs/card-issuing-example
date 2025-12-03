import {
  BasisTheoryElements,
  ITextElement,
} from '@basis-theory/react-elements';
import { RefObject } from 'react';
import { setPinGalileo } from '@/client/galileo';
import { setPinLithic } from '@/client/lithic';
import { setPinMarqeta } from '@/client/marqeta';

const setPinIssuer = (
  issuer: 'marqeta' | 'lithic' | 'galileo',
  bt: BasisTheoryElements,
  pinRef: RefObject<ITextElement>
) => {
  switch (issuer) {
    case 'galileo':
      return setPinGalileo(bt, pinRef);
    case 'lithic':
      return setPinLithic(bt, pinRef);
    case 'marqeta':
      return setPinMarqeta(bt, pinRef);
    default:
      throw new Error(`Issuer "${issuer}" not supported.`);
  }
};

export { setPinIssuer, setPinGalileo, setPinLithic, setPinMarqeta };
