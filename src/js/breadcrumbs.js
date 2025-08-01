function updateBreadcrumb(view, data = {}) {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  // Hide breadcrumb on home page
  if (view === "home") {
    breadcrumb.style.display = "none";
    breadcrumb.textContent = "";
    return;
  }

  breadcrumb.style.display = "block";

  // Product list page
  if (view === "productList") {
    const categoryName = data.category || "Products";
    const itemCount = Array.isArray(data.products) ? data.products.length : 0;
    breadcrumb.textContent = `${categoryName} → (${itemCount} items)`;
    return;
  }

  // Product detail page
  if (view === "productDetail") {
    const categoryName = data.category || "Product";
    breadcrumb.textContent = `${categoryName}`;
    return;
  }

  // Fallback
  breadcrumb.textContent = "";
}
