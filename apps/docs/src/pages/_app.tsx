import { Appbar } from "@/content/controls/navigation/appbar";
import createEmotionCache from "@/styles/emotion";
import { api } from "@/trpc/api";
import { avoid, avoidpaths } from "@/utils/navigation";
import { CacheProvider } from "@emotion/react";
import { Body, Content, Shell, ThemeProvider } from "@oxygen/design-system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "intersection-observer";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "swiper/css";
import { NextAppProps } from "./_document";

const clientSideEmotionCache = createEmotionCache();

const NextApp = (props: NextAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
          },
        },
      })
  );
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Content>
              {!avoid(router.pathname, avoidpaths) && <Appbar />}
              <Shell>
                <Body>
                  <Component {...pageProps} data-application="true" />
                  <ReactQueryDevtools initialIsOpen={false} />
                </Body>
              </Shell>
            </Content>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(NextApp);
