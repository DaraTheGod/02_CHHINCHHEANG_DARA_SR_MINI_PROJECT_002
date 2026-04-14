"use client";

import { useState } from "react";

export default function OrderCard({ order }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-2">
        <div className="">
          <span className="text-sm font-medium text-gray-500 tracking-wider">
            ORDER
          </span>
          <h3 className="font-mono text-md font-bold text-gray-900">
            #{order.orderId}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-500 tracking-wider">
            Total
          </span>
          <p className="text-xl font-bold text-gray-900">
            ${order.totalAmount?.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div>
          <span className="text-sm font-medium text-gray-500 tracking-wider">
            User ID
          </span>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {order.appUserId}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500 tracking-wider">
            Order date
          </span>
          <p className="text-sm font-semibold text-gray-900">
            {new Date(order.orderDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-500 tracking-wider">
          Line items
        </span>
        <p className="text-sm font-bold mb-4">
          {order.orderDetailsResponse?.length}
        </p>

        <div
          className="space-y-2 bg-gray-100 p-4 rounded-xl outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
          tabIndex={0}
          onKeyDown={(e) => {
            const list = order?.orderDetailsResponse;
            if (!list?.length) return;

            if (e.key === "ArrowDown") {
              setSelectedIndex((prev) => {
                if (prev === null) return 0;
                return prev < list.length - 1 ? prev + 1 : prev;
              });
            }

            if (e.key === "ArrowUp") {
              setSelectedIndex((prev) => {
                if (prev === null) return list.length - 1;
                return prev > 0 ? prev - 1 : prev;
              });
            }

            if (e.key === "Escape") {
              setSelectedIndex(null);
            }
          }}
        >
          <p className="text-sm font-medium text-gray-500 tracking-wider">
            ORDER DETAILS
          </p>
          {order.orderDetailsResponse?.map((detail, index) => {
            const isSelected = index === selectedIndex;

            return (
              <div
                key={detail.productId}
                onClick={() => setSelectedIndex(index)}
                className={`grid grid-cols-3 items-center rounded-2xl p-4 cursor-pointer
                ${
                  isSelected
                    ? "border border-orange-400 shadow-md"
                    : "bg-gray-100 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">
                    Product
                  </span>
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {detail.productName}
                  </span>
                </div>

                <div className="flex justify-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Qty</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {detail.orderQty}
                  </span>
                </div>

                <div className="flex justify-end">
                  <span className="text-sm font-semibold text-gray-900">
                    ${detail.orderTotal?.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
