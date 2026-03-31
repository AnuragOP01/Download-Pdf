/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/coupon/route.ts
// app/api/coupon/route.ts

export async function GET() {
  return Response.json({
    promotions: [
      {
        code: "WELCOME10",
        summary: "10% OFF on your order",
        description: "10% off on total cart value"
      },
      {
        code: "SAVE500",
        summary: "Flat ₹500 OFF",
        description: "₹500 off on orders above ₹2000"
      }
    ]
  });
}

export async function POST(request: Request) {
  // Razorpay sends: { order_id, contact, email }
  return Response.json({
    promotions: [
      {
        code: "WELCOME10",
        summary: "10% OFF on your order",
        description: "10% off on total cart value"
      },
      {
        code: "SAVE500",
        summary: "Flat ₹500 OFF",
        description: "₹500 off on orders above ₹2000"
      }
    ]
  });
}