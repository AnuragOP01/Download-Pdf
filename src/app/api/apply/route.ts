/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/apply/route.ts

export async function POST(request: Request) {
  let body: any = {};

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => { body[key] = value; });
    }
  } catch (e) {
    console.error("Error parsing request body:", e);
  }

  const code = (body.code || body.coupon_code || "").toUpperCase();
  const orderAmount = Number(body.amount || 0); // in paise, sent by Razorpay

  const coupons: Record<string, { type: "percentage" | "fixed_amount"; value: number }> = {
    WELCOME10: { type: "percentage", value: 10 },   // 10%
    SAVE500:   { type: "fixed_amount", value: 50000 }, // ₹500 in paise
  };

  const coupon = coupons[code];

  if (!coupon) {
    return Response.json({
      success: false,
      error: {
        code: "INVALID_COUPON",
        description: "Coupon code is not valid"
      }
    });
  }

  // Calculate final discount value always in paise
  const discountValue = coupon.type === "percentage"
    ? Math.floor(orderAmount * (coupon.value / 100))
    : coupon.value;

  return Response.json({
    promotion: {
      reference_id: code,
      code: code,
      type: "coupon",
      value: discountValue,       // ✅ always paise, calculated
      value_type: "fixed_amount", // ✅ always fixed_amount since we pre-calculate
      description: `${code} applied successfully!`
    }
  });
}