import type { NextApiHandler } from "next";
import sharp from "sharp";

const imageHandler: NextApiHandler = async (request, response) => {
  // console.log("path:", request.query?.path);

  const X: number | undefined =
    request.query.x === "undefined" ? undefined : Number(request?.query?.x);
  const Y: number | undefined =
    request.query.y === "undefined" ? undefined : Number(request?.query?.y);
  var addressPrefix: "public" | "imageStorage" = "imageStorage";
  if (request.query?.prefix === "public") {
    addressPrefix = "public";
  }

  var formatEnum: "webp" | "jpeg" | "png" | "jpg" = "webp";
  if (
    request?.query?.t === "webp" ||
    request?.query?.t === "jpeg" ||
    request?.query?.t === "png" ||
    request?.query?.t === "jpg"
  ) {
    formatEnum = request?.query?.t;
  }

  try {
    const data = await sharp(
      (addressPrefix === "public"
        ? "G:/gh/ecomerce-ts/ecommerce-ts/public/"
        : "G:/gh/backend/") + request?.query?.path,
      {
        failOnError: false,
      }
    )
      .resize(X, Y, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toFormat(formatEnum, { quality: Number(request.query.q) })
      .toBuffer();

    // .then((data) => {
    //   //console.log("finded");
    return response.status(200).end(data);

    // })
    // .catch((err) => {
    //   console.log("image received error", err);
    //  return res.status(202).json(err);

    // });

    //res.status(200).sendFile(path.resolve("images", "image.jpg"));
  } catch (err: any) {
    console.log("image received error", err);
    return response.status(500).json(err.message);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  //   response.json({ data: amount });
};

export default imageHandler;

// console.log("path:", req.query?.path);
//   if (req?.query?.path?.includes("http")) {
//     console.log("is not true path", req.query.path);
//    return res.status(503).end(req.query.path);

//   }
//   //console.log(req.query.path);
//   try {
//       const data = await sharp(process.env.IMAGE_PREFIX + req.query.path, { failOnError: false })
//       .resize(Number(req.query.x), Number(req.query.y), {
//         fit: "contain",
//         background: { r: 255, g: 255, b: 255, alpha: 1 },
//       })
//       .toFormat(req.query.t, { quality: Number(req.query.q) })
//       .toBuffer()

//       // .then((data) => {
//       //   //console.log("finded");
//        return res.status(200).end(data);

//       // })
//       // .catch((err) => {
//       //   console.log("image received error", err);
//       //  return res.status(202).json(err);

//       // });

//     //res.status(200).sendFile(path.resolve("images", "image.jpg"));
//   } catch (err) {
//     console.log("image received error", err);
//    return res.status(500).json(err.message);
//   }
