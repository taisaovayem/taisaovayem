
# Tại sao vậy em?

Xin chào!
Cảm ơn bạn đã quan tâm đến Tại sao vậy em

Nếu bạn đã biết cách sử dụng git và markdown, vui lòng bỏ qua mục này và đi tiếp đến mục `2. Dành cho nhà phát triển` 


## 1. Tham gia đóng góp

Để đóng góp nội dung, bạn cần phải biết cú pháp sử dụng markdown và sử dụng git. 

 - [Đăng ký](https://github.com/signup) tài khoản Github nếu bạn chưa có
 - [Tải phần mềm git](https://git-scm.com/downloads)
 - [Cú pháp markdown cơ bản](https://www.markdownguide.org/basic-syntax/)
 - [Cú pháp sử dụng git cơ bản](https://rogerdudler.github.io/git-guide/)

### Hướng dẫn đóng góp
Hãy mở Terminal/CMD của máy bạn lên và thực hiện các lệnh sau:
Clone source code về máy
```bash
git clone https://github.com/tmthan/taisaovayem.git
```
Hãy đảm bảo bạn đang ở nhánh `main`
```bash
git checkout main
```
```bash
git pull
```
Tạo nhánh tính năng để đóng góp nội dung
```bash
git checkout -b feat/tinh-nang-cua-ban
```
#### Tạo nội dung bằng cách tạo các file bài viết trong thư mục `src/post` với tên `ten-bai-viet.md`
Hãy tham khảo các bài viết có sẵn để biết cú pháp viết bài
Một số thông tin cần lưu ý:

 - `title`: Tên bài viết
 - `category`: Chuyên mục, có thể tạo thêm nhiều chuyên mục vào bài viết
 - `tag`: Tag, có thể thêm nhiều tag vào bài viết
 
 #### Nhúng ảnh
 Để nhúng hình ảnh, vui lòng tải ảnh về và bỏ vào thư mục `public`, không nên găn trực tiếp từ link ảnh bên ngoài vì có thể ảnh sẽ bị xoá trong tương lai.
 Sử dụng cú pháp markdown để gắn ảnh với đường dẫn `/ten-anh`
 
 #### Nhúng media
 Hiện tại đa số các nền tảng chia sẻ media đều cung cấp thẻ nhúng, chỉ cần copy html và dán vào nội dung bài viết

#### Đẩy nội dung lên
```bash
git add .
```
```bash
git commit -m "(feat) noi dung commit"
```
```bash
git push origin feat/tinh-nang-cua-ban
```
#### Tạo pull request
Từ nhánh `feat-tinh-nang-cua-ban` sang nhánh `main`

Xong! Giờ chỉ việc chờ đóng góp của bạn được phát hành thôi.


# 2. Dành cho nhà phát triển #
### Môi trường yêu cầu
`Node 20`

  Cài đặt
  ```bash
  yarn
  ```
  Chạy local
  ```bash
  yarn dev
  ```
  Địa chỉ local: [http://localhost:3000/](http://localhost:3000/)

Build
```bash
yarn build
```
Build docker

```bash

docker  build  -t  taisaovayem  .

```

```bash

docker  run  --name  some-nginx  -d  -p  8080:80  taisaovayem

```
### Release flow
Hãy đảm bảo bạn đang ở nhánh main
```bash
git checkout main
```
```bash
git pull orign main
```
Tạo nhánh release gom nội dùng bằng cherry pick nếu cần
```bash
git checkout release/x.x.x
```
Build
```bash
yarn build
```
Add assets file
```bash
yarn release
```
Commit
```bash
git commit -m "(release) Your commit
```
```bash
git push
```


## Learn More

  

To learn more about Next.js, take a look at the following resources:

  

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

  

## Deploy on Vercel

  

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

  

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.