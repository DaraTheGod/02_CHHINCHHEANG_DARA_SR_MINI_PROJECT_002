import { getServerSession } from "next-auth";
import { auth } from "../../../auth";
import { orderService } from "../../../service/order.service";
import OrderCard from "../../../components/OrderCard";

export default async function OrdersPage() {
  const session = await auth();

  const data = await orderService().getUserOrders(session.user.accessToken);
  const orders = data?.payload || [];

  return (
    <main className="mx-auto max-w-7xl py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Ordered products</h1>
        <p className="text-gray-500 mt-2">
          {orders.length} orders from your account.
        </p>
      </header>

      <div className="space-y-8">
        {orders.length > 0 ? (
          orders
            .slice()
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map((order) => <OrderCard key={order.orderId} order={order} />)
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-3xl border-gray-200">
            <p className="text-gray-400">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
