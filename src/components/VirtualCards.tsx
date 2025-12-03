'use client';

import { CardDetails } from '@/components/CardDetails';
import { CardsCarousel } from '@/components/CardsCarousel';
import { CreateVirtualCard } from '@/components/CreateVirtualCard';
import type { Page } from '@basis-theory/node-sdk/dist/cjs/core/pagination';
import { Token, useBasisTheory } from '@basis-theory/react-elements';
import { Button, Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';

const VirtualCards = () => {
  const [init, setInit] = useState(false);
  const [busyAction, setBusyAction] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [cards, setCards] = useState<Token[]>([]);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [visibleCard, setVisibleCard] = useState<Token>();

  const { bt } = useBasisTheory();
  const selectedCard = cards[cardIndex];

  const toggleDisplayCard = async () => {
    if (!visible && selectedCard?.id !== visibleCard?.id) {
      setBusyAction('display');
      await displayCard();
      setBusyAction(undefined);
    }
    setVisible(!visible);
  };

  const displayCard = async () => {
    const { nonce, sessionKey } = await bt!.sessions.create();
    await axios.post('/api/authorize/display', {
      nonce,
      tokenId: selectedCard.id,
    });
    const token = await bt!.tokens.retrieve(selectedCard.id, {
      apiKey: sessionKey,
    });
    setVisibleCard(token);
  };

  const deleteCard = async () => {
    setBusyAction('delete');
    if (window.confirm('Delete this card?')) {
      await axios.delete(`/api/virtual-cards/${cards[cardIndex].id}`);
      const copy = [...cards];
      copy.splice(cardIndex, 1);
      setCards(copy);
      setVisible(false);
      setCardIndex(0);
    }
    setBusyAction(undefined);
  };

  const fetchTokens = async () => {
    const {
      data: { data },
    } = await axios<Page<Token>>('/api/virtual-cards');

    setInit(true);
    setCards(data);
  };

  useEffect(() => {
    if (!init) {
      fetchTokens();
    }
  }, [init]);

  const handleCreateCard = (token: Token) => {
    setCards([...cards, token]);
    setCardIndex(cards.length);
    setVisible(false);
  };

  const handleSelectCard = (index: number) => {
    setVisible(false);
    setCardIndex(index);
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <CreateVirtualCard onCreateCard={handleCreateCard} />
          {cards.length > 0 && (
            <>
              <CardsCarousel
                index={cardIndex}
                tokens={cards}
                onChange={handleSelectCard}
              />
              <Box display="flex" justifyContent="end" mt={2}>
                <Button
                  loading={busyAction === 'delete'}
                  disabled={!!busyAction}
                  variant="outlined"
                  onClick={deleteCard}
                  color="error"
                >
                  Delete Card
                </Button>
                <Button
                  loading={busyAction === 'display'}
                  disabled={!bt || !!busyAction}
                  variant="contained"
                  onClick={toggleDisplayCard}
                  sx={{ ml: 1 }}
                >
                  {visible ? 'Hide' : 'Show'} Details
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
      <CardDetails visible={visible} token={visibleCard} />
    </>
  );
};

export { VirtualCards };
