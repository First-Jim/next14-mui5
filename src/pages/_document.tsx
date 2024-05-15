import React from 'react'
import theme from '@/config/theme'
import { NextComponentType } from 'next'
import { AppInitialProps } from 'next/app'
import { EmotionCache } from '@emotion/cache'
import { createEmotionCache } from '@/utils'
import createEmotionServer from '@emotion/server/create-instance'
import { AppContextType, AppPropsType } from 'next/dist/shared/lib/utils'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface DocumentProps {
  emotionStyleTags: JSX.Element[]
  styledComponentsStyleTags: JSX.Element[]
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Emotion cache
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    // Styled-components sheet
    const sheet = new ServerStyleSheet()

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (
            App: NextComponentType<AppContextType, AppInitialProps, AppPropsType & { emotionCache: EmotionCache }>
          ) =>
            function EnhanceApp(props) {
              return sheet.collectStyles(<App emotionCache={cache} {...props} />)
            },
        })

      const initialProps = await Document.getInitialProps(ctx)

      // Emotion styles
      const emotionStyles = extractCriticalToChunks(initialProps.html)
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ))

      // Styled-components styles
      const styledComponentsStyleTags = sheet.getStyleElement()

      return {
        ...initialProps,
        emotionStyleTags,
        styledComponentsStyleTags,
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.background.paper} />
          <meta content="#fbfbfb" name="theme-color" />
          <meta content="#fbfbfb" name="msapplication-navbutton-color" />
          <meta content="#fbfbfb" name="apple-mobile-web-app-status-bar-style" />
          <meta content="yes" name="apple-mobile-web-app-capable" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,700;1,500;1,700&display=swap"
            rel="stylesheet"
          />

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
          {this.props.styledComponentsStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
