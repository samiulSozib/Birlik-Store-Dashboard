'use client';
import { AppMenuItemProps } from '@/types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';

const AppMenuitem = (props: AppMenuItemProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item!.to && pathname === item!.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');
    const { i18n } = useTranslation();

    const isRTL = ['ar', 'fa', 'ps', 'bn'].includes(i18n.language);


    const onRouteChange = (url: string) => {
        if (item!.to && item!.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        onRouteChange(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (item!.disabled) {
            event.preventDefault();
            return;
        }
        // Preserve native Link behavior, including same-page and modified clicks.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        item!.command?.({ originalEvent: event, item });
        if (event.defaultPrevented) return;
        setActiveMenu(item!.items && active ? (props.parentKey || '') : key);
    };

    const subMenu = item!.items && item!.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
            <ul style={{
                paddingLeft: '1rem',
                fontSize: '0.875rem' // Smaller font for sub-items
            }}>
                {item!.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
                })}
            </ul>
        </CSSTransition>
    );

    const menuItemClass = classNames(
        item!.class,
        'p-ripple',
        {
            'active-route': isActiveRoute,
            'layout-menuitem-disabled': item!.disabled
        }
    );


    // Determine font size based on whether it's a main item or sub-item
    const getFontSize = () => {
        if (props.root) {
            return '0.9rem'; // Main menu items
        }
        return props.parentKey ? '0.8rem' : '0.85rem'; // Sub-items get smaller font
    };

    return (
        <li className={classNames({
            'layout-root-menuitem': props.root,
            'active-menuitem': active
        })} style={{
            margin: '0.125rem 0' // Reduced margin
        }}>
            {props.root && item!.visible !== false && (
                <div className="layout-menuitem-root-text" style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    marginBottom: '0.25rem'
                }}>
                    {item!.label}
                </div>
            )}
            {(!item!.to || item!.items) && item!.visible !== false ? (
                <a
                    href={item!.url}
                    onClick={(e) => handleNavigation(e)}
                    className={menuItemClass}
                    target={item!.target}
                    tabIndex={item!.disabled ? -1 : 0}
                    style={{
                        fontSize: getFontSize(),
                        padding: '0.5rem 0.75rem', // Reduced padding
                        minHeight: '2rem' // Reduced height
                    }}
                >
                    <i
                        className={classNames('layout-menuitem-icon', item!.icon)}
                        style={{
                            marginLeft: isRTL ? "6px" : "0px",
                            marginRight: isRTL ? "0px" : "6px",
                            fontSize: '0.875rem' // Slightly smaller icons
                        }}
                    >
                    </i>
                    <span className="layout-menuitem-text" style={{
                        fontSize: 'inherit' // Inherit font size from parent
                    }}>
                        {item!.label}
                    </span>
                    {item!.items && (
                        <i className="pi pi-fw pi-angle-down layout-submenu-toggler" style={{
                            fontSize: '0.8rem' // Smaller toggle icon
                        }}></i>
                    )}
                    <Ripple />
                </a>
            ) : null}

            {item!.to && !item!.items && item!.visible !== false ? (
                <Link
                    href={item!.to}
                    replace={item!.replaceUrl}
                    target={item!.target}
                    onClick={(e) => handleNavigation(e)}
                    className={menuItemClass}
                    tabIndex={item!.disabled ? -1 : 0}
                    style={{
                        fontSize: getFontSize(),
                        padding: '0.5rem 0.75rem', // Reduced padding
                        minHeight: '2rem' // Reduced height
                    }}
                    scroll={true}
                >
                    <i
                        className={classNames('layout-menuitem-icon', item!.icon)}
                        style={{
                            marginLeft: isRTL ? "6px" : "0px",
                            marginRight: isRTL ? "0px" : "6px",
                            fontSize: '0.875rem' // Slightly smaller icons
                        }}
                    >
                    </i>
                    <span className="layout-menuitem-text" style={{
                        fontSize: 'inherit' // Inherit font size from parent
                    }}>
                        {item!.label}
                    </span>
                    {item!.items && (
                        <i className="pi pi-fw pi-angle-down layout-submenu-toggler" style={{
                            fontSize: '0.8rem' // Smaller toggle icon
                        }}></i>
                    )}
                    <Ripple />
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;
