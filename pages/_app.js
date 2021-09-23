import { useEffect } from 'react';

export default function MyApp({ Component, pageProps}) {
  // const { email, all } = props
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Component {...pageProps} />
  )
}
