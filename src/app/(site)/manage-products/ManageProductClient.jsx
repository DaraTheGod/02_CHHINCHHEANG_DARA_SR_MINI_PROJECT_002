"use client";

import React, { useState, useEffect, useMemo } from "react";
import ManageProductCard from "./ManageProductCard";
import ProductFormComponent from "../../../components/ProductFormComponent";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { categoryService } from "../../../service/category.service";
import { ChevronDown } from "lucide-react";
import { deleteProductAction } from "../../../action/product.action";
import { toastSuccessTopEnd } from "../../../lib/toast";

export default function ManageProductClient({ initialProducts, token }) {
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onOpenChange: onFormOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [productToDelete, setProductToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sortKey, setSortKey] = useState(new Set(["name_asc"]));

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    onDeleteOpen();
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    const success = await deleteProductAction(productToDelete.productId, token);

    if (success) {
      toastSuccessTopEnd(
        "Product Deleted",
        `${productToDelete.name} has been deleted successfully.`,
      );
      onDeleteClose();
    } else {
      toastErrorTopEnd("Error", "Failed to delete the product.");
    }
  };

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

  const sortedProducts = useMemo(() => {
    const selectedValue = Array.from(sortKey)[0];
    const products = [...(initialProducts ?? [])];

    if (selectedValue === "name_asc") {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue === "name_desc") {
      return products.sort((a, b) => b.name.localeCompare(a.name));
    }
    return products;
  }, [initialProducts, sortKey]);

  const selectedSortValue = Array.from(sortKey)[0];
  const sortLabel =
    selectedSortValue === "name_asc" ? "Name (A-Z)" : "Name (Z-A)";

  const openCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    onFormOpen();
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    onFormOpen();
  };

  return (
    <main className="mx-auto max-w-7xl py-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
          <p className="mt-2 text-gray-500 text-md">
            Create, update, and delete your products at any time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-md font-medium text-gray-500">Sort</span>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="min-w-[160px] border-2 rounded-full bg-white font-medium text-gray-900 h-11 px-5 ring-lime-400/20 ring-2 border-lime-400"
                endContent={<ChevronDown size={18} className="text-gray-500" />}
              >
                {sortLabel}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort Actions"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={sortKey}
              onSelectionChange={setSortKey}
              className="p-2 w-50 bg-white border border-gray-200 rounded-2xl shadow-sm drop-shadow-md"
              itemClasses={{
                base: [
                  "rounded-xl",
                  "data-[hover=true]:bg-lime-50",
                  "data-[hover=true]:text-lime-700",
                  "data-[selected=true]:bg-lime-100",
                  "data-[selected=true]:text-lime-800",
                ],
              }}
            >
              <DropdownItem key="name_asc">Name (A-Z)</DropdownItem>
              <DropdownItem key="name_desc">Name (Z-A)</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Products</h2>
          <Button
            onClick={openCreate}
            className="rounded-full bg-[#82e600] px-6 py-2.5 font-bold text-gray-900 ring-lime-400/20 focus:ring-2 hover:bg-lime-400"
          >
            + Create product
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ManageProductCard
              key={product.productId}
              product={product}
              onEdit={() => openEdit(product)}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      </section>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        size="md"
        classNames={{
          base: "rounded-[32px] p-4",
          backdrop: "bg-black/60",
          closeButton: "top-6 right-6 border border-gray-100 rounded-full p-1",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className="py-6 bg-white rounded-3xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Delete product?
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                This will remove{" "}
                <span className="font-bold text-gray-800">
                  {productToDelete?.name}
                </span>
                .
              </p>

              <div className="flex justify-end gap-3 mt-5">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="font-bold text-gray-700 text-md h-12 px-6"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleConfirmDelete}
                  className="bg-[#ffe4e6] text-[#e11d48] font-bold text-md h-12 px-8 rounded-2xl hover:bg-[#fecdd3] transition-colors"
                >
                  Delete
                </Button>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isFormOpen}
        onOpenChange={onFormOpenChange}
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
