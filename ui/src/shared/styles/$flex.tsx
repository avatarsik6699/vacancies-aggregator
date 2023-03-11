import { $utils } from "./$utils";
import { SharedTypes } from "@shared/types/types";
import styled from "@emotion/styled";

export const $Flex = styled("div")<SharedTypes.ShortStyles>`
  display: flex;

  ${props => $utils.shortMixin(props)}
`;
