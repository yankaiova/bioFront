import type { FC } from "react";
import { Box, Snackbar } from "@mui/material";
import { useCopyOnSelect } from "../../hooks/useCopyOnSelect";
import { getColor } from "../../lib/utils/getColor";

type AminoViewProps = {
  seq1: string;
  seq2: string;
};

const CHARS_PER_LINE = 32;

export const AminoView: FC<AminoViewProps> = ({ seq1, seq2 }) => {
  const { isCopied: isCopied1, handleMouseUp: handleMouseUp1 } =
    useCopyOnSelect();
  const { isCopied: isCopied2, handleMouseUp: handleMouseUp2 } =
    useCopyOnSelect();

  const linesCount = Math.ceil(seq1.length / CHARS_PER_LINE);

  const lines1 = Array.from({ length: linesCount }, (_, i) =>
    seq1.slice(i * CHARS_PER_LINE, (i + 1) * CHARS_PER_LINE)
  );
  const lines2 = Array.from({ length: linesCount }, (_, i) =>
    seq2.slice(i * CHARS_PER_LINE, (i + 1) * CHARS_PER_LINE)
  );

  return (
    <>
      <Box
        sx={{
          fontFamily: "monospace",
          fontSize: "1.1rem",
          lineHeight: 1.5,
          whiteSpace: "pre",
          wordBreak: "break-word",
          maxWidth: "100%",
        }}
      >
        {lines1.map((l1, i) => {
          const l2 = lines2[i] || "";
          return (
            <Box key={`s-${l1}-${l2}-${i}`} sx={{ marginBottom: 1 }}>
              <Box onMouseUp={handleMouseUp1}>
                {l1.split("").map((char, idx) => (
                  <span
                    key={`s1-l1-${i}-${idx}`}
                    style={{ backgroundColor: getColor(char) }}
                  >
                    {char}
                  </span>
                ))}
              </Box>
              <Box onMouseUp={handleMouseUp2}>
                {l2.split("").map((char, idx) => {
                  const baseChar1 = l1[idx];
                  const bg =
                    baseChar1 && baseChar1 !== char
                      ? getColor(char)
                      : "transparent";
                  return (
                    <span
                      key={`s2-l2-${i}-${idx}`}
                      style={{ backgroundColor: bg }}
                    >
                      {char}
                    </span>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Snackbar
        open={isCopied1 || isCopied2}
        message="Последовательность скопирована"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1000}
      />
    </>
  );
};
