import { ReactNode } from "react";

export const handleData = (
  data: boolean = true,
  xml_if_true: ReactNode,
  xml_if_false: ReactNode
): ReactNode => {
  return data ? xml_if_true : xml_if_false;
};
