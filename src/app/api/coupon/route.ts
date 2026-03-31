/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/coupon/route.ts

const allPromotions = [
  {
    code: "WELCOME10",
    title: "10% OFF First Order",
    value_type: "percentage",
    value: 10,
    min_amount: 20000   // ₹200 in paise
  },
  {
    code: "SAVE500",
    title: "Flat Rs.500 OFF",
    value_type: "flat",
    value: 50000,       // ₹500 in paise
    min_amount: 200000  // ₹2000 in paise
  }
];

export async function GET() {
  return Response.json({
    success: true,
    data: {
      promotions: allPromotions
    }
  });
}

export async function POST(request: Request) {
  let cartAmount = 0;
  try {
    const text = await request.text();
    const params = new URLSearchParams(text);
    cartAmount = Number(params.get("cart_amount") || 0);
  } catch (e) {
    console.error("Error parsing request body:", e);
  }

  const eligible = cartAmount > 0
    ? allPromotions.filter(p => cartAmount >= p.min_amount)
    : allPromotions;

  return Response.json({
    success: true,
    data: { promotions: eligible }
  });
}