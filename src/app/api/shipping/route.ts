/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    console.error("Error parsing request body:", e);
  }

  const addresses = (body.addresses || []).map((addr: any) => ({
    id: addr.id,
    zipcode: addr.zipcode,
    country: addr.country || "IN",
    serviceable: true,
    cod: false,
    cod_fee: 0,
    shipping_methods: [
      {
        id: "free",
        name: "Digital Delivery",
        description: "Instant digital delivery",
        serviceable: true,
        shipping_fee: 0,
        cod: false,
        cod_fee: 0
      }
    ]
  }));

  return Response.json({ addresses });
}

export async function GET() {
  return Response.json({
    serviceable: true,
    shipping_fee: 0,
    cod_fee: 0,
    eta: "3-5 days"
  });
}