import { Typography } from 'antd';
import AntdStyle from 'style/Antd';
import { Spacing } from 'style/Common/Spacing';
import { TiptapContent } from 'style/Common/TipTapContent';
import { Common } from 'style/Common/common';

import { Flex } from '../Common/flex';
import { Grid } from '../Common/grid';
import { Reset } from '../Common/reset';

const GlobalStyle = () => {
  return (
    <>
      <Grid />
      <Common />
      <Flex />
      <Reset />
      <Spacing />
      <Typography />
      <AntdStyle />
      <TiptapContent />
    </>
  );
};

export default GlobalStyle;
