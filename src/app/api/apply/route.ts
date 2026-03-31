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

  // Razorpay sends { order_id, contact, email, code }
  const code = (body.code || body.coupon_code || "").toUpperCase();

  const coupons: Record<string, { value_type: string; value: number }> = {
    WELCOME10: { value_type: "percentage", value: 10 },
    SAVE500:   { value_type: "fixed_amount", value: 50000 }, // paise
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

  return Response.json({
    promotion: {                          // ✅ singular object, not array
      reference_id: code,                 // ✅ required
      code: code,
      type: "coupon",
      value: coupon.value,
      value_type: coupon.value_type,      // ✅ "fixed_amount" not "flat"
      description: `${code} applied successfully!`
    }
  });
}