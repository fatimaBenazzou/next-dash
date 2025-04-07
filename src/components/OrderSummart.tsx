export default function OrderSummary({
    subtotal,
    deliveryPrice,
    totalPrice,
}: {
    subtotal: number;
    deliveryPrice: number;
    totalPrice: number;
}) {
    return (
        <div className="bg-base-200 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
                <p>
                    <strong>Sub-total:</strong> {subtotal} DA
                </p>
                <p>
                    <strong>Delivery:</strong> {deliveryPrice} DA
                </p>
                <p>
                    <strong>Total:</strong> {totalPrice} DA
                </p>
            </div>
        </div>
    );
}
