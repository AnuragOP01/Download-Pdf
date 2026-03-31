export async function POST(request: Request) {
  let body: any = {};

  try {
    // Razorpay sends form-encoded body (application/x-www-form-urlencoded)
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => {
        body[key] = value;
      });
    }
  } catch (e) {
    // ignore parse errors
  }

  const coupon_code = (body.coupon_code || body.code || "").toUpperCase();

  const coupons: Record<string, { discount_type: string; discount_value: number }> = {
    WELCOME10: { discount_type: "percentage", discount_value: 10 },
    SAVE500:   { discount_type: "flat",        discount_value: 500 },
  };

  const coupon = coupons[coupon_code];

  if (!coupon) {
    // ✅ Always HTTP 200 — never 4xx/5xx or Razorpay returns 502
    return Response.json({
      success: false,
      error_code: "INVALID_COUPON",
      error_description: "Coupon code is not valid"
    });
  }

  return Response.json({
    success: true,
    discount_type:        coupon.discount_type,
    discount_value:       coupon.discount_value,
    discount_description: `${coupon_code} Applied!`,
    final_amount:         0
  });
}