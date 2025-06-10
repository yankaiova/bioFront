import type { FC } from "react";

import { Box, Snackbar } from "@mui/material";

import { useCopyOnSelect } from "../../hooks/useCopyOnSelect";
import { OverlayText } from "../OverlayText";
import { AminoLine } from "./AminoLine/AminoLine";

type AminoViewProps = {
  seq1: string;
  seq2: string;
};

export const AminoView: FC<AminoViewProps> = ({ seq1, seq2 }) => {
  const { isCopied } = useCopyOnSelect(1000);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 5,
          fontFamily: "monospace",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
      >
        <div style={{ position: "relative" }}>
          <OverlayText text={seq1} />
          <AminoLine seq={seq1} />
        </div>
        <div style={{ position: "relative" }}>
          <OverlayText text={seq2} />
          <AminoLine seq={seq2} compareWith={seq1} highlightDiff />
        </div>
      </Box>
      <Snackbar
        open={isCopied}
        message="Последовательность скопирована"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};
