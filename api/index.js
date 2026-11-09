// binhdinh-local-business — Chợ đêm & đặc sản Quy Nhơn 2026
// Tác giả: HTK — Hotline/Zalo: 0396241674 — Email: htk.contact@gmail.com
// Cập nhật: 09/11/2026
const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Vercel rewrite "/(.*)" -> "/api/index?__path=$1": khôi phục req.url gốc
// để Express định tuyến đúng (pattern đã kiểm chứng trên Vercel Node).
app.use((req, res, next) => {
  const qIdx = req.url.indexOf('?');
  const qs = qIdx >= 0 ? req.url.slice(qIdx + 1) : '';
  const params = new URLSearchParams(qs);
  if (params.has('__path')) {
    const p = params.get('__path').replace(/^\/+/, '');
    params.delete('__path');
    const rest = params.toString();
    req.url = '/' + p + (rest ? '?' + rest : '');
  } else if (req.url === '/api/index' || req.url.startsWith('/api/index/')) {
    req.url = req.url.slice('/api/index'.length) || '/';
  } else if (req.url.startsWith('/api/index?')) {
    req.url = req.url.slice('/api/index'.length);
  }
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

app.locals.mockLabel = 'Dữ liệu mô phỏng – cập nhật 09/11/2026';
app.locals.updated = 'Cập nhật: 09/11/2026';

// ============================================================
// 40 quán — Dữ liệu mô phỏng – cập nhật 09/11/2026
// Tên quán là HƯ CẤU (mock). Địa chỉ dùng đường phố THẬT ở Quy Nhơn
// nhưng số nhà mô phỏng. Giá, sao đánh giá, giờ mở cửa đều là mock.
// ============================================================
const MONS = [
  'Bánh xèo tôm nhảy', 'Bánh ít lá gai', 'Nem chợ Huyện', 'Bún chả cá',
  'Bánh hỏi lòng heo', 'Tré Bình Định', 'Gà nướng lu', 'Mực ngào',
  'Rượu Bầu Đá', 'Cháo lòng', 'Bún rạm', 'Hải sản', 'Nem nướng', 'Chè & giải khát'
];

// [tên quán, món, địa chỉ (đường thật Quy Nhơn), giá từ (kđ), giá đến (kđ), sao, lượt đánh giá, giờ mở cửa, khu vực]
const RAW = [
  ['Bánh Xèo Cô Tư tôm nhảy', 'Bánh xèo tôm nhảy', '52 Ngô Mây, Quy Nhơn', 30, 60, 4.8, 312, '10:00–21:30', 'Nội thành'],
  ['Bánh Xèo Tôm Nhảy Út Hiền', 'Bánh xèo tôm nhảy', '18 Diên Hồng, Quy Nhơn', 25, 55, 4.6, 201, '09:30–21:00', 'Nội thành'],
  ['Bánh Xèo Giòn Bà Tám', 'Bánh xèo tôm nhảy', '240 Nguyễn Thái Học, Quy Nhơn', 25, 50, 4.5, 188, '16:00–23:00', 'Chợ đêm'],
  ['Bánh Xèo Tôm Nhảy Mợ Chín', 'Bánh xèo tôm nhảy', '77 Tăng Bạt Hổ, Quy Nhơn', 30, 65, 4.7, 154, '10:00–22:00', 'Nội thành'],
  ['Bánh Ít Lá Gai Cô Ba', 'Bánh ít lá gai', '12 Nguyễn Huệ, Quy Nhơn', 5, 15, 4.7, 265, '07:00–20:00', 'Nội thành'],
  ['Bánh Ít Lá Gai Dì Năm Bình Định', 'Bánh ít lá gai', '96 Trần Hưng Đạo, Quy Nhơn', 6, 20, 4.6, 178, '06:30–19:30', 'Nội thành'],
  ['Lò Bánh Ít Lá Gai Bảy Tỷ', 'Bánh ít lá gai', '35 Hoàng Văn Thụ, Quy Nhơn', 5, 12, 4.4, 121, '07:00–18:00', 'Nội thành'],
  ['Nem Chợ Huyện Gốc Đa Bà Lan', 'Nem chợ Huyện', '201 Trần Hưng Đạo, Quy Nhơn', 40, 90, 4.8, 289, '07:00–21:00', 'Nội thành'],
  ['Nem Chợ Huyện Cô Lệ', 'Nem chợ Huyện', '63 Lý Thường Kiệt, Quy Nhơn', 35, 80, 4.6, 176, '07:30–20:30', 'Nội thành'],
  ['Nem Chợ Huyện Út Muối', 'Nem chợ Huyện', '310 Nguyễn Thái Học, Quy Nhơn', 35, 75, 4.5, 143, '16:00–23:00', 'Chợ đêm'],
  ['Bún Chả Cá Phượng Tươi', 'Bún chả cá', '28 Nguyễn Huệ, Quy Nhơn', 25, 40, 4.7, 342, '06:00–12:00', 'Nội thành'],
  ['Bún Chả Cá Bà Cụ Già', 'Bún chả cá', '150 Lê Hồng Phong, Quy Nhơn', 25, 45, 4.6, 254, '06:00–13:00', 'Nội thành'],
  ['Bún Chả Cá Ngọc Liên Sáng Sớm', 'Bún chả cá', '44 Phan Bội Châu, Quy Nhơn', 20, 35, 4.4, 167, '05:30–11:00', 'Nội thành'],
  ['Bánh Hỏi Lòng Heo Diên Hồng Cô Sáu', 'Bánh hỏi lòng heo', '89 Diên Hồng, Quy Nhơn', 35, 60, 4.7, 231, '06:00–13:00', 'Nội thành'],
  ['Bánh Hỏi Lòng Heo Tám Vững', 'Bánh hỏi lòng heo', '23 Mai Xuân Thưởng, Quy Nhơn', 30, 55, 4.5, 189, '06:30–14:00', 'Nội thành'],
  ['Bánh Hỏi Lòng Heo Chợ Đêm Số 7', 'Bánh hỏi lòng heo', '268 Nguyễn Thái Học, Quy Nhơn', 35, 65, 4.3, 98, '16:30–23:00', 'Chợ đêm'],
  ['Tré Bà Đệ Trộn Tay', 'Tré Bình Định', '81 Nguyễn Huệ, Quy Nhơn', 30, 70, 4.7, 214, '07:00–20:00', 'Nội thành'],
  ['Tré Rơm Cô Cẩm Bình Định', 'Tré Bình Định', '117 Tăng Bạt Hổ, Quy Nhơn', 25, 60, 4.5, 132, '07:30–19:30', 'Nội thành'],
  ['Tré Bà Năm Gói Lá Ổi', 'Tré Bình Định', '56 Vũ Bảo, Quy Nhơn', 25, 65, 4.4, 108, '08:00–19:00', 'Nội thành'],
  ['Gà Nướng Lu Đất Võ Anh Tuấn', 'Gà nướng lu', '302 Nguyễn Thái Học, Quy Nhơn', 180, 280, 4.6, 176, '15:00–23:00', 'Chợ đêm'],
  ['Gà Nướng Lu Cột Điện Cô Hồng', 'Gà nướng lu', '405 Lê Hồng Phong, Quy Nhơn', 170, 260, 4.5, 149, '15:30–22:30', 'Nội thành'],
  ['Gà Nướng Lu Tây Sơn Quán Mộc', 'Gà nướng lu', '72 Tây Sơn, Quy Nhơn', 190, 300, 4.7, 121, '10:00–22:00', 'Nội thành'],
  ['Mực Ngào Tỏi Ớt Cô Sương', 'Mực ngào', '134 Nguyễn Thái Học, Quy Nhơn', 20, 45, 4.5, 165, '16:00–23:30', 'Chợ đêm'],
  ['Mực Ngào Rim Mặn Ngọt Hai Lúa', 'Mực ngào', '39 Chương Dương, Quy Nhơn', 20, 40, 4.4, 112, '15:00–22:00', 'Nội thành'],
  ['Mực Ngào Một Nắng Xuân Diệu', 'Mực ngào', '22 Xuân Diệu, Quy Nhơn', 25, 50, 4.6, 97, '09:00–22:00', 'Biển Xuân Diệu'],
  ['Rượu Bầu Đá Chính Gốc Chú Mười', 'Rượu Bầu Đá', '95 Đống Đa, Quy Nhơn', 60, 150, 4.6, 134, '07:00–20:00', 'Nội thành'],
  ['Rượu Bầu Đá Nếp Làng Mai Xuân Thưởng', 'Rượu Bầu Đá', '14 Mai Xuân Thưởng, Quy Nhơn', 55, 130, 4.4, 88, '07:30–19:00', 'Nội thành'],
  ['Rượu Bầu Đá Quán Quê Bà Rịa', 'Rượu Bầu Đá', '188 Nguyễn Thái Học, Quy Nhơn', 50, 120, 4.3, 76, '16:00–22:30', 'Chợ đêm'],
  ['Cháo Lòng Ghềnh Ráng Cô Bông', 'Cháo lòng', '67 An Dương Vương, Quy Nhơn', 20, 35, 4.5, 187, '05:30–11:00', 'Ghềnh Ráng'],
  ['Cháo Lòng Đêm Nguyễn Thái Học', 'Cháo lòng', '290 Nguyễn Thái Học, Quy Nhơn', 20, 40, 4.4, 129, '17:00–00:30', 'Chợ đêm'],
  ['Cháo Lòng Bà Cụ Lê Lợi', 'Cháo lòng', '31 Lê Lợi, Quy Nhơn', 18, 30, 4.3, 95, '05:00–10:30', 'Nội thành'],
  ['Bún Rạm Phù Cát Giữa Phố', 'Bún rạm', '108 Bà Triệu, Quy Nhơn', 25, 40, 4.6, 158, '06:00–13:00', 'Nội thành'],
  ['Bún Rạm Cô Thoảng Đầm Chợ', 'Bún rạm', '26 Hai Bà Trưng, Quy Nhơn', 25, 45, 4.5, 121, '06:30–12:30', 'Nội thành'],
  ['Hải sản Ốc Hút Đêm Xuân Diệu', 'Hải sản', '58 Xuân Diệu, Quy Nhơn', 60, 200, 4.5, 243, '16:00–23:30', 'Biển Xuân Diệu'],
  ['Hải Sản Tươi Sống Bạch Đằng Cô Xíu', 'Hải sản', '77 Bạch Đằng, Quy Nhơn', 80, 250, 4.6, 198, '10:00–22:00', 'Nội thành'],
  ['Ốc & Hải Sản Chợ Đêm Gian 12', 'Hải sản', '224 Nguyễn Thái Học, Quy Nhơn', 50, 180, 4.3, 167, '16:00–23:30', 'Chợ đêm'],
  ['Nem Nướng Cô Hạnh Đất Võ', 'Nem nướng', '49 Phan Bội Châu, Quy Nhơn', 30, 55, 4.6, 205, '10:00–21:30', 'Nội thành'],
  ['Nem Nướng Chả Lụi Quang Trung', 'Nem nướng', '162 Quang Trung, Quy Nhơn', 25, 50, 4.4, 136, '14:00–22:00', 'Nội thành'],
  ['Chè Nhớ Khúc Bạch Quy Nhơn', 'Chè & giải khát', '142 Nguyễn Thái Học, Quy Nhơn', 12, 25, 4.5, 174, '15:00–23:00', 'Chợ đêm'],
  ['Chè Đậu Đỏ Nước Dừa Cô Chín', 'Chè & giải khát', '38 Nguyễn Tất Thành, Quy Nhơn', 10, 22, 4.3, 102, '10:00–22:00', 'Biển Xuân Diệu']
];

// Kho nhận xét MÔ PHỎNG — hiển thị kèm từng quán
const REVIEW_POOL = [
  { ten: 'Minh Thư', noiDung: 'Quán ngon, giá mềm, cô chủ thân thiện. Sẽ quay lại!' },
  { ten: 'Quốc Bảo', noiDung: 'Đúng vị Bình Định gốc, ăn một lần là nhớ mãi.' },
  { ten: 'Thu Hà', noiDung: 'Đồ ăn nóng hổi, phục vụ nhanh, đáng đồng tiền.' },
  { ten: 'Văn Kiệt', noiDung: 'Không gian sạch sẽ, chỗ ngồi thoải mái buổi tối.' },
  { ten: 'Lan Anh', noiDung: 'Hỏi người dân địa phương mới ra quán này, rất đáng thử.' },
  { ten: 'Hoàng Nam', noiDung: 'Giá hợp lý cho du khách, không bị chặt chém.' },
  { ten: 'Mỹ Duyên', noiDung: 'Món đậm đà, chấm nước mắm tỏi ớt chuẩn vị Quy Nhơn.' },
  { ten: 'Thanh Tùng', noiDung: 'Đi mùa mưa lũ 2026 quán vẫn mở đều, chủ quán nhiệt tình chỉ đường.' }
];

const QUANS = RAW.map((r, i) => ({
  id: i + 1,
  ten: r[0], mon: r[1], diaChi: r[2],
  giaTu: r[3], giaDen: r[4], sao: r[5], luotDanhGia: r[6],
  gioMoCua: r[7], khuVuc: r[8],
  moTa: 'Quán ' + r[1].toLowerCase() + ' phong vị Quy Nhơn, nguyên liệu tươi trong ngày, giá bình dân cho khách địa phương và du khách.',
  danhGiaMock: [
    { ...REVIEW_POOL[i % REVIEW_POOL.length], sao: Math.min(5, Math.round(r[5] + 0.2)) },
    { ...REVIEW_POOL[(i * 3 + 5) % REVIEW_POOL.length], sao: Math.max(3, Math.round(r[5] - 0.3)) }
  ]
}));

function locQuan(query) {
  const mon = (query.mon || '').trim();
  const q = (query.q || '').trim().toLowerCase();
  const khuVuc = (query.khu || '').trim();
  const sapXep = (query.sapxep || 'danh-gia').trim();
  let ds = QUANS.filter((quan) => {
    if (mon && quan.mon !== mon) return false;
    if (khuVuc && quan.khuVuc !== khuVuc) return false;
    if (q && !(quan.ten.toLowerCase().includes(q) || quan.mon.toLowerCase().includes(q) || quan.diaChi.toLowerCase().includes(q))) return false;
    return true;
  });
  if (sapXep === 'gia-tang') ds.sort((a, b) => a.giaTu - b.giaTu);
  else if (sapXep === 'gia-giam') ds.sort((a, b) => b.giaDen - a.giaDen);
  else ds.sort((a, b) => b.sao - a.sao || b.luotDanhGia - a.luotDanhGia);
  return { ds, mon, q, khuVuc, sapXep };
}

app.get('/', (req, res) => {
  const noiBat = [...QUANS].sort((a, b) => b.sao - a.sao).slice(0, 6);
  res.render('index', { title: 'Trang chủ', noiBat, mons: MONS, total: QUANS.length });
});

app.get('/danh-sach', (req, res) => {
  const { ds, mon, q, khuVuc, sapXep } = locQuan(req.query);
  const khuVucs = [...new Set(QUANS.map((x) => x.khuVuc))];
  res.render('danh-sach', {
    title: 'Danh sách 40 quán đặc sản', quans: ds, mons: MONS, khuVucs,
    mon, q, khuVuc, sapXep, total: QUANS.length, found: ds.length
  });
});

app.get('/quan/:id', (req, res, next) => {
  const quan = QUANS.find((x) => x.id === Number(req.params.id));
  if (!quan) return next();
  const cungMon = QUANS.filter((x) => x.mon === quan.mon && x.id !== quan.id).slice(0, 3);
  res.render('quan', { title: quan.ten, quan, cungMon });
});

app.get('/cho-dem', (req, res) => {
  const gianHang = QUANS.filter((x) => x.khuVuc === 'Chợ đêm');
  res.render('cho-dem', { title: 'Chợ đêm Quy Nhơn', gianHang });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Giới thiệu' });
});

// 404 — phải đặt cuối cùng
app.use((req, res) => {
  res.status(404).render('404', { title: 'Không tìm thấy trang', url: req.originalUrl });
});

module.exports = app;

// Chạy local: node api/index.js
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Cho dem & dac san Quy Nhon chay tai http://localhost:${port} — HTK 0396241674`));
}