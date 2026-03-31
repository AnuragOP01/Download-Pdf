export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coupon_code = searchParams.get('coupon_code');
  
  const coupons = {
    "WELCOME10": { discount_type: "percentage", discount_value: 10 },
    "SAVE500": { discount_type: "fixed", discount_value: 500 }
  };
  
  const coupon = coupons[coupon_code as keyof typeof coupons];
  if (coupon) {
    return Response.json({
      // ✅ EXACT RAZORPAY FORMAT
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      discount_description: `${coupon_code} Applied!`,
      final_amount: 0  // Razorpay calculates
    });
  }
  
  // ✅ Error format
  return Response.json({ 
    error_code: "INVALID_COUPON",
    error_description: "Coupon not valid"
  }, { status: 400 });
}