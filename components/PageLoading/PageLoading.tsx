import * as React from 'react';
import { useEffect } from 'react';

import { Router, useRouter } from 'next/router';

import cs from 'classnames';

const PageLoading = () => {
  const { isFallback } = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <div className={cs('PageLoading', (isFallback || loading) && 'visible')}>
      <div className="icon"></div>
      <div className="text">
        <p>이미지가 많아 로딩이 오래걸릴 수 있습니다.</p>
        <p> 잠시만 기다려주세요! </p>
      </div>
    </div>
  );
};

export default PageLoading;
