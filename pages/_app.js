import { useEffect } from 'react';
import PropTypes from 'prop-types';

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

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
