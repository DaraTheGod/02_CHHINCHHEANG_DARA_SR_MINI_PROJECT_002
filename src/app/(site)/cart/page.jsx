import CartClientWrapper from "./CartClientWrapper";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl py-14">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your cart</h1>
        <p className="text-gray-500 mt-2">
          Cart is stored in memory for this visit — refreshing the page clears
          it.
        </p>
      </header>
      <CartClientWrapper />
    </main>
  );
}
