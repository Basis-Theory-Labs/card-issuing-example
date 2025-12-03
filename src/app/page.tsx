"use client";

import {
  AppBar,
  Container,
  styled,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Box } from "@mui/system";
import { PhysicalCard } from "@/components/PhysicalCard";
import {
  BasisTheoryProvider,
  useBasisTheory,
} from "@basis-theory/react-elements";
import { VirtualCards } from "@/components/VirtualCards";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function Home() {
  const [tab, setTab] = useState("physical");
  const { bt } = useBasisTheory(
    process.env.NEXT_PUBLIC_BASIS_THEORY_PUBLIC_KEY,
  );

  return (
    <>
      <BasisTheoryProvider bt={bt}>
        <AppBar position="fixed" elevation={0} color="secondary">
          <Toolbar sx={{ justifyContent: "center" }} color="secondary">
            TokenTrust
          </Toolbar>
        </AppBar>
        <Offset />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(_, value) => setTab(value)} centered>
              <Tab label="Physical Card" value="physical" />
              <Tab label="Virtual Cards" value="virtual" />
            </TabList>
          </Box>
          <Container component="main" maxWidth="sm">
            <Typography variant="h4" textAlign="center" marginTop={6}>
              My Cards
            </Typography>
            <TabPanel value="physical">
              <PhysicalCard />
            </TabPanel>
            <TabPanel
              value={tab}
              sx={tab !== "virtual" ? { display: "none" } : undefined}
            >
              <VirtualCards />
            </TabPanel>
          </Container>
        </TabContext>
      </BasisTheoryProvider>
    </>
  );
}
