import Head from "next/head";
import { Product } from "../../src/types/types";

export default function ProductHeadComponent({
  product,
}: {
  product: Product;
}) {
  return (
    <Head>
      <title>{`${product.seo.title}`}</title>
      <meta name="keywords" content={product.seo.description}></meta>
      <title>{`${product?.main?.title_fa}`}</title>
      <meta
        name="keywords"
        content={`خرید,اینترنتی,${product?.main?.brand[0]}`}
      ></meta>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* {/* <meta charSet="utf-8" /> */}
      <meta name="description" content={`${product?.seo?.description}`}></meta>
      <meta
        name="image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=80&t=jpeg&path=${product.main.images[0]}`}
      ></meta>
      <meta
        property="og:title"
        content={`${product?.main?.title_fa}`}
        key="ogtitle"
      />
      {/* <meta httpEquiv="refresh" content="200"/> */}
      <meta
        property="og:description"
        content={`${product?.seo?.description}`}
      />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="shopsoo"></meta>
      <meta
        property="og:url"
        content={`https://shopsoo.ir/products/${product?._id}/${(
          product?.main.title_fa ?? product?.main?.sku
        )
          ?.replaceAll(" ", "-")
          .replaceAll("/", "-")}`}
      ></meta>
      <meta property="og:availability" content="in stock"></meta>
      <meta property="og:type" content="product"></meta>
      <meta
        property="og:image"
        // itemProp="image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=80&t=jpeg&path=${product.main.images[0]}`}
      />
      {/* <meta property="og:image:secure_url" content={`https://api.bugtech.ir/api/image?x=350&y=350&q=60&t=jpg&path=${product.main.images[0]}`} />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="og:image:width" content="350" />
    <meta property="og:image:height" content="350" />
    <meta property="og:image:alt" content={product.main.title_en}/> */}
      <meta
        property="twitter:image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=100&t=jpeg&path=${product.main.images[0]}`}
      ></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@inomal"></meta>
      <meta name="twitter:app:id:googleplay" content="shopsoo"></meta>
      <meta name="twitter:creator" content="shopsoo"></meta>
      <meta name="twitter:title" content={product?.main?.title_fa}></meta>
      <meta
        name="twitter:description"
        content={product?.seo?.description}
      ></meta>
      <link
        rel="canonical"
        href={`https://shopsoo.ir/products/${product?._id}/${(
          product?.main.title_fa ?? product?.main?.sku
        )
          ?.replaceAll(" ", "-")
          .replaceAll("/", "-")}`}
      ></link>
    </Head>
  );
}
