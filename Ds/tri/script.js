// ==========================================
// JAVASCRIPT CHO WEBSITE GIỚI THIỆU BẢN THÂN
// Dành cho học sinh lớp 12 - Tin học cơ bản
// ==========================================

// Chờ trang web load xong mới chạy code
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. THÔNG BÁO CHÀO MỪNG KHI VÀO TRANG
    // ==========================================
    console.log('Website đã tải xong!');
    
    // Có thể bật thông báo chào mừng (tắt để không làm phiền người dùng)
    // alert('Chào mừng bạn đến với website của tôi!');
    
    
    // ==========================================
    // 2. HIỆU ỨNG CLICK VÀO CÁ VOI
    // ==========================================
    var whale = document.querySelector('.whale');
    
    // Khi click vào cá voi
    whale.addEventListener('click', function() {
        alert('🐋 Cá voi chào bạn! Chúc bạn một ngày tốt lành!');
    });
    
    
    // ==========================================
    // 2.1. HIỆU ỨNG CLICK VÀO CÁ MẬP
    // ==========================================
    var shark = document.querySelector('.shark');
    
    // Khi click vào cá mập
    shark.addEventListener('click', function() {
        alert('🦈 Cá mập đang bơi vòng quanh! Cẩn thận nhé!');
    });
    
    
    // ==========================================
    // 2.2. HIỆU ỨNG CLICK VÀO SAO BIỂN
    // ==========================================
    var starfishes = document.querySelectorAll('.starfish');
    
    // Khi click vào bất kỳ sao biển nào
    starfishes.forEach(function(star) {
        star.addEventListener('click', function() {
            alert('⭐ Sao biển lấp lánh! Bạn vừa tìm được kho báu đại dương!');
        });
    });
    
    
    // ==========================================
    // 4. HIỆU ỨNG HOVER CHO ẢNH ĐẠI DIỆN
    // ==========================================
    var profileImage = document.querySelector('.profile-image');
    
    // Khi rê chuột vào ảnh
    profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    // Khi rê chuột ra khỏi ảnh
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    
    // ==========================================
    // 5. SMOOTH SCROLL KHI CLICK VÀO MENU
    // ==========================================
    var navLinks = document.querySelectorAll('.nav-link');
    
    // Duyệt qua tất cả các link trong menu
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn hành động mặc định
            
            // Lấy id của phần cần scroll tới
            var targetId = this.getAttribute('href');
            var targetSection = document.querySelector(targetId);
            
            // Scroll mượt mà đến phần đó
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ==========================================
    // 6. THAY ĐỔI MÀU HEADER KHI SCROLL
    // ==========================================
    var header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        // Kiểm tra vị trí scroll
        if (window.scrollY > 100) {
            // Khi scroll xuống 100px, thay đổi màu header
            header.style.background = 'rgba(10, 75, 120, 1)';
        } else {
            // Khi ở đầu trang, trở về màu ban đầu
            header.style.background = 'rgba(10, 75, 120, 0.9)';
        }
    });
    
    
    // ==========================================
    // 7. HIỆU ỨNG XUẤT HIỆN KHI SCROLL ĐẾN
    // ==========================================
    var hobbyCards = document.querySelectorAll('.hobby-card');
    
    // Hàm kiểm tra phần tử có trong màn hình không
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Kiểm tra khi scroll
    window.addEventListener('scroll', function() {
        hobbyCards.forEach(function(card) {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Thiết lập trạng thái ban đầu cho các card
    hobbyCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    
    // ==========================================
    // 8. THÔNG BÁO KHI RỜI KHỎI TRANG
    // ==========================================
    window.addEventListener('beforeunload', function(e) {
        // Có thể bỏ comment dòng dưới để hiện thông báo khi đóng trang
        // e.returnValue = 'Bạn có chắc muốn rời khỏi trang?';
    });
    
});

// ==========================================
// KẾT THÚC FILE JAVASCRIPT
// ==========================================