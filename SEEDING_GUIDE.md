# 📊 Hướng dẫn Seed Dữ liệu Bất động sản & Giao dịch

## 📋 Nội dung

Dự án đã được sẵn sàng với:
- ✅ **10 bất động sản mẫu** (Nhà phố, Căn hộ, Đất nền, Nhà mặt phố)
- ✅ **6 giao dịch/deal mẫu** (Mua bán, Cho thuê)
- ✅ **2 tài khoản Agent** (Môi giới)

## 🚀 Cách chạy Seeding Script

### 1. Đảm bảo MongoDB đang chạy

**Option A: Sử dụng MongoDB local**
```bash
# Cài đặt MongoDB Community từ https://www.mongodb.com/try/download/community
# Sau khi cài, chạy MongoDB service
# Windows: MongoDB sẽ tự start
# Mac/Linux: 
mongod
```

**Option B: Sử dụng MongoDB Atlas (Cloud)**
- Cập nhật `MONGODB_URI` trong `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority
```

### 2. Chạy Seeding Script

```bash
# Di chuyển vào thư mục backend
cd backend

# Chạy script seeding
npm run seed
```

**Output mong đợi:**
```
🌱 Bắt đầu seeding database...
✓ Đã xóa dữ liệu cũ
✓ Đã tạo tài khoản agent
✓ Đã thêm 10 bất động sản
✓ Đã thêm 6 giao dịch
✅ Seeding hoàn tất thành công!

📊 Thống kê:
   - Bất động sản: 10
   - Giao dịch: 6
   - Agents: 2

🔐 Tài khoản Agent:
   Email: agent1@realestate.com | Password: password123
   Email: agent2@realestate.com | Password: password123
```

## 📐 Dữ liệu được tạo

### Bất động sản (10 listings)

**1. Nhà phố 3 tầng Phú Nhuận**
- Giá: 850 triệu VND
- Diện tích: 150m²
- 3 PN, 2 PVS
- Trạng thái: Có sẵn

**2. Căn hộ 2 phòng ngủ Bình Thạnh**
- Giá: 2.85 tỷ VND
- Diện tích: 85m²
- Chung cư cao cấp
- Trạng thái: Có sẵn

**3. Đất nền khu dân cư Thủ Đức**
- Giá: 1.2 tỷ VND
- Diện tích: 200m²
- Hạ tầng hoàn chỉnh
- Trạng thái: Có sẵn

**4. Nhà mặt phố Quận 1 - Kinh doanh**
- Giá: 4.5 tỷ VND
- Diện tích: 50m²
- Cho thuê kinh doanh
- Trạng thái: Có sẵn

**5. Căn hộ sang trọng Vinhomes Central Park**
- Giá: 6.5 tỷ VND
- Diện tích: 200m²
- 4 PN, 3 PVS, view toàn cảnh
- Trạng thái: Có sẵn

**6. Biệt thự Quận 7 - Thảo Điền**
- Giá: 12 tỷ VND
- Diện tích: 500m²
- 5 PN, 4 PVS
- Trạng thái: Có sẵn

**7-10. ... (Thêm 4 listings khác)**

### Giao dịch (6 transactions)

**1. Giao dịch Nhà phố Phú Nhuận - Hoàn tất**
- Giá: 850 triệu
- Loại: Mua - Bán
- Ngày: 15/01/2024

**2. Cho thuê Căn hộ Bình Thạnh - Hoàn tất**
- Giá: 8.5 triệu/tháng
- Loại: Cho thuê
- Hợp đồng: 12 tháng

**3. Giao dịch Đất nền Thủ Đức - Chờ xử lý**
- Giá: 1.2 tỷ
- Loại: Mua - Bán
- Đang chờ hoàn tất thủ tục

**... (Thêm 3 giao dịch khác)**

## 🌐 Truy cập Dữ liệu

### Frontend URLs

```
# Trang chủ - Danh sách bất động sản
http://localhost:3000/

# Trang giao dịch
http://localhost:3000/transactions

# Chi tiết bất động sản (ví dụ)
http://localhost:3000/property/{property_id}

# Đăng ký / Đăng nhập
http://localhost:3000/register
http://localhost:3000/login
```

### Backend API Endpoints

```bash
# Lấy tất cả bất động sản
GET /api/properties

# Lấy chi tiết bất động sản
GET /api/properties/:id

# Lấy tất cả giao dịch
GET /api/transactions

# Lấy giao dịch theo loại
GET /api/transactions/by-type/Sale
GET /api/transactions/by-type/Rental

# Lấy giao dịch theo trạng thái
GET /api/transactions/by-status/Completed
GET /api/transactions/by-status/Pending

# Thống kê giao dịch
GET /api/transactions/stats

# Đăng nhập
POST /api/auth/login
Body: { email: "agent1@realestate.com", password: "password123" }

# Đăng ký
POST /api/auth/register
Body: { name: "...", email: "...", password: "...", role: "User|Agent" }
```

## 🔄 Xóa và Seed lại

```bash
# Xóa dữ liệu cũ và seed lại
npm run seed

# Thao tác này sẽ:
# ✓ Xóa tất cả bất động sản cũ
# ✓ Xóa tất cả giao dịch cũ
# ✓ Tạo lại 2 tài khoản agent
# ✓ Tạo lại 10 bất động sản
# ✓ Tạo lại 6 giao dịch
```

## 📝 Chú ý

1. **MongoDB phải đang chạy** trước khi seed
2. Seeding sẽ **xóa dữ liệu cũ**, nên hãy backup nếu cần
3. Các ảnh trong listings là placeholder từ Unsplash
4. Password cứng trong seed script chỉ cho demo, thay đổi khi production

## ⚡ Bước tiếp theo

1. Khởi động Backend
   ```bash
   cd backend
   npm run dev
   ```

2. Khởi động Frontend (Terminal khác)
   ```bash
   cd frontend
   npm start
   ```

3. Seed dữ liệu (Terminal khác)
   ```bash
   cd backend
   npm run seed
   ```

4. Truy cập http://localhost:3000 và kiểm tra dữ liệu

Thêm thông tin? Tham khảo README.md tại thư mục gốc project!
