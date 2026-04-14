"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productAction } from "../action/product.action";
import { toastSuccessTopEnd } from "../lib/toast";

const AVAILABLE_COLORS = ["green", "gray", "red", "blue", "white"];
const AVAILABLE_SIZES = ["s", "m", "l", "xl", "xxl", "xxxl"];

const FALLBACK_CATEGORIES = [{ categoryId: "", name: "Select..." }];

export default function ProductFormComponent({
  mode,
  initialData,
  onClose,
  token,
  categories = FALLBACK_CATEGORIES,
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [name, setName] = useState(isEdit ? (initialData?.name ?? "") : "");
  const [price, setPrice] = useState(isEdit ? (initialData?.price ?? "") : "");
  const [imageUrl, setImageUrl] = useState(
    isEdit ? (initialData?.imageUrl ?? "") : "",
  );
  const [categoryId, setCategoryId] = useState(
    isEdit ? (initialData?.categoryId ?? "") : "",
  );
  const [description, setDescription] = useState(
    isEdit ? (initialData?.description ?? "") : "",
  );
  const [selectedColors, setSelectedColors] = useState(
    isEdit ? (initialData?.colors ?? []) : [],
  );
  const [selectedSizes, setSelectedSizes] = useState(
    isEdit ? (initialData?.sizes ?? []) : [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name ?? "");
      setPrice(initialData.price ?? "");
      setImageUrl(initialData.imageUrl ?? "");
      setCategoryId(initialData.categoryId ?? "");
      setDescription(initialData.description ?? "");
      setSelectedColors(initialData.colors ?? []);
      setSelectedSizes(initialData.sizes ?? []);
    } else if (!isEdit) {
      setName("");
      setPrice("");
      setImageUrl("");
      setCategoryId("");
      setDescription("");
      setSelectedColors([]);
      setSelectedSizes([]);
    }
  }, [initialData?.productId, isEdit]);

  const toggleColor = (color) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );

  const toggleSize = (size) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      name,
      description,
      colors: selectedColors,
      sizes: selectedSizes,
      imageUrl,
      price: parseFloat(price),
      categoryId,
    };

    console.log("[ProductForm] Submitting:", {
      mode,
      productId: initialData?.productId,
      data,
    });

    const result = await productAction(
      data,
      isEdit ? "edit" : "create",
      isEdit ? initialData?.productId : null,
    );

    console.log("[ProductForm] Result:", result);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    toastSuccessTopEnd(
      isEdit ? "Product Updated" : "Product Created",
      `Product has been ${isEdit ? "updated" : "created"} successfully.`,
    );

    router.refresh();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-sm text-gray-400">
        Demo CRUD only (local state). Refresh resets changes.
      </p>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tea-Trica BHA Foam"
            required
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#82e600] focus:ring-2 focus:ring-[#82e600]/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 62"
            required
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#82e600] focus:ring-2 focus:ring-[#82e600]/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#82e600] focus:ring-2 focus:ring-[#82e600]/20"
          >
            <option value="">Select...</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName || cat.name || "Unnamed Category"}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Image URL{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#82e600] focus:ring-2 focus:ring-[#82e600]/20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Colors</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((color) => {
            const checked = selectedColors.includes(color);
            return (
              <button
                type="button"
                key={color}
                onClick={() => toggleColor(color)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all ${
                  checked
                    ? "border-blue-500 bg-white text-blue-600"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    checked ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const checked = selectedSizes.includes(size);
            return (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium uppercase transition-all ${
                  checked
                    ? "border-blue-500 bg-white text-blue-600"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    checked ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description shown on the product card..."
          rows={4}
          className="resize-y rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#82e600] focus:ring-2 focus:ring-[#82e600]/20"
        />
      </div>

      <div className="mt-2 flex justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-gray-200 px-7 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#82e600] px-7 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-lime-400 disabled:opacity-60"
        >
          {loading ? "Saving..." : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
