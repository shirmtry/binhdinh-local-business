// Chợ đêm & Đặc sản Quy Nhơn — HTK 0396241674 — Cập nhật 09/11/2026
// JS phía client: tự submit form lọc khi đổi select (nâng cao trải nghiệm).
(function () {
  'use strict';
  var form = document.querySelector('form.filter');
  if (form) {
    form.querySelectorAll('select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        form.submit();
      });
    });
  }
})();