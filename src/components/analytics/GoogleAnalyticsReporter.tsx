import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router-dom'

// fires a GA pageview every time the route changes 每次路线改变时，都会触发一次GA页面浏览
export default function GoogleAnalyticsReporter({ location: { pathname, search } }: RouteComponentProps): null {
  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`)
  }, [pathname, search])
  return null
}
