// components/ShopFilterSidebar.jsx
"use client";

export default function ShopFilterSidebar({
  categories,
  filters,
  setFilters,
  categoryCounts,
}) {
  const handleCategoryChange = (catId) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(catId)
        ? prev.selectedCategories.filter((id) => id !== catId)
        : [...prev.selectedCategories, catId],
    }));
  };

  const MAX_PRICE = 300;

  return (
    <aside className="w-full space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:w-70">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Filters</h2>
        <button
          onClick={() =>
            setFilters({ search: "", priceRange: 300, selectedCategories: [] })
          }
          className="text-sm font-medium text-gray-700 hover:text-gray-900 -mt-1 border border-gray-200 rounded-full px-3 py-1.5 transition hover:bg-gray-100"
        >
          Reset filters
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
          Price Range
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-600">
          $0 -{" "}
          {filters.priceRange === MAX_PRICE ? (
            <>
              ${MAX_PRICE}{" "}
              <span className="text-sm text-gray-400 font-medium">
                (no limits)
              </span>
            </>
          ) : (
            `$${filters.priceRange}`
          )}
        </p>
        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          value={filters.priceRange}
          onChange={(e) =>
            setFilters({
              ...filters,
              priceRange: parseInt(e.target.value),
            })
          }
          className="mt-6 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-gray-900"
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Price Range
      </p>
      <div className="grid grid-cols-2 gap-2 -mt-4">
        {["50", "100", "150", "all"].map((val) => (
          <button
            key={val}
            onClick={() =>
              setFilters({
                ...filters,
                priceRange: val === "all" ? MAX_PRICE : parseInt(val),
              })
            }
            className={`rounded-2xl border border-gray-200 py-2 text-sm font-medium transition ${
              (val === "all" && filters.priceRange === MAX_PRICE) ||
              filters.priceRange === parseInt(val)
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:border-gray-900"
            }`}
          >
            {val === "all" ? "All prices" : `Under $${val}`}
          </button>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Categories
        </p>
        {categories.map((cat) => (
          <label
            key={cat.categoryId}
            className="flex cursor-pointer items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.selectedCategories.includes(cat.categoryId)}
                onChange={() => handleCategoryChange(cat.categoryId)}
                className="size-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {cat.name}
              </span>
            </div>
            <span className="text-xs text-gray-300 font-medium">
              {categoryCounts[cat.categoryId] || 0}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
