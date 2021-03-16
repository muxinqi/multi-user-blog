import {GeistProvider, CssBaseline, Themes} from "@geist-ui/react";
import { Provider } from "next-auth/client"

/** default breakpoints
 * const breakpoints = {
 *   xs: { min: '0', max: '650px' },
 *   sm: { min: '650px', max: '900px' },
 *   md: { min: '900px', max: '1280px' },
 *   lg: { min: '1280px', max: '1920px' },
 *   xl: { min: '1920px', max: '10000px' },
 * }
 */

const breakpoints = {
  xs: { min: '0', max: '640px' },
  sm: { min: '640px', max: '768px' },
  md: { min: '768px', max: '1024px' },
  lg: { min: '1024px', max: '1280px' },
  xl: { min: '1280px', max: '10000px' },
}

function MyApp({ Component, pageProps }) {
  const myTheme = Themes.createFromLight({
    type: 'myTheme',
    breakpoints,
  })
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0
      }}
      session={pageProps.session} >
      <GeistProvider themes={[myTheme]} themeType="myTheme">
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </Provider>
  )
}

export default MyApp
