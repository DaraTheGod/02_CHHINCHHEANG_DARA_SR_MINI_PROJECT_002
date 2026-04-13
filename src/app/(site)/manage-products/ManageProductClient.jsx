"use client";

import React, { useState, useEffect } from "react";
import ManageProductCard from "./ManageProductCard";
import ProductFormComponent from "../../../components/ProductFormComponent";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function ManageProductClient({ initialProducts, token }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories once on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        // Adjust if your API wraps in payload
        setCategories(data?.payload ?? data ?? []);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    }
    fetchCategories();
  }, [token]);

  const openCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    onOpen();
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <main className="mx-auto max-w-7xl py-10 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <button
            onClick={openCreate}
            className="rounded-full bg-[#82e600] px-6 py-2.5 font-bold text-gray-900 hover:bg-lime-400"
          >
            + Create product
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {initialProducts?.map((product) => (
            <ManageProductCard
              key={product.productId}
              product={product}
              onEdit={() => openEdit(product)}
            />
          ))}
        </div>
      </section>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        radius="3xl"
      >
        <ModalContent className="bg-white">
          {() => (
            <ModalBody className="p-8">
              <h2 className="mb-1 text-2xl font-bold capitalize">
                {modalMode === "edit" ? "Edit" : "Create"} product
              </h2>
              <ProductFormComponent
                mode={modalMode}
                initialData={selectedProduct}
                onClose={onClose}
                token={token}
                categories={categories}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
