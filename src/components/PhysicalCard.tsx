"use client";

import { Button, Card, CardContent, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { RefObject, useState } from "react";
import {  ITextElement, BasisTheoryElements } from "@basis-theory/react-elements";
import { Card as CardRender } from "@/components/Card";
import { setPinIssuer } from "@/client";
import { SetPinDialog } from "@/components/SetPinDialog";

const PhysicalCard = () => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<string>();

  const setPin = async (bt: BasisTheoryElements, pinRef: RefObject<ITextElement>) => {
    try {
      await setPinIssuer("marqeta", bt, pinRef);
      setSnackbar("PIN set successfully!");
    } catch (error) {
      setSnackbar("An error occurred, check the console for more info.");
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <CardRender backgroundImageUrl="/amex-3.png" />
          <Box display="flex" justifyContent="end" mt={2}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Set PIN Number
            </Button>
          </Box>
        </CardContent>
      </Card>
      <SetPinDialog
        open={open}
        onClose={() => setOpen(false)}
        setPin={setPin}
      />
      <Snackbar
        open={!!snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(undefined)}
        message={snackbar}
      />
    </>
  );
};

export { PhysicalCard };
