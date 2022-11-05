// const { isObjectLike } = require("lodash");
// const mongoose = require("mongoose");
import { Schema, model, models } from "mongoose";

const attributesSchema = new Schema({
  title: { type: String },
  values: { type: Array },
});

const ProProduct = new Schema(
  {
    imid: { type: Number, unique: true },
    category: {
      L1: { type: String, default: "" },
      L2: { type: String, default: "" },
      L3: { type: String, default: "" },
      L4: { type: String, default: "" },
    },
    tags: [{ type: String, default: "" }],
    status: { type: String },
    expert_reviews: {
      attributes: [attributesSchema],
      description: { type: String },
      short_review: { type: String },
      admin_rates: [{ type: String }],
      review_sections: [
        {
          title: { type: String },
          sections: [
            {
              template: { type: String },
              image: { type: String },
              text: { type: String },
            },
          ],
        },
      ],
      technical_properties: {
        advantages: [{ type: String }],
        disadvantages: [{ type: String }],
      },
    },
    main: {
      dkp: { type: String },
      sku: { type: String, required: true },
      uri: { type: String },
      title_fa: { type: String },
      title_en: { type: String },
      short_desc: { type: String },
      long_desc: { type: String },
      brand: { type: String },
      images: [{ type: String }],
      rating: {
        rate: { type: Number },
        count: { type: Number },
      },
    },
    review: {
      description: { type: String },
    },
    attributes: [attributesSchema],
    primary_variant: { type: Number },
    variants: [
      {
        id: { type: Number, default: 0 },
        has_importer_price: { type: Number },
        insurance: { type: Object },
        lead_time: { type: Number },
        price: {
          discount_percent: { type: Number },
          is_incredible: { type: Boolean },
          is_promotion: { type: Boolean },
          marketable_stock: { type: Number },
          order_limit: { type: Number },
          selling_price: { type: Number },
          digiPrice: { type: Number },
          rrp_price: { type: Number },
          priceUrl: { type: String },
          priceRef: {
            rule: { type: String, default: "dkp" },
            id: { type: String, default: "" },
            shop_names: [{ type: String, default: "" }],
          },
        },
        rank: { type: Number },
        rate: { type: Number },
        seller: { type: Object },
        shipment_methods: {
          description: {
            type: String,
            default: "موجود در انبار فروشنده و شاپسو",
          },
          has_lead_time: { type: Boolean },
          providers: [
            {
              title: { type: String, default: "موجود در انبار" },
              description: {
                type: String,
                default: "این کالا توسط پیک فروشگاه ارسال میشود",
              },
              has_lead_time: { type: Boolean },
              type: {
                type: String,
                default: "shopsoo",
                enum: ["shopsoo", "seller"],
              },
            },
          ],
        },
        color: {
          title: { type: String },
          hex_code: { type: String },
        },
        warranty: { type: String },
        other_description: [{ type: String }],
      },
      { timestamps: true },
    ],
    seo: {
      title: { type: String },
      description: { type: String },
      markup_schema: { type: Object },
    },
    attributext: { type: Object, default: {}, timestamps: true },
  },
  { timestamps: true }
);

const Product = models.ProProduct || model("ProProduct", ProProduct);

export default Product;
