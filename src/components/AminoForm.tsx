import type * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";

import { schema } from "../lib/constans/validate";
import { AminoView } from "./AminoView/AminoView";
import { BaseInputAmino } from "./BaseInput";

export type FormValues = yup.InferType<typeof schema>;

export const AminoForm: FC = () => {
  const [seq1, setSeq1] = useState<string>("");
  const [seq2, setSeq2] = useState<string>("");
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { seq1: "", seq2: "" },
  });

  const onSubmit = (data: FormValues) => {
    setSeq1(data.seq1);
    setSeq2(data.seq2);
    reset();
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <BaseInputAmino
          name="seq1"
          label="Последовательность 1"
          control={control}
        />
        <BaseInputAmino
          name="seq2"
          label="Последовательность 2"
          control={control}
        />
        <Button type="submit">Отправить</Button>
      </form>
      {seq1 && seq2 ? (
        <AminoView key={seq1 + seq2} seq1={seq1} seq2={seq2} />
      ) : null}
    </Box>
  );
};
