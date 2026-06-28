import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Grug - Brian Kennedy',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: import.meta.env.PROD
      ? [
          {
            src: `${import.meta.env.VITE_UMAMI_WEBSITE_URL}/script.js`,
            defer: true,
            'data-website-id': import.meta.env.VITE_UMAMI_WEBSITE_ID,
            'data-do-not-track': import.meta.env.VITE_UMAMI_DO_NOT_TRACK,
            'data-performance': import.meta.env.VITE_UMAMI_PERFORMANCE_TRACKING,
          },
          {
            src: `${import.meta.env.VITE_UMAMI_WEBSITE_URL}/recorder.js`,
            defer: true,
            'data-website-id': import.meta.env.VITE_UMAMI_WEBSITE_ID,
            'data-sample-rate': '0.15',
            'data-mask-level': 'moderate',
            'data-max-duration': '300000',
          },
        ]
      : [],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // A little messy but used to auto add tags to outbound links
  useEffect(() => {
    document.querySelectorAll('a').forEach((a) => {
      if (
        a.host !== window.location.host &&
        !a.getAttribute('data-umami-event')
      ) {
        a.setAttribute('data-umami-event', 'outbound-link-click');
        a.setAttribute('data-umami-event-url', a.href);
      }
    });
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
