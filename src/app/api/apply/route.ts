export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coupon_code = searchParams.get('coupon_code');
  
  const coupons = {
    "WELCOME10": { type: "percentage", value: 10 },
    "SAVE500": { type: "fixed", value: 500 }
  };
  
  const coupon = coupons[coupon_code as keyof typeof coupons];
  if (coupon) {
    return Response.json({
      discount_type: coupon.type,
      discount_value: coupon.value
    });
  }
  
  return Response.json({ error: "Invalid coupon" }, { status: 400 });
}