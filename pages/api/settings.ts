// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CLayer, { Order } from "@commercelayer/js-sdk"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, orderId } = req.body

  if (!accessToken || !orderId) {
    res.statusCode = 200
    return res.json({ validCheckout: false })
  }

  CLayer.init({
    accessToken,
    endpoint: `https://${process.env.CLAYER_DOMAIN}.commercelayer.io`,
  })

  const order = await Order.find(orderId)

  if (!order?.id || order.status === "placed") {
    res.statusCode = 200
    return res.json({ validCheckout: false })
  }

  res.statusCode = 200

  const appSettings: CheckoutSettings = {
    accessToken,
    orderId: order.id,
    validCheckout: true,
    endpoint: "https://the-green-brand-120.commercelayer.io",
    logoUrl:
      "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
    companyName: "Test company",
  }
  return res.json(appSettings)
}

// const checkToken = await fetch(
//   `https://${process.env.CLAYER_DOMAIN}.commercelayer.io/api/token`,
//   {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       grant_type: "client_credentials",
//       client_id: process.env.CLAYER_CLIENT_ID,
//       scope: process.env.CLAYER_SCOPE,
//     }),
//   }
// )
// const json = await checkToken.json()
