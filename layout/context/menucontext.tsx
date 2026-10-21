'use client';
import { ChildContainerProps, MenuContextProps } from '@/types';
import { createContext, useMemo, useState } from 'react';

export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({ children }: ChildContainerProps) => {
    const [activeMenu, setActiveMenu] = useState('');
    const value = useMemo(() => ({ activeMenu, setActiveMenu }), [activeMenu]);
    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
