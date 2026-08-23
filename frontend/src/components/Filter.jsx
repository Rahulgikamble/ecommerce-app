const Filter = ({ categories, filters, setFilters }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
