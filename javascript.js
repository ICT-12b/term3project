        document.addEventListener('DOMContentLoaded', () => {
            
            // ==========================================
            // 1. TÍNH NĂNG LỌC DANH MỤC (Giữ nguyên)
            // ==========================================
            document.querySelectorAll('#category-menu li').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('#category-menu li').forEach(li => li.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    const products = document.querySelectorAll('.product-card');

                    products.forEach(product => {
                        const category = product.getAttribute('data-category');
                        if (filter === 'all' || category === filter) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                    });
                });
            });

            // ==========================================
            // 2. TÍNH NĂNG GIỎ HÀNG
            // ==========================================
            let cart = []; // Mảng lưu trữ sản phẩm

            const openCartBtn = document.getElementById('open-cart-btn');
            const closeCartBtn = document.getElementById('close-cart-btn');
            const cartOverlay = document.getElementById('cart-overlay');
            const cartBadge = document.getElementById('cart-badge');
            const cartItemsContainer = document.getElementById('cart-items-container');
            const cartTotalPrice = document.getElementById('cart-total-price');

            // --- Đóng / Mở giỏ hàng ---
            openCartBtn.addEventListener('click', () => cartOverlay.classList.add('active'));
            closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('active'));
            cartOverlay.addEventListener('click', (e) => {
                if(e.target === cartOverlay) cartOverlay.classList.remove('active');
            });

            // --- Sự kiện click "Thêm vào giỏ" ---
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.product-card');
                    
                    // Lấy Tên và Giá
                    const name = card.querySelector('h4').innerText;
                    const priceText = card.querySelector('.price').innerText;
                    const price = parseInt(priceText.replace(/\D/g, '')); // Biến "550.000đ" thành 550000

                    // Lấy Ảnh (Trích xuất từ style background-image)
                    const bgImage = card.querySelector('.product-img').style.backgroundImage;
                    // bgImage có dạng: url("link_anh") -> Ta cắt lấy link_anh
                    const imageUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

                    // Thêm vào mảng Cart
                    const existingItem = cart.find(item => item.name === name);
                    if (existingItem) {
                        existingItem.quantity += 1; // Có rồi thì tăng số lượng
                    } else {
                        cart.push({ name, price, imageUrl, quantity: 1 }); // Chưa có thì thêm mới
                    }

                    // Đổi chữ nút tạm thời để báo hiệu
                    const originalText = this.innerText;
                    this.innerText = "Đã thêm ✔";
                    this.style.background = "#2ed573"; // Đổi màu xanh lá
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.style.background = ""; // Trả về màu gốc của CSS
                    }, 1000);

                    // Cập nhật giao diện
                    updateCartUI();
                });
            });

            // --- Hàm Vẽ lại giỏ hàng ra HTML ---
            function updateCartUI() {
                cartItemsContainer.innerHTML = ''; // Xóa sạch để in lại
                let total = 0;
                let count = 0;

                cart.forEach((item, index) => {
                    total += item.price * item.quantity;
                    count += item.quantity;

                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <div class="cart-item-img" style="background-image: url('${item.imageUrl}')"></div>
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.price.toLocaleString('vi-VN')}đ x ${item.quantity}</p>
                            </div>
                            <button class="remove-btn" onclick="removeCartItem(${index})"><i class="fas fa-trash"></i></button>
                        </div>
                    `;
                });

                cartBadge.innerText = count; // Cập nhật số đỏ trên Header
                cartTotalPrice.innerText = total.toLocaleString('vi-VN') + 'đ'; // Cập nhật tổng tiền
            }

            // --- Hàm Xóa 1 sản phẩm khỏi giỏ (Gắn vào window để html inline onclick gọi được) ---
            window.removeCartItem = function(index) {
                cart.splice(index, 1);
                updateCartUI();
            };

        });