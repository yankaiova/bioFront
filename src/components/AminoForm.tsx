import { useState, type FC } from "react";
import type * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";

import { schema } from "../lib/constans/validate";
import { BaseInputAmino } from "./BaseInput";
import { AminoView } from "./AminoView";

export type FormValues = yup.InferType<typeof schema>;

export const AminoForm: FC = () => {
  const [result, setResult] = useState<FormValues | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { seq1: "", seq2: "" },
  });

  const onSubmit = (data: FormValues) => {
    setResult(data);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      {result ? <AminoView seq1={result.seq1} seq2={result.seq2} /> : null}
    </Box>
  );
};
