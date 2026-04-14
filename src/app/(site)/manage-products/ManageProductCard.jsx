"use client";

import React from "react";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { StarRow } from "../../../components/ProductCardComponent";
import { Trash2, SquarePen } from "lucide-react";
import Link from "next/link";
import ButtonAddComponent from "../../../components/ButtonAddComponent";

export default function ManageProductCard({ product, onEdit, onDelete }) {
  if (!product) return null;

  const isValidUrl = (url) => {
    try {
      return url && (url.startsWith("http://") || url.startsWith("https://"));
    } catch {
      return false;
    }
  };

  return (
    <div className="group relative flex flex-col rounded-3xl border border-gray-100 p-4 transition-all hover:shadow-sm bg-white">
      <div className="absolute right-3 top-3 z-10">
        <Dropdown placement="bottom" offset={10}>
          <DropdownTrigger>
            <div className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white border-gray-200 text-gray-700 transition hover:border-gray-400 hover:bg-gray-100">
              <span className="mb-3 text-xl">...</span>
            </div>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Product Actions"
            className="p-2 w-50 bg-white border border-gray-200 rounded-2xl shadow-sm drop-shadow-md"
          >
            <DropdownItem
              key="edit"
              textValue="Edit"
              onPress={onEdit}
              className="text-gray-700 px-2 py-1 rounded-lg transition-all data-[hover=true]:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <SquarePen className="w-5" />
                <span className="text-md font-medium">Edit</span>
              </div>
            </DropdownItem>

            <DropdownItem
              key="delete"
              textValue="Delete"
              onPress={() => onDelete(product)}
              className="text-gray-700 px-2 py-1 rounded-lg transition-all data-[hover=true]:bg-red-200 data-[hover=true]:text-red-700"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="w-5" />
                <span className="text-md font-medium">Delete</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        {isValidUrl(product.imageUrl) ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-lime-50/30 text-gray-400">
            ◇
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1 px-1">
        <StarRow rating={product.star} />
        <h3 className="truncate font-bold text-gray-900">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>
          <div className="absolute bottom-4 right-4">
            <ButtonAddComponent product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
