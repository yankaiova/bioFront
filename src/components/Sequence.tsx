import type { FC } from "react";

import { Box } from "@mui/material";

export const Sequence: FC<{ seq: string }> = ({ seq }) => {
  return (
    <div>
      {[...seq.toUpperCase()].map((str) => (
        <Box key={str}>{str}</Box>
      ))}
    </div>
  );
};
