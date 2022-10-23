import Layout from "../../../components/Layout";
import { Product } from "../../../src/types/types";
import imageLoader from "../../../src/imageLoader";
import Image from 'next/future/image'
import { imageAddress } from "../..";
import { GetServerSideProps } from "next";
import mongoose from 'mongoose'
import React, { useState, useEffect } from "react";
import Head from "next/head";


function ProductPage({ product }: { product: Product | null }) {
    const [pro, setPro] = useState<Product | null>(null)

    useEffect(() => {
        if (pro === null) {
            setPro(product)
            console.log("one time")
        }
        console.log("pro product in use effect", pro)
    }, [pro])

    return (
        product !== null ?
            <>
            <ProductHeadComponent product={product} />
            <div className="bg-green-800 text-red-300">is ok{product?._id}
                <li key={product?._id ?? "idone"}>
                    <Image
                        loader={imageLoader}
                        unoptimized
                        src={imageAddress(product?.main?.images?.[0], 500, 500, 100, 'webp')}
                        alt={product?.main?.title_en ?? "noname"}
                        width={400}
                        height={400}
                    />
                </li>
            </div>
            </>
            :
            <div>product not exist</div>)
}
export function ProductHeadComponent({ product }: { product: Product }) {

    return (
        <Head>
            <title>{`شاپسو-${product.seo.title}`}</title>
            <meta
                name="keywords"
                content={product.seo.description}
            ></meta>
        </Head>)
}

export function ProductImageComponent({ product }: { product: Product }) {
    return <div></div>
}
export function ProductPriceComponent({ product }: { product: Product }) {
}
export function ProductAttributeComponent({ product }: { product: Product }) {
}
export function ProductDescriptionComponent({ product }: { product: Product }) {
}
export function ProductRelativeComponent({ product }: { product: Product }) {
}






ProductPage.getLayout = function getLayout(page: typeof ProductPage) {
    return <Layout>{page}</Layout>;
};


// type Search = {
//     perPage: string,
//     page: string,
//     category: object,
//     sort: string
// }

export const getServerSideProps: GetServerSideProps = async (context) => {


    try {
        if (process.env.MONGO_URI)
            await mongoose.connect(process.env.MONGO_URI)
        else {
            return {
                props: {
                    product: null
                }
            }
        }
        const id: string = context?.query?.id?.toString() ?? "nothing"
        const productData: Product | null = await getProductAndRealtive(id)
        // const response: AxiosResponse = await axios.post(
        //     `http://localhost:5000/api/pro/${context.query.id}`, 
        // );

        // const dataProduct: GetProductsArray = {
        //     info: null,
        //     results: [response.data]
        // }

        return {
            props: {
                product: productData
            }

        }
    } catch (err) {
        return {
            props: {
                product: null
            }

        }
    }

}


export default ProductPage;



import ProductModel from "../../../src/models/ProProduct";


async function getProductAndRealtive(id: string): Promise<Product | null> {
    if (id) {
        try {
        const ProductData: object | null = await ProductModel.findById(id);
        
        const proData: Product | null = await JSON.parse(JSON.stringify(ProductData));
        return proData
        }catch(err){
            return null
        }
    } else {
            return null
    }
}
 // var category = "";
    // if (!isEmpty(proData.subCategory)) {
    //   category = `&subCat=${proData.subCategory}`;
    // } else {
    //   category = `&cat=${proData.newCategory}`;
    // }
    // // var { data: Laptop } = await axios.get(
    // //   `/api/pro?s=${props.ProductData?.main?.sku}&sort=2&${category}`
    // // );
    // var req = {
    //   body: {
    //     perPage: "10",
    //     page: "1",
    //     category: {
    //       "category.L1": proData.category.L1,
    //       "category.L2": proData.category.L2,
    //     },
    //     sort: "price",
    //   },
    // };

    // const textObject = req.body.text
    //   ? {
    //       $text: {
    //         $search: req.body.text,
    //         $diacriticSensitive: false,
    //         $caseSensitive: false,
    //       },
    //     }
    //   : {};

    // const sortType = req.body?.sortType == "desc" ? 1 : -1;
    // const sort = req.body?.sort ? req.body?.sort : false;

    // // const sda = eval(sort)
    // // console.log(eval(sort))
    // var arrayone = [sort, sortType];
    // var sortArray = [];
    // sortArray.push(arrayone);
    // console.log(sortArray);
    // const filterObject = {};
    // const specQuery = req.body.query != undefined ? req.body.query : {};
    // console.log("specQuery", req.body.query);
    // const categoryObject = req.body.cat ? { newCategory: req.body.cat } : {};
    // const categoryL1Object = req.body.category
    //   ? { category: req.body.category }
    //   : {};
    // const attributextObject = req.body.attributext
    //   ? { attributext: req.body.attributext }
    //   : {};
    // console.log("categoryL1Object", categoryL1Object);

    // const subCategoryObject = req.body.subCat
    //   ? { subCategory: req.body.subCat }
    //   : {};
    // const perPageLimit =
    //   req.body.perPage != undefined ? Number(req.body.perPage) : 20;
    // const PageNumber =
    //   req.body.page != undefined ? Number(req.body.page - 1) * perPageLimit : 0;
    // const count = req.body.count ? 1 : 0;
    // console.log("perPageLimit", perPageLimit);
    // console.log("PageNumber", PageNumber);
    // //   var SORTs = { updatedAt: sortType };
    // // } else if (qSort == "price") {
    // //   var SORTs = { "main.prices.price": sortType };
    // // } else if (qSort == "cat") {
    // //   var SORTs = { category: sortType };
    // // } else {
    // //   var SORTs = { score: { $meta: "textScore" } };
    // var prod=[]

    // if (count == 0) {
    //   prod = await Product.find(specQuery)
    //     .find(attributextObject.attributext)
    //     .find(textObject)
    //     .find(filterObject)
    //     .find(categoryObject)
    //     .find(categoryL1Object.category)
    //     .find(subCategoryObject)
    //     .limit(perPageLimit)
    //     .skip(PageNumber)
    //     .sort(sortArray)
    //     .populate("status");
    // }

    // const prodRelative = JSON.parse(JSON.stringify(prod));