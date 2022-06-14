import React, { useState } from 'react';
import Head from 'next/head';

import { AppProps } from 'next/app';
import { NextPage } from 'next/types';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from "react-query";
import { MeContextProvider } from '../context/getMe';

const queryClient = new QueryClient()

type NextPageLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageLayout
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NotificationsProvider>

            <QueryClientProvider client={queryClient}>
              <MeContextProvider>
                {
                  getLayout(
                    <main>
                      <Component {...pageProps} />
                    </main>
                  )
                }
              </MeContextProvider>
            </QueryClientProvider>

          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}