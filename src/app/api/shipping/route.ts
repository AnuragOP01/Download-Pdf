export async function GET() {
  return Response.json({
    serviceable: true,
    shipping_fee: 0,
    cod_fee: 0,
    eta: "3-5 days"
  });
}