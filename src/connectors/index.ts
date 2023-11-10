import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { PortisConnector } from '@web3-react/portis-connector'

// import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
// const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
// const PORTIS_ID = process.env.REACT_APP_PORTIS_ID

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}
// 链id设置 
export const injected = new InjectedConnector({
  // supportedChainIds: [1, 3, 4, 5, 42,65,534352]
  supportedChainIds: [534352]
})

// mainnet only
// walletConnect 钱包连接器
// export const walletconnect = new WalletConnectConnector({
//   rpc: { 534352: NETWORK_URL },
//   // rpc: { 1: NETWORK_URL },
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
//   pollingInterval: 15000
// })

// mainnet only  主网默认id设置
//  Fortmatic 钱包连接器   不支持scroll网络
// export const fortmatic = new FortmaticConnector({
//   apiKey: FORMATIC_KEY ?? '',
//   chainId: 534352
//   // chainId: 1
// })

// mainnet only  Portis 连接器 不支持 scroll网络
// 定义一个 PortisConnector 类型的对象，用于连接到以太坊节点
// 表示一个用于连接 Portis 钱包的连接器。 这个对象被创建时，接收一个名为，options的参数
// 其中包含一个dappid 属性，用户执行要连接的 Portis钱包 的ID
// networks 属性定义了要连接的网络，在这里，它只包含一个网络，即以太主网 1
// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks:[534352]
//   // networks: [1]
// })

// mainnet only
// export const walletlink = new WalletLinkConnector({
//   url: NETWORK_URL,
//   appName: 'Uniswap',
//   appLogoUrl:
//     'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
// })
