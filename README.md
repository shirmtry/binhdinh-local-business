# 🍜 Chợ đêm & Đặc sản Quy Nhơn — binhdinh-local-business

Dự án #15 trong chuỗi 20 dự án Bình Định 2026 của **HTK**. Cập nhật: **09/11/2026**.

## 🌊 Vấn đề (bối cảnh mùa mưa lũ 2026)

Du khách đến Quy Nhơn thường không biết quán nào **ngon – rẻ – chính gốc**, dễ vào nhầm quán "chặt chém"
hoặc bỏ lỡ đặc sản thật sự của đất Võ. Tháng 11/2026, Bình Định đang cao điểm **mùa mưa lũ 2026** + bão
miền Trung (tháng 10–12/2026): lũ sông Kôn dâng cao (Tuy Phước, An Nhơn), bão số 9–10 đổ bộ Quy Nhơn –
Phù Cát – Hoài Nhơn, ngập úng đô thị, mất điện 3–7 ngày — nhiều quán ăn và chợ đêm phải đổi giờ hoặc
nghỉ đột ngột. Website gom một chỗ danh bạ quán đặc sản + thông tin chợ đêm để du khách tra cứu nhanh.

## ✨ Tính năng

- **Danh bạ 40 quán** đặc sản thật Bình Định: bánh xèo tôm nhảy, bánh ít lá gai, nem chợ Huyện,
  bún chả cá, bánh hỏi lòng heo, tré, gà nướng lu, mực ngào, rượu Bầu Đá, cháo lòng, bún rạm,
  hải sản, nem nướng, chè (14 nhóm món).
- **Bộ lọc theo món + khu vực**, **tìm kiếm** theo tên quán/món/đường, **sắp xếp** theo đánh giá hoặc giá.
- **Trang chi tiết quán** với giá tham khảo, giờ mở cửa và **đánh giá mock hiển thị** kèm nhận xét.
- **Trang chợ đêm Quy Nhơn** — đường Nguyễn Thái Học: giờ hoạt động, mẹo đi chợ, cảnh báo mưa lũ.
- Responsive 375px → 1440px, UI tiếng Việt, trang 404 có hotline HTK.

> ⚠️ **Dữ liệu mô phỏng – cập nhật 09/11/2026**: tên quán là hư cấu; địa chỉ dùng tên đường **thật**
> ở Quy Nhơn với số nhà mô phỏng; giá, sao đánh giá, giờ mở cửa đều là mock.

## 🛠️ Công nghệ

- Node.js + **Express** + **EJS** (server-side rendering)
- CSS thuần responsive, JavaScript tối giản phía client
- Deploy **Vercel** (`@vercel/node`, rewrite `/(.*)` → `/api/index?__path=$1`)

## 🚀 Cách chạy local

```bash
npm install
npm start          # hoặc: node api/index.js
# Mở http://localhost:3000
```

Các route: `/` (trang chủ), `/danh-sach` (directory + filter, ví dụ
`/danh-sach?mon=B%C3%A1nh%20x%C3%A8o%20t%C3%B4m%20nh%E1%BA%A3y&sapxep=gia-tang&q=ng%C3%B4`),
`/quan/:id` (chi tiết), `/cho-dem`, `/about`, 404 cho route lạ.

## 🔗 Deploy

- Vercel production: **https://binhdinh-local-business.vercel.app**

## 📞 Liên hệ HTK – 0396241674 – 09/11/2026

- Tác giả: **HTK**
- Hotline/Zalo: **0396241674** — [zalo.me/0396241674](https://zalo.me/0396241674)
- Email: **htk.contact@gmail.com**
- Cập nhật: **09/11/2026** — dữ liệu mô phỏng phục vụ mùa mưa lũ 2026.

© 2026 HTK · Hotline/Zalo: 0396241674 · Email: htk.contact@gmail.com