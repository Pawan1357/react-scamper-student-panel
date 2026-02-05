import { useMemo, useState } from 'react';

import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';

import { DashboardIcon } from 'components/svg';

import { StyledLayout } from '../Layout.Styled';
import { MenuFoldIcon, MenuTriggerIcon } from './sidebar.styled';

interface ItemProps {
  link: string;
  label: string;
  key: React.Key;
  icon?: React.ReactNode;
  children?: ItemProps[];
  type?: 'item' | 'submenu';
}

function createMenuItem(
  link: string,
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemProps[],
  type?: 'item' | 'submenu'
) {
  return {
    link,
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  createMenuItem(
    ROUTES.dashboard,
    'Dashboard',
    '1',
    <span className="anticon ant-menu-item-icon">
      <DashboardIcon />
    </span>
  )
];

function compareLinkAndReturnKey(items: any, currentPath: any): any {
  let activeLinkKey;
  for (const item of items) {
    if (item?.children && Array.isArray(item?.children) && item.children.length > 0) {
      activeLinkKey = compareLinkAndReturnKey(item.children, currentPath);
    } else if (
      item.link === currentPath ||
      item.link === currentPath.split('/').splice(0, 3).join('/')
    ) {
      activeLinkKey = item.key;
      break;
    } else {
      continue;
    }
  }
  return activeLinkKey;
}
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const activeTab = useMemo(() => {
    const activeLinkKey = compareLinkAndReturnKey(items, location?.pathname);
    if (activeLinkKey) {
      return [activeLinkKey];
    } else {
      return [
        items?.find((item) => item?.link?.split('/')[1] === location?.pathname?.split('/')[1])
          ?.key ?? '1'
      ];
    }
  }, [location.pathname]);

  return (
    <StyledLayout.Sider
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      width={'260px'}
      collapsedWidth={60}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
      }}
      trigger={collapsed ? <MenuTriggerIcon /> : <MenuFoldIcon />}
    >
      <Menu
        className="sidebarMenu"
        selectedKeys={activeTab}
        mode="inline"
        onClick={({ item }: any) => navigate(item.props.link)}
        items={items as ItemType<MenuItemType>[]}
      />
    </StyledLayout.Sider>
  );
};

export default Sidebar;
