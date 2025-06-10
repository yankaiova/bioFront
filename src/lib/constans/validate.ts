import * as yup from "yup";
const VALID_REG_EXP = /^[ARNDCEQGHILKMFPSTWYV\-]+$/i;

export const schema = yup.object({
  seq1: yup
    .string()
    .required("Обязательное поле")
    .matches(
      VALID_REG_EXP,
      "Допустимые только символы аминокислот: латинские буквы и -",
    )
    .test(
      "len",
      "Последовательности должны быть одинаковой длины",
      function (value) {
        return value.length === this.parent.seq2?.length;
      },
    ),
  seq2: yup
    .string()
    .required("Обязательное поле")
    .matches(
      VALID_REG_EXP,
      "Допустимые только символы аминокислот: латинские буквы и -",
    )
    .test(
      "len",
      "Последовательности должны быть одинаковой длины",
      function (value) {
        return value.length === this.parent.seq1?.length;
      },
    ),
});
