import Carousel from 'react-material-ui-carousel';
import { CardNumberElement, Token } from '@basis-theory/react-elements';
import { Card } from '@/components/Card';
import { Box } from '@mui/system';

interface Props {
  index: number;
  tokens: Token[];
  onChange: (index: number) => unknown;
}

const placeholder = (maskedValue: string) => {
  const lastFour = maskedValue.slice(-4);
  if (maskedValue.length === 15) {
    return `•••• •••••• •${lastFour}`;
  }
  return `•••• •••• •••• ${lastFour}`;
};

export const CardsCarousel = ({ index, tokens, onChange }: Props) => {
  return (
    <Box mt={2}>
      <Carousel
        index={index}
        animation="fade"
        autoPlay={false}
        onChange={(i) => onChange?.(i as number)}
        cycleNavigation={false}
        strictIndexing
      >
        {tokens.map((token, i) => (
          <Card
            key={token.id}
            backgroundImageUrl={`${
              (token as any).card.brand || 'mastercard'
            }.png`}
            color="white"
            cardNumber={
              // <Typography
              //   fontSize="5.5cqw"
              //   fontWeight="600"
              //   color="white"
              // >
              //   {placeholder((token.data as any).number)}
              // </Typography>
              <CardNumberElement
                id={`card-number-${token.id}`}
                iconPosition="none"
                readOnly
                placeholder={placeholder((token.data as any).number)}
                style={{
                  base: {
                    fontSize: '8cqw',
                    fontWeight: '600',
                    color: 'white',
                    '::placeholder': {
                      color: 'white',
                    },
                  },
                }}
              />
            }
          />
        ))}
      </Carousel>
    </Box>
  );
};
