import { useCallback, useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { addPopup, PopupContent, removePopup, toggleWalletModal, toggleSettingsMenu } from './actions'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../index'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen)
}
// 
// 导出一个函数，用于切换钱包模态框
export function useWalletModalToggle(): () => void {
  // 获取dispatch函数 触发action 函数
  const dispatch = useDispatch()
  // 使用useCallback函数，当dispatch函数发生变化时，调用toggleWalletModal函数
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch])
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen)
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch])
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}
