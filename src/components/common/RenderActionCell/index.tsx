import { Space } from 'antd';

import { IRenderActionCellProps } from './types';

const RenderActionCell: React.FC<IRenderActionCellProps> = (props) => {
  const { size = 10, ...rest } = props;
  return (
    <Space
      {...rest}
      size={size}
      className={`action-cell-space ${props.className}`}
      direction="horizontal"
    >
      {props.children}
    </Space>
  );
};

export default RenderActionCell;
