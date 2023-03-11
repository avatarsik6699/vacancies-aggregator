import { SharedTypes } from "@shared/types/types";
import { css } from "@emotion/react";

export const $utils = {
  shortMixin: (params: SharedTypes.ShortStyles) => css`
    ${params.view &&
    css`
      display: ${params.view};
    `}

    ${params.w &&
    css`
      width: ${params.w};
    `};

    ${params.h &&
    css`
      height: ${params.h};
    `};

    ${params.min &&
    css`
      min-width: ${params.min};
    `};

    ${params.max &&
    css`
      max-width: ${params.max};
    `};

    ${params.flow &&
    css`
      flex-flow: ${params.flow};
    `}

    ${params.align &&
    css`
      align-items: ${params.align};
    `}

  ${params.justify &&
    css`
      justify-content: ${params.justify};
    `}

  ${params.grow &&
    css`
      flex-grow: ${params.grow};
    `}

  ${params.margin &&
    css`
      margin: ${params.margin};
    `}

  ${params.mt &&
    css`
      margin-top: ${params.mt};
    `}

  ${params.mb &&
    css`
      margin-bottom: ${params.mb};
    `}

  ${params.mr &&
    css`
      margin-right: ${params.mr};
    `}

  ${params.ml &&
    css`
      margin-left: ${params.ml};
    `}

  ${params.padding &&
    css`
      padding: ${params.padding};
    `}

  ${params.radius &&
    css`
      border-radius: ${params.radius};
    `}

  ${params.gap &&
    css`
      gap: ${params.gap};
    `}

  
  ${params.lh &&
    css`
      line-height: ${params.lh};
    `}
  
  ${params.direction &&
    css`
      flex-direction: ${params.direction};
    `}

  ${params.wrap &&
    css`
      flex-wrap: ${params.wrap};
    `}
  `,
};
