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

  const coupon_code = (body.coupon_code || body.code || "").toUpperCase();

  const coupons: Record<string, { value_type: string; value: number }> = {
    WELCOME10: { value_type: "percentage", value: 10 },
    SAVE500:   { value_type: "flat",       value: 50000 }, // ✅ paise
  };

  const coupon = coupons[coupon_code];

  if (!coupon) {
    return Response.json({
      success: false,
      data: {
        error_code: "INVALID_COUPON",
        error_description: "Coupon code is not valid"
      }
    });
  }

  return Response.json({
    success: true,
    data: {
      promotions: [
        {
          code: coupon_code,
          type: "coupon",
          value: coupon.value,
          value_type: coupon.value_type,
          description: `${coupon_code} Applied!`
        }
      ]
    }
  });
}