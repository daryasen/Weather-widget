'use client'


import Head from "next/head";
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import Theheader from '@/components/Theheader/Theheader';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import debounce from "debounce";
import { saveState } from '../app/localStorage/localStorage';
import { HydrationProvider, useHydrated, Server, Client } from "react-hydration-provider";
//import { store, persistor } from '@/redux/store';
//import { PersistGate } from 'redux-persist/es/integration/react';

store.subscribe(
    debounce(() => {
        saveState(store.getState());
    }, 800)
);


export const montserrat = Montserrat({ subsets: ['latin'] })
export const openSans = Open_Sans({ subsets: ['latin'] })


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Head>
                <title>Web Studio</title>
                <meta name="description" content="Project Bookshop Next JS TS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Batan Andrei" />
                <title>Bookshop Next JS TS</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <html lang="en">
                <Provider store={store}>
                    {/* <PersistGate loading={null} persistor={persistor}> */}
                        <HydrationProvider>
                            <body>
                                <Client>
                                    <Theheader />
                                    <main className={montserrat.className}>{children}</main>
                                </Client>
                            </body>
                        </HydrationProvider>
                    {/* </PersistGate> */}
                </Provider>
            </html>
        </>
    )
}
