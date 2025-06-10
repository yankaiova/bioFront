import type { FC } from "react";

import { Box, Snackbar } from "@mui/material";

import { getColor } from "../lib/utils/getColor";
import { useCopyOnSelect } from "../hooks/useCopyOnSelect";

type AminoViewProps = {
  seq1: string;
  seq2: string;
};

export const AminoView: FC<AminoViewProps> = ({ seq1, seq2 }) => {
  const { copied } = useCopyOnSelect(1000);
  const topSeq = seq1.split("");
  const bottomSeq = seq2.split("");

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {topSeq.map((char, index) => (
            <span
              key={`s1${char}-${index}`}
              style={{
                backgroundColor: getColor(char),
                padding: "4px 6px",
                fontFamily: "monospace",
                fontSize: "1.1rem",
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {bottomSeq.map((char, index) => {
            const diff: boolean = char !== topSeq[index];
            return (
              <span
                key={`s2${char}-${index}`}
                style={{
                  backgroundColor: diff ? getColor(char) : "transparent",
                  padding: "4px 6px",
                  fontFamily: "monospace",
                  fontSize: "1.1rem",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </Box>

      <Snackbar
        open={copied}
        message="Последовательность скопирована"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};
