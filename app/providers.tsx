"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

import { ButtonStyles, ProgressStyles } from "./chakraStyles";
import Navbar from "./_components/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  /**
   * Explanation of cache provider and useServerInsertedHTML:
   *   - A mismatch occurred because Emotion styles weren't being collected on the server and injected into the HTML. The server rendered components without styles, while the client tried to inject them, causing a mismatch.
   * With CacheProvider and useServerInsertedHTML:
   *   - Styles are collected during server-side rendering
   *   - Styles are injected into the HTML before React hydrates
   *   - The client receives HTML that matches what React expects, preventing hydration errors
   *   - The setup follows the recommended pattern for Chakra UI with Next.js App Router.
   */
  const [emotionCache] = useState(() => {
    const cache = createCache({ key: "chakra", prepend: true });
    cache.compat = true;
    return cache;
  });
  useServerInsertedHTML(() => {
    const names = Object.keys(emotionCache.inserted);
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += emotionCache.inserted[name];
    }
    return (
      <style
        data-emotion={`${emotionCache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={theme}>
        <Navbar />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}

const theme = extendTheme({
  components: {
    Button: ButtonStyles,
    Progress: ProgressStyles,
  },
  borders: {
    light: "1px solid rgba(51, 51, 51, 0.20)",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
