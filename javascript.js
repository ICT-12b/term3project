document.addEventListener('DOMContentLoaded', function() {
            // Đã đổi '.category-item' thành '.category-card' để khớp với HTML
            const categoryCards = document.querySelectorAll('.category-card');
            const productCards = document.querySelectorAll('.product-card');

            categoryCards.forEach(card => {
                card.addEventListener('click', function() {
                    // 1. Xóa class 'active' ở tất cả danh mục và thêm vào mục vừa bấm
                    categoryCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');

                    // 2. Lấy tên danh mục cần lọc
                    const filterValue = this.getAttribute('data-filter');

                    // 3. Lọc sản phẩm
                    productCards.forEach(product => {
                        const productCategory = product.getAttribute('data-category');

                        if (filterValue === 'all') {
                            // Hiện tất cả
                            product.style.display = 'flex';
                        } else if (productCategory === filterValue) {
                            // Hiện sản phẩm trùng khớp
                            product.style.display = 'flex';
                        } else {
                            // Ẩn các sản phẩm không liên quan
                            product.style.display = 'none';
                        }
                    });
                });
            });
        });