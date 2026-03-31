export async function GET() {
  // const { searchParams } = new URL(request.url);
  // const order_id = searchParams.get('order_id');
  
  return Response.json({
    promotions: [
      {
        code: "WELCOME10",
        title: "🎉 10% OFF First Order", 
        discount_type: "percentage",
        discount_value: 10,
        min_amount: 500
      },
      {
        code: "SAVE500",
        title: "💰 Flat ₹500 OFF",
        discount_type: "fixed",
        discount_value: 500,
        min_amount: 2000
      }
    ]
  });
}