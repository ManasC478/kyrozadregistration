import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta https-equiv='X-UA-Compatible' content='IE=edge' />

          <meta
            name='description'
            content='Register your advertisements with Kyroz here!'
          />
          <meta
            name='keywords'
            content='Kyroz, Advertisements, Ads, Register, Upload'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
