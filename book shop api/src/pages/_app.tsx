import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import Layout from "@/components/Layout/Layout";
import store, {persistor} from "@/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";


export default function App({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </PersistGate>
    </Provider>;
}
