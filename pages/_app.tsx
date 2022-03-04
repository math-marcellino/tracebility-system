import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'wagmi'
import { providers } from 'ethers'

function MyApp({ Component, pageProps }: AppProps) {
  const mumbaiProvider = new providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/0f6aa643f70545beebc8e4f9/polygon/mumbai', 80001)
  return <>
    <Provider autoConnect provider={mumbaiProvider}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
