import { Heading, Link } from "@radix-ui/themes";

export default function PrivacyPolicy() {
  return (
    <>
      <Heading id="ch-nh-s-ch-quy-n-ri-ng-t-" size="6" className="mb-4">
        Chính sách quyền riêng tư
      </Heading>
      <Heading id="ch-nh-s-ch-quy-n-ri-ng-t-l-g-" size="3">
        Chính sách quyền riêng tư là gì
      </Heading>
      <p className="mb-2">
        Chúng tôi muốn bạn nắm được các loại thông tin của bạn mà chúng tôi và
        các dịch vụ của bên thứ ba mà chúng tôi thu nhập. Từ đó bạn có thể lựa
        chọn sử dụng dịch vụ phù hợp với nhu cầu sử dụng của mình.
      </p>
      <Heading id="ch-ng-t-i-thu-th-p-nh-ng-th-ng-tin-g-" size="3">
        Chúng tôi thu thập những thông tin gì?
      </Heading>
      <p className="mb-2">
        taisaovayem là web tĩnh và hiện chúng tôi không thu thập và lưu trữ bất
        kỳ thông tin nào của bạn. Tuy nhiên, chúng tôi có sử dụng các dịch vụ
        của bên thứ ba để có thể tối ưu hoá trải nghiệm của người dùng. Các dữ
        liệu này không được lưu trữ trong hệ thống máy chủ của chúng tôi. Các
        dịch vụ của bên thứ ba chúng tôi sử dụng gồm có:
        <ul className="list-disc">
          <li className="list-item ml-8">Plugin bình luận trên Facebook</li>
          <li className="list-item ml-8">Google analytics</li>
        </ul>
      </p>
      <Heading id="plugin-b-nh-lu-n-tr-n-facebook" size="3">
        Plugin bình luận trên Facebook
      </Heading>
      <p className="mb-2">
        Chúng tôi sử dụng Plugin bình luận trên Facebook để mọi người bình luận
        vào mỗi bài viết. Vui lòng đọc{" "}
        <a href="https://www.facebook.com/privacy/policy/?entry_point=facebook_page_footer">
          Chính sách quyền riêng tư của Meta
        </a>{" "}
        để biết dữ liệu của bạn đang được Meta sử dụng như thế nào.
      </p>
      <Heading id="google-analytics" size="3">
        Google analytics
      </Heading>
      <p className="mb-2">
        Chúng tôi sử dụng dịch vụ Google Analytics để phân tích lưu lượng truy
        cập. Vui lòng đọc{" "}
        <a href="https://policies.google.com/privacy">
          Chính sách bảo mật của Google
        </a>
      </p>
      <Heading id="t-i-kh-ng-mu-n-th-ng-tin-c-a-t-i-b-thu-th-p" size="3">
        Tôi không muốn thông tin của tôi bị thu thập
      </Heading>
      <p className="mb-2">
        Nếu bạn không muốn thông tin của mình bị thu thập bởi các bên thứ ba mà
        chúng tôi đã liệt kê, bạn vẫn có thể tiếp tục sử dụng dịch vụ bằng cách
        tắt javascript trên trình duyệt. Tuy nhiên, một số tính năng sẽ không
        thể hoạt động hoạt hoạt động không chính xác.
      </p>
      <Link href="/">Quay lại trang chủ</Link>
    </>
  );
}
