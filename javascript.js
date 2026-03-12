document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.category-item');
    const productCards = document.querySelectorAll('.product-card');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Xóa class 'active' ở tất cả danh mục và thêm vào mục vừa bấm
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // 2. Lấy tên danh mục cần lọc
            const filterValue = this.getAttribute('data-filter');

            // 3. Lọc sản phẩm
            productCards.forEach(card => {
                const productCategory = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    // Hiện tất cả
                    card.style.display = 'block';
                } else if (productCategory === filterValue) {
                    // Hiện sản phẩm trùng khớp
                    card.style.display = 'block';
                } else {
                    // Ẩn các sản phẩm không liên quan
                    card.style.display = 'none';
                }
            });
        });
    });
});