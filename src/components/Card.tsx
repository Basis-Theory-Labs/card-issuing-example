import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  cardNumber?: ReactNode;
  cardholderName?: string;
  backgroundImageUrl?: string;
  color?: string;
}
export const Card = ({
  cardNumber = "•••• •••• •••• 2312",
  cardholderName = "James J. Holden",
  backgroundImageUrl = "/mastercard.png",
  color = "white",
}: Props) => {
  return (
    <Box width="100%">
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "60.48%",
          background: `url(${backgroundImageUrl}), lightgray 0% 0% / 45.32000124454498px 45.32000124454498px repeat;`,
          backgroundSize: "cover",
          borderRadius: "5%/8.4%",
        }}
      >
        <Box
          position="absolute"
          top="0"
          width="100%"
          height="100%"
          sx={{ containerType: "inline-size" }}
        >
          <Box position="absolute" top="56.67%" left="9.6%" width="65%">
            {typeof cardNumber === "string" && (
              <Typography color={color} fontSize="5.734cqw" fontWeight="600">
                {cardNumber}
              </Typography>
            )}
            {typeof cardNumber !== "string" && cardNumber}
          </Box>
          <Typography
            color={color}
            fontSize="4.84cqw"
            fontWeight="600"
            position="absolute"
            top="73%"
            left="9.6%"
          >
            {cardholderName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
