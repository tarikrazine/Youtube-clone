import { Loader } from '@mantine/core';
import { createContext, useContext } from 'react'
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getMe } from '../api';

import { Me, QueryKey } from '../types';

const MeContext = createContext<{
    user: Me;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => any;
    // @ts-ignore
}>(null);

interface MeContextProviderProps {
    children?: React.ReactNode
}

export const MeContextProvider: React.FunctionComponent<MeContextProviderProps> = ({ children }) => {
    const { data, isLoading, refetch } = useQuery(QueryKey.me, getMe)

    return (
        <MeContext.Provider value={{ user: data, refetch }}>
            {isLoading ? <Loader /> : children}
        </MeContext.Provider>
    )
}

export const useMe = () => useContext(MeContext)
