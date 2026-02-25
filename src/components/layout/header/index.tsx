import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  CloseOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Badge, Button, Col, Dropdown, Menu, MenuProps, Row } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from 'style/Theme';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';
import { ROUTES } from 'utils/constants/routes';
import { getInitials, showToaster } from 'utils/functions';

import { authStore } from 'services/store/auth';

import ConfirmModal from 'components/common/Modal/components/ConfirmModal';
import { DashbaordLogo, NotificationBellIcon } from 'components/svg';

import { StyledLayout } from '../Layout.Styled';
import { AvatarCircle } from './style';

interface NavItem {
  link?: string;
  label: string;
  key: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { link: ROUTES.dashboard, label: 'Dashboard', key: 'dashboard' },
  { link: ROUTES.faq.faqs, label: 'FAQs', key: 'faqs' },
  // { link: ROUTES.contact.list, label: 'Contact Us', key: 'contact-us' },
  {
    label: 'CMS',
    key: 'cms',
    children: [
      {
        label: 'Terms & Conditions',
        key: 'terms',
        link: ROUTES.termsAndConditions
      },
      {
        label: 'Privacy Policy',
        key: 'privacy',
        link: ROUTES.privacyPolicy
      }
    ]
  }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const {
    actions: { authFail },
    userData
  } = authStore((state) => state);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const activeNavKey = useMemo(() => {
    const currentPath = location.pathname;

    for (const item of navItems) {
      if (item.link && currentPath.startsWith(item.link)) {
        return [item.key];
      }

      if (item.children) {
        for (const child of item.children) {
          if (child.link && currentPath.startsWith(child.link)) {
            return [item.key, child.key];
          }
        }
      }
    }

    return ['dashboard'];
  }, [location.pathname]);

  const menuItems: ItemType<MenuItemType>[] = useMemo(() => {
    const mapItems = (items: NavItem[]): ItemType<MenuItemType>[] =>
      items.map((item) => ({
        key: item.key,
        label: item.label,
        children: item.children ? mapItems(item.children) : undefined
      }));

    return mapItems(navItems);
  }, []);

  const closeMenu = useCallback(() => {
    if (mobileMenuOpen && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match animation duration
    }
  }, [mobileMenuOpen, isClosing]);

  const handleMenuClick = ({ key }: { key: string }) => {
    const findItem = (items: NavItem[]): NavItem | undefined => {
      for (const item of items) {
        if (item.key === key) return item;
        if (item.children) {
          const found = findItem(item.children);
          if (found) return found;
        }
      }
    };

    const item = findItem(navItems);
    if (item?.link) {
      navigate(item.link);
      closeMenu();
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileMenuOpen, closeMenu]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.mobile-menu-button') &&
        !(event.target as HTMLElement).closest('.header-controller-wrap')
      ) {
        closeMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, closeMenu]);

  const onLogout = () => {
    authFail();
    queryClient.clear();
    showToaster('success', 'You are successfully logged out.');
    navigate(ROUTES.signIn, { replace: true });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          className="cta-btn"
          type="link"
          block={true}
          onClick={() => navigate(ROUTES.myAccount)}
        >
          My account
        </Button>
      ),
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: (
        <Button
          className="cta-btn"
          type="link"
          block={true}
          onClick={() => navigate(ROUTES.changePassword)}
        >
          Change password
        </Button>
      ),
      icon: <LockOutlined />
    },
    {
      key: '3',
      label: (
        <Button type="link" className="cta-btn" block onClick={() => setLogoutModalOpen(true)}>
          Logout
        </Button>
      ),
      icon: <LogoutOutlined />
    }
  ];

  return (
    <StyledLayout.Header>
      <ConfirmModal
        modalProps={{
          open: logoutModalOpen,
          onOpenChange: (open) => {
            if (!open) setLogoutModalOpen(false);
          },
          title: 'Are you sure you want to logout?',
          onOk: onLogout,
          okText: 'Yes',
          cancelText: 'No',
          className: 'logout-modal'
        }}
        buttonProps={{ style: { display: 'none' } }}
      />
      <Row gutter={16} align={'middle'} justify={'space-between'} className="m-0-imp h-100 w-100">
        <div className="flex-gap-32 header-left-section">
          <Col className="p-0-imp d-flex align-items-center justify-content-start header-logo">
            <span className="anticon ant-menu-item-icon">
              <DashbaordLogo />
            </span>
          </Col>
          <Col flex="auto" className="p-0-imp header-navigation desktop-nav">
            <Menu
              mode="horizontal"
              selectedKeys={activeNavKey}
              items={menuItems}
              onClick={handleMenuClick}
              className="header-nav-menu"
            />
          </Col>
        </div>
        <Col className="p-0-imp header-controller-wrap">
          <div className="controller-item">
            <span>
              <Badge
                className="notification-count-badge"
                size="small"
                overflowCount={99}
                offset={[-2, 0]}
              >
                <NotificationBellIcon />
              </Badge>
            </span>
          </div>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="layout-header-dropdown"
            overlayClassName="layout-header-dropdown"
          >
            {userData?.profile_photo ? (
              <Avatar
                size={42}
                className="w-100 h-100 user-avatar"
                src={`${IMAGE_URL}scamper/${ImageTypeEnum.STUDENT}/${userData?.profile_photo || ''}`}
                shape="circle"
              />
            ) : (
              <AvatarCircle bgColor={theme.color.primary}>
                {!userData.profile_photo && getInitials(userData.first_name, userData.last_name)}
              </AvatarCircle>
            )}
          </Dropdown>
          <Button
            type="text"
            icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            className="mobile-menu-button"
            onClick={() => {
              if (mobileMenuOpen) {
                closeMenu();
              } else {
                setMobileMenuOpen(true);
              }
            }}
          />
        </Col>
      </Row>
      {(mobileMenuOpen || isClosing) && (
        <div
          ref={menuContainerRef}
          className={`mobile-nav-menu-container ${isClosing ? 'closing' : ''}`}
        >
          <Menu
            mode="inline"
            selectedKeys={activeNavKey}
            items={menuItems}
            onClick={handleMenuClick}
            className="mobile-nav-menu"
          />
        </div>
      )}
    </StyledLayout.Header>
  );
};

export default Header;
