import React from 'react';
import { ListPlus } from '@strapi/icons';
import styled from 'styled-components';
import { Flex } from '@strapi/design-system';

const IconBox = styled(Flex)`
  /* Hard code color values */
  /* to stay consistent between themes */
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;

const PluginIcon = () => {
    return (
        <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
            <ListPlus />
        </IconBox>
    )
};

export { PluginIcon };
