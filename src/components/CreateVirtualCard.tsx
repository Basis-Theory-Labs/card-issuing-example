import {
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import type { Token } from '@basis-theory/react-elements';
import { CardForm } from './CardForm';

interface Props {
  onCreateCard(token: Token): unknown;
}

export const CreateVirtualCard = ({ onCreateCard }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [busyIssuer, setBusyIssuer] = useState<string>();

  const createCard = async (issuer: string) => {
    setBusyIssuer(issuer);
    const { data } = await axios.post<Token>('/api/virtual-cards', {
      issuer,
    });
    onCreateCard(data);
    setBusyIssuer(undefined);
    setModalOpen(false);
  };

  const handleTokenize = (token: Token) => {
    onCreateCard(token);
    setModalOpen(false);
  };

  return (
    <Box display="flex" justifyContent="end">
      <Fab
        color="primary"
        onClick={() => setModalOpen(true)}
        disabled={!!busyIssuer}
      >
        <AddIcon />
      </Fab>
      <Modal onClose={() => setModalOpen(false)} open={isModalOpen}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: '24',
          }}
        >
          <CardContent>
            <Typography component="div" gutterBottom variant="h5">
              {'Add New Card'}
            </Typography>
            <Typography component="div" gutterBottom variant="subtitle1">
              {'Select a provider below:'}
            </Typography>
            <Stack direction="column" spacing={2}>
              <Button
                fullWidth
                sx={{ backgroundColor: '#635BFF' }}
                variant="contained"
                disabled={!!busyIssuer}
                loading={busyIssuer === 'stripe'}
                onClick={() => createCard('stripe')}
              >
                {'Stripe'}
              </Button>
              <Button
                fullWidth
                sx={{ backgroundColor: '#0A2F5A' }}
                variant="contained"
                disabled={!!busyIssuer}
                loading={busyIssuer === 'marqeta'}
                onClick={() => createCard('marqeta')}
              >
                {'Marqeta'}
              </Button>
              <Button
                fullWidth
                sx={{ backgroundColor: '#1A1A1A' }}
                variant="contained"
                disabled={!!busyIssuer}
                loading={busyIssuer === 'lithic'}
                onClick={() => createCard('lithic')}
              >
                {'Lithic'}
              </Button>
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <Typography component="div" gutterBottom variant="subtitle1">
              {'Or add one manually:'}
            </Typography>
            <CardForm onTokenize={handleTokenize} />
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
