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
import { categoryService } from "../../../service/category.service";

export default function ManageProductClient({ initialProducts, token }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      if (!token) return;
      try {
        const data = await categoryService().getCategories(token);
        setCategories(data?.payload ?? []);
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
    <main className="mx-auto max-w-7xl py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
        <p className="mt-2 text-gray-500 text-md">
          Create, update, and delete your products at any time.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Products</h2>
          <button
            onClick={openCreate}
            className="rounded-full bg-[#82e600] px-6 py-2.5 font-bold text-gray-900 ring-lime-400/20 focus:ring-2 hover:bg-lime-400"
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
        size="3xl"
        classNames={{
          backdrop: "bg-black/60",
          closeButton:
            "top-6 right-6 text-lg border border-gray-200 shadow-sm rounded-full bg-white hover:bg-gray-50 active:scale-95 transition-all p-3",
        }}
      >
        <ModalContent>
          {(onModalClose) => (
            <>
              <ModalBody className="bg-white p-8 rounded-3xl">
                <h2 className="mb-1 text-2xl font-bold capitalize text-gray-900">
                  {modalMode} product
                </h2>
                <ProductFormComponent
                  mode={modalMode}
                  initialData={selectedProduct}
                  onClose={onModalClose}
                  token={token}
                  categories={categories}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
