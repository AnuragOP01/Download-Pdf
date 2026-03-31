// app/api/coupon/route.ts

export async function GET() {
  return Response.json({
    success: true,
    data: {
      promotions: [
        {
          code: "WELCOME10",
          title: "10% OFF First Order",
          discount_type: "percentage",
          discount_value: 10,
          min_amount: 200
        },
        {
          code: "SAVE500",
          title: "Flat Rs.500 OFF",
          discount_type: "flat",
          discount_value: 500,
          min_amount: 2000
        }
      ]
    }
  });
}

// Razorpay may POST to this URL too (to fetch coupons with cart context)
export async function POST(request: Request) {
  // Optionally read cart amount to return only eligible coupons
  let cartAmount = 0;
  try {
    const text = await request.text();
    const params = new URLSearchParams(text);
    cartAmount = Number(params.get("cart_amount") || 0);
  } catch (e) {
        console.error("Error parsing request body:", e);

  }

  const allPromotions = [
    {
      code: "WELCOME10",
      title: "10% OFF First Order",
      discount_type: "percentage",
      discount_value: 10,
      min_amount: 200
    },
    {
      code: "SAVE500",
      title: "Flat Rs.500 OFF",
      discount_type: "flat",
      discount_value: 500,
      min_amount: 2000
    }
  ];

  // Filter to only show coupons the cart is eligible for
  const eligible = cartAmount > 0
    ? allPromotions.filter(p => cartAmount >= p.min_amount)
    : allPromotions;

  return Response.json({
    success: true,
    data: { promotions: eligible }
  });
}