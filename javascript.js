 document.querySelectorAll('#category-menu li').forEach(item => {
            item.addEventListener('click', function() {
                // 1. Đổi màu mục đang chọn (Active)
                document.querySelectorAll('#category-menu li').forEach(li => li.classList.remove('active'));
                this.classList.add('active');

                // 2. Lấy tên danh mục muốn lọc
                const filter = this.getAttribute('data-filter');
                const products = document.querySelectorAll('.product-card');

                // 3. Hiển thị sản phẩm tương ứng
                products.forEach(product => {
                    const category = product.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        product.style.display = 'block'; // Hiện
                    } else {
                        product.style.display = 'none';  // Ẩn
                    }
                });
            });
        });