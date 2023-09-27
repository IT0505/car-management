# CAR MANAGEMENT

## Sơ lược

Dự án quản lý xe ô tô với một số tính năng quản lý cơ bản:

- Thêm
- Xóa
- Sửa
- Tìm kiếm

### Công nghệ sử dụng

- ReactJs
- NextJs

## Cách cài đặt và khởi chạy

### Yêu cầu cài đặt

- npm
  ```sh
  npm install npm@latest -g
  ```

### Cài đặt

1. Clone repo từ github
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Cài đặt tất cả các packages cần thiết
   ```sh
   npm install
   ```
3. Khởi chạy môi trường dev
   ```sh
   npm run dev
   ```
3. Mở localhost trên trình duyệt
   [LOCALHOST](http://localhost:3000)
   
## Chức năng và cách giải quyết vấn đề

### 1. Khi reload lại dữ liệu không bị mất
- Dùng file JSON lưu tại server local thay cho Database
- Config Next API Routes '/api/car/get-all' nhận request và xử lý lấy dữ liệu từ local JSON file và trả response
- Dùng Axios gọi api Get All phương thức GET
- Client nhận response và hiển thị dữ liệu
### 2. Cho phép thêm vào ô tô mới, tự tạo id
Tại trang home click '+ Add Car' để mở modal thêm xe, nhập thông tin click 'Submit' để xác nhận

- Config Next API Routes '/api/car/add' nhận car data và thêm vào mảng đã lưu:
  + Validate License Plate trùng trả về error
  + Dùng current index lưu tại local để tạo id tiếp theo
- Dùng Axios gọi api Add phương thức POST
- Phía Client validate:
  + License, Name, Birthday required
  + Name format chữ, từ 2-30 kí tự
  + Birthday ràng buộc trên 15t để được đứng tên xe
- Hiển thị Add thành công và xa đã thêm hoặc báo lỗi từ server
### 3. Cho phép xóa ô tô bằng id
Tại trang home click 'Delete' tại row muốn xóa, Click 'OK' tại Confirm Popup để xác nhận

- Config Next API Routes '/api/car/delete' nhận id và xử lý xóa item trong mảng đã lưu
- Dùng Axios gọi api Delete phương thức DELETE
- Phía Client popup xác nhận việc xóa item
- Hiển thị Xóa thành công hoặc báo lỗi từ server
### 4. Cho phép thay đổi thông tin ô tô bằng id
Tại trang home click 'Edit' tại row cần thay đổi để mở modal chứa thông tin Car đó, chỉnh thông tin click 'Submit' để xác nhận

- Config Next API Routes '/api/car/edit' nhận car data và thay đổi thông tin theo id
- Dùng Axios gọi api Edit phương thức PUT
- Phía Client validate như form Add Car
- Hiển thị thay đổi thành công và thông tin mới hoặc báo lỗi từ server
### 5. Cho phép tìm ô tô từ gần đến xa theo tọa độ, số lượng xe
Tại trang home nhập vào các input 'x', 'y', 'n' sau đó click 'Find Nearby' để tìm

- Config Next API Routes '/api/car/get-nearby' nhận x, y, n và xử lý tìm n xe gần đến xa theo x, y và theo thứ tự id
- Dùng Axios gọi api Get Nearby phương thức GET
- Phía Client validate n > 0
- Hiển thị tìm thành công và danh sách hoặc báo lỗi từ server
