// Import event images from assets
import { getEventImage } from "../assets/eventImages.js";

// Shared event data
export const eventData = [
  {
    id: 1,
    title:
      'TỌA ĐÀM "Đào tạo chuyển đổi số trong xu thế phát triển của lực lượng lao động AI Agent trong doanh nghiệp"',

    date: "2025-07-10",
    endDate: "2025-07-10",
    location: "Hội trường A, Tòa nhà chính",
    limitNumber: 200,
    deadlineCancel: "2025-07-08",
    description:
      "Tọa đàm mang đến những kiến thức mới nhất về chuyển đổi số và ứng dụng AI Agent trong doanh nghiệp. Sự kiện quy tụ các chuyên gia hàng đầu trong lĩnh vực công nghệ thông tin và chuyển đổi số.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia Tọa đàm về chuyển đổi số. Chi tiết sự kiện:\n- Thời gian: 10/07/2025\n- Địa điểm: Hội trường A\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image: getEventImage(1),
    category: "academic",
    status: "approved",
    organizer: "Đoàn Khoa Hệ thông thông tin",
    createdBy: "O001", // Đoàn Khoa Hệ thông thông tin
  },
  {
    id: 2,
    title:
      'CHIẾN DỊCH TÌNH NGUYỆN "HOA MỘC MIÊN" LẦN THỨ VII - HÀNH TRÌNH GIEO MẦU YÊU THƯƠNG',

    date: "2025-08-02",
    endDate: "2025-08-05",
    location: "Các tỉnh miền Trung",
    limitNumber: 100,
    deadlineCancel: "2025-07-30",
    description:
      "Chiến dịch tình nguyện mùa hè mang đến những hoạt động thiện nguyện ý nghĩa cho cộng đồng. Các hoạt động bao gồm: xây dựng nhà tình thương, tặng quà cho trẻ em nghèo, khám bệnh miễn phí.",
    emailTemplate:
      "Chào bạn,\n\nCảm ơn bạn đã đăng ký tham gia chiến dịch Hoa Mộc Miên lần thứ VII. Thông tin chi tiết:\n- Thời gian: 02/08 - 05/08/2025\n- Tập trung: 6:00 sáng ngày 02/08\n\nHãy chuẩn bị tinh thần và sức khỏe tốt nhất!\n\nChúc bạn nhiều sức khỏe!",
    image: getEventImage(2),
    category: "community",
    status: "approved",
    organizer: "Đoàn Khoa Hệ thông thông tin",
    createdBy: "O001", // Tuổi trẻ Kinh tế - Luật
  },
  {
    id: 3,
    title: 'PHÁT ĐỘNG WEBINAR "DATA INSIGHT - FLY TO THE BI SKY"',
    date: "2025-07-11",
    endDate: "2025-07-11",
    location: "Online - Google Meet",
    limitNumber: 500,
    deadlineCancel: "2025-07-09",
    description:
      "Webinar chuyên sâu về Business Intelligence và Data Analytics. Cung cấp kiến thức thực tế về xử lý dữ liệu, phân tích thông minh và ứng dụng trong doanh nghiệp hiện đại.",
    emailTemplate:
      "Xin chào,\n\nBạn đã đăng ký thành công webinar 'Data Insight'. Thông tin truy cập:\n- Link: [Link Google Meet sẽ gửi trước 30 phút]\n- Thời gian: 11/07/2025 - 14:00\n\nVui lòng chuẩn bị sẵn câu hỏi để tương tác!\n\nTrân trọng,\nITB Club",
    image: getEventImage(3),
    category: "academic",
    status: "approved",
    organizer: "Đoàn Khoa Hệ thông thông tin",
    createdBy: "O001", // Đội tình nguyện UEL
  },
  {
    id: 4,
    title:
      "Chương trình Đại sứ Thanh niên triển vọng MB Pioneer Ambassadors Gen 6 tại Ngân hàng TMCP Quân đội (MBBank)",

    date: "2025-08-09",
    endDate: "2025-08-09",
    location: "Trụ sở chính MBBank, TP.HCM",
    limitNumber: 50,
    deadlineCancel: "2025-08-07",
    description:
      "Chương trình đào tạo và phát triển kỹ năng cho sinh viên ưu tú. Cơ hội học hỏi từ các chuyên gia ngân hàng, tham gia các dự án thực tế và xây dựng mạng lưới quan hệ trong ngành tài chính.",
    emailTemplate:
      "Kính gửi bạn,\n\nChúc mừng bạn được chọn tham gia chương trình MB Pioneer Ambassadors Gen 6!\n\nThông tin chi tiết:\n- Ngày: 09/08/2025\n- Địa điểm: Trụ sở MBBank\n- Dress code: Business formal\n\nVui lòng mang theo CCCD và thư mời.\n\nTrân trọng!",
    image:
      "https://tuyendung.mbbank.com.vn/sharefb?file=news/2024/02/07/65c35638b7712_423584454_367089096079379_4473854621898483344_n_170654.jpg",
    category: "other",
    status: "approved",
    organizer: "Đoàn Khoa Hệ thông thông tin",
    createdBy: "O001", // Phòng Hợp tác phát triển -> Ban Công tác Sinh viên
  },
  {
    id: 5,
    title: 'Hội thảo "Dự án chuyển đổi số Tập đoàn TOYOTA"',

    date: "2025-09-13",
    endDate: "2025-09-13",
    location: "Phòng hội thảo Toyota Việt Nam",
    limitNumber: 150,
    deadlineCancel: "2025-09-11",
    description:
      "Hội thảo chia sẻ kinh nghiệm chuyển đổi số thành công của Tập đoàn Toyota. Các chủ đề chính: Digital Transformation Strategy, IoT trong sản xuất, AI trong quản lý chuỗi cung ứng.",
    emailTemplate:
      "Kính chào Quý khách,\n\nCảm ơn bạn đã đăng ký tham dự hội thảo Toyota Digital Transformation.\n\nThông tin:\n- Thời gian: 13/09/2025, 8:30 - 16:30\n- Check-in: 8:00\n- Bao gồm: Coffee break và lunch\n\nXin vui lòng xác nhận tham dự.\n\nTrân trọng!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvcrLtNscC9n4jk1heUGFmXuwqPxPHhciuhw&s",
    category: "academic",
    status: "approved",
    createdBy: "O002",
  },
  {
    id: 6,
    title:
      'TỌA ĐÀM "ỨNG DỤNG CÔNG NGHỆ SỐ TRONG PHÁT TRIỂN VĂN HÓA ĐỌC VÀ NGHIÊN CỨU HỌC THUẬT"',

    date: "2025-07-12",
    endDate: "2025-07-12",
    location: "Hội trường B, Tòa nhà chính",
    limitNumber: 150,
    deadlineCancel: "2025-07-10",
    description:
      "Tọa đàm nhằm giới thiệu và thảo luận về ứng dụng công nghệ số trong phát triển văn hóa đọc và nghiên cứu học thuật. Các chủ đề bao gồm: Ứng dụng AI trong việc tổ chức và quản lý thư viện, phát triển ứng dụng đọc sách điện tử, nghiên cứu về học thuật và tâm lý học.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia Tọa đàm về ứng dụng công nghệ số. Chi tiết sự kiện:\n- Thời gian: 12/07/2025\n- Địa điểm: Hội trường B\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/499548217_1125281286306996_8404359102049952661_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGsU5wvxGVbAkYlCv-4gMTeZtOtDSKK8lpm060NIoryWgW4j59gnC0ocnck4mN1Lb4P1r2MFFKX-M2xVBqAEu7C&_nc_ohc=MmCRi86XGhoQ7kNvwHf3gFE&_nc_oc=AdmaSLiIyYaP_qz7xSkYGLIP9gcycG4zUy4ncOwqcQzQS6vsWXbnaRdZ-5U7isUlNil9Hm4id5Feh4pvkDuNmovv&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=JRCQqZphMmzGlX5ReydoYw&oh=00_AfRnm09Ym_RezAg8_rnyJefwdD0txE1MtZTjkOVzz6fMVA&oe=68742759",
    category: "cultural",
    status: "approved",
    createdBy: "O002",
  },
  {
    id: 7,
    title: 'ROADMAP TO YOUR JOB - CHƯƠNG TRÌNH 3 - "NGÀY HỘI VIỆC LÀM"',

    date: "2025-08-11",
    endDate: "2025-08-11",
    location: "Hội trường C, Tòa nhà chính",
    limitNumber: 200,
    deadlineCancel: "2025-08-09",
    description:
      "Chương trình giúp sinh viên hiểu rõ hơn về quá trình tìm kiếm việc làm, từ việc chuẩn bị CV, phỏng vấn đến các bước sau khi được tuyển dụng. Các hoạt động bao gồm: Workshop về kỹ năng phỏng vấn, cuộc thi thuyết trình, hội thảo về cơ hội việc làm.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia ROADMAP TO YOUR JOB. Chi tiết sự kiện:\n- Thời gian: 11/08/2025\n- Địa điểm: Hội trường C\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/497781142_724553246799439_984576368554717771_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHcTio2DFkRGkMrllUOJVAoHzMVRwVG5YcfMxVHBUblh1wFhCTDRI9NXeIYUTKbEYGFKgjhz3F_qXMn0CDpdgtX&_nc_ohc=VA4tw0aACq8Q7kNvwFfHRlU&_nc_oc=AdlIrMJlCThqpKBd-aFsnxqJMXNVRdIbZ5PX5DJDS3J_SAls66YA58qTARe6bbYNHkLRkW_7Z4ejyKgbHRkggrhX&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=jBBWXzh8bD5G0TcC1s_D9Q&oh=00_AfTrqVzguKOwdwAHiflehXfjzeXETwAmBqrgL_6kP1T7zQ&oe=687429E0",
    category: "other",
    status: "approved",
    createdBy: "O002",
  },
  {
    id: 8,
    title:
      'ATTACKER 2025: "ARE YOU AN INNOVATOR? WE\'RE YOUR INVESTORS"] - CHÍNH THỨC BẮT ĐẦU VÒNG 2: INNOVATION CONCEPTION',

    date: "2025-08-20",
    endDate: "2025-08-20",
    location: "Hội trường D, Tòa nhà chính",
    limitNumber: 100,
    deadlineCancel: "2025-08-18",
    description:
      "Vòng 2 của cuộc thi FTC Attack 2025. Các bạn sẽ được tham gia vào các cuộc thi về Innovation Concept, Design Thinking, và Pitch Presentation. Đây là cơ hội để bạn thể hiện khả năng sáng tạo và độc lập tư duy.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia ATTACKER 2025. Chi tiết sự kiện:\n- Thời gian: 20/08/2025\n- Địa điểm: Hội trường D\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/512191284_1122570639898696_6220369985954864254_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF9X13qAynXxgxe-CZasiQ8ZqGPrWzsuthmoY-tbOy62K1lOzV9ak-8bkVaxwlB6qlZWKt0pPum4MtkHRgZVall&_nc_ohc=bRmCT9JQ5nsQ7kNvwHUQRQs&_nc_oc=AdmavNe8uj8yMyxoJKOi_dwakC54s6roo4AwJoQdh8Z6NpGJ2hSx7yDGVy2d7bm66IBOXjE4HNQRWE--Z4YABhMk&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=EqPl2a2Z1XQTjWVlmEM8rQ&oh=00_AfQJu64mNTZMxRzrH8UT1FVpxoatSLFf4-4PwkWAmjf2_Q&oe=68744245",
    category: "academic",
    status: "approved",
    createdBy: "O002",
  },
  {
    id: 9,
    title: 'GIẢI BÓNG ĐÁ "UEL CUP 2025"',

    date: "2025-03-15",
    endDate: "2025-03-15",
    location: "Sân vận động UEL",
    limitNumber: 100,
    deadlineCancel: "2025-03-13",
    description:
      "Giải bóng đá UEL Cup là một sự kiện thường niên giữa các đội bóng của trường. Đây là cơ hội để các bạn thể hiện khả năng thể thao và đội hình của mình.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia GIẢI BÓNG ĐÁ UEL CUP 2025. Chi tiết sự kiện:\n- Thời gian: 15/03/2025\n- Địa điểm: Sân vận động UEL\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/500089850_1207570287822997_2700129082110896156_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHm5VJcAwRaOaeXIRHmUxvYg5nY-SrVj9GDmdj5KtWP0QNrS3nkoOBvIB0TR9roT4C-YaEqvBwNxAGJGUGXYMbT&_nc_ohc=QM1xgMTVVocQ7kNvwHwo6G_&_nc_oc=AdnRBjvC5IM18C_YKGND1Drdw_gjsTBaTsd8dy8D5dL1RxxffxHyRSMWefFDlQOryuSbKEZngRCC6Oga4oWaR6Pd&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=negI1n0pLtxlMJUGJnwlHQ&oh=00_AfTQXvDUf9Reea23fZN5XXu48_utvkKipW-gRKHG3KlGJA&oe=6876F81A",
    category: "sport",
    status: "approved",
    createdBy: "U002",
  },
  {
    id: 10,
    title:
      "CHUỖI HOẠT ĐỘNG CHI ĐOÀN VUI TRẺ SÁNG TẠO NĂM 2025: HOẠT ĐỘNG “DẤU ẤN LỊCH SỬ - NGÀY VỀ CHIẾN KHU”",

    date: "2025-04-20",
    endDate: "2025-04-20",
    location: "Hội trường E, Tòa nhà chính",
    limitNumber: 500,
    deadlineCancel: "2025-04-18",
    description:
      "Lễ hội văn hóa dân tộc là một ngày đặc biệt để tôn vinh và phát huy truyền thống văn hóa của các dân tộc trong nước. Các hoạt động bao gồm: trình diễn văn nghệ, đọc sách, tham quan các di tích lịch sử, tham gia các trò chơi truyền thống.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia LỄ HỘI VĂN HÓA DÂN TỘC. Chi tiết sự kiện:\n- Thời gian: 20/04/2025\n- Địa điểm: Hội trường E\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/495589707_1235606505241588_5757574094014420243_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHNc8YNMJhU6pNdOZz0c3Fj3I0o5hgrXfDcjSjmGCtd8IYjZepkcY1gkhdLDf0t4JbjkZXsmRv9Di5mgsy_rxtt&_nc_ohc=I2zHdYawiXkQ7kNvwEvnD2t&_nc_oc=AdnhzcyuNXteggU6eSIbDA3qnqe9hxtPj9P22Ge8jDnMjECZYAnEMyLC2jPCFJQMHjrpR1M2OUSPqDZbMQpcFH1K&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=6Tz82DuDiqG9cZ9EEfmWAw&oh=00_AfQXrJGDicF8Gg_Mrnkavt7cnnw4L4U1RjWIZJaD5SahHA&oe=687700C0",
    category: "cultural",
    status: "approved",
    createdBy: "U003", // Đoàn Thanh niên UEL
  },
  // Additional approved events to reach 20+ events
  {
    id: 11,
    title:
      "CHÍNH THỨC PHÁT ĐỘNG CUỘC THI CHIẾN LƯỢC XUYÊN BIÊN GIỚI XII - SCHALLENGE 2024 VỚI CHỦ ĐỀ: “CHUỖI CUNG ỨNG BỀN VỮNG”",

    date: "2024-12-15",
    endDate: "2024-12-15",
    location: "Hội trường F, Tòa nhà chính",
    limitNumber: 100,
    deadlineCancel: "2024-12-13",
    description:
      "Hội thảo nhằm giới thiệu và thảo luận về Blockchain và Cryptocurrency. Các chủ đề bao gồm: Khái niệm về Blockchain, ứng dụng trong các lĩnh vực khác nhau, và các vấn đề pháp lý liên quan.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia HỘI THẢO BLOCKCHAIN VÀ CRYPTOCURRENCY TRONG THỜI ĐẠI SỐ. Chi tiết sự kiện:\n- Thời gian: 15/12/2024\n- Địa điểm: Hội trường F\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://advertisingvietnam.com/cdn-cgi/image/width=1440,height=756,quality=90,fit=cover,format=auto/https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=b212f976-a2d3-4457-acab-3aa3369d1c61",
    category: "academic",
    status: "approved",
    createdBy: "O003",
  },
  {
    id: 12,
    title: 'GIẢI BÓNG CHUYỀN SINH VIÊN TOÀN QUỐC 2023 | THÔNG BÁO GIẢI ĐẤU"',

    date: "2025-02-25",
    endDate: "2025-02-25",
    location: "Sân vận động UEL",
    limitNumber: 80,
    deadlineCancel: "2025-02-23",
    description:
      "Giải bóng chuyền UEL là một sự kiện thường niên giữa các đội bóng của trường. Đây là cơ hội để các bạn thể hiện khả năng thể thao và đội hình của mình.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia GIẢI BÓNG CHUYỀN UEL VOLLEYBALL CHAMPIONSHIP 2025. Chi tiết sự kiện:\n- Thời gian: 25/02/2025\n- Địa điểm: Sân vận động UEL\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://ctsv.ntt.edu.vn/wp-content/uploads/2023/10/393010693_758385062994540_7808959661097804803_n.jpg",
    category: "sport",
    status: "approved",
    createdBy: "O003",
  },
  {
    id: 13,
    title: 'CUỘC THI NHIẾP ẢNH "MOMENT OF UEL"',

    date: "2025-01-05",
    endDate: "2025-01-05",
    location: "Hội trường G, Tòa nhà chính",
    limitNumber: 100,
    deadlineCancel: "2025-01-03",
    description:
      "Cuộc thi nhiếp ảnh Moment of UEL là một sự kiện để các bạn thể hiện khả năng sáng tạo và kỹ thuật chụp ảnh của mình.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia CUỘC THI NHIẾP ẢNH MOMENT OF UEL. Chi tiết sự kiện:\n- Thời gian: 05/01/2025\n- Địa điểm: Hội trường G\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://dankogroup.com.vn/pic/News/cuoc-thi-_637607569928027490_HasThumb.jpg",
    category: "cultural",
    status: "approved",
    createdBy: "O003",
  },
  {
    id: 14,
    title: 'WORKSHOP "DIGITAL MARKETING TRENDS 2025"',

    date: "2025-01-18",
    endDate: "2025-01-18",
    location: "Hội trường H, Tòa nhà chính",
    limitNumber: 150,
    deadlineCancel: "2025-01-16",
    description:
      "Workshop nhằm giới thiệu và thảo luận về xu hướng Digital Marketing. Các chủ đề bao gồm: Tổng quan về Digital Marketing, các kênh quảng cáo hiệu quả, và cách định hướng chiến lược quảng cáo.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia WORKSHOP DIGITAL MARKETING TRENDS 2025. Chi tiết sự kiện:\n- Thời gian: 18/01/2025\n- Địa điểm: Hội trường H\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://res.cloudinary.com/mtm-agency/image/fetch/f_auto,q_auto/https://themtmagency.com/upload/media/_1290x725_crop_center-center_82_line/2025MarketingTrendsV3.jpg",
    category: "academic",
    status: "approved",
    createdBy: "O003",
  },
  {
    id: 15,
    title: 'CHƯƠNG TRÌNH THIỆN NGUYỆN "WARMTH FOR WINTER"',

    date: "2024-12-10",
    endDate: "2024-12-10",
    location: "Hội trường I, Tòa nhà chính",
    limitNumber: 200,
    deadlineCancel: "2024-12-08",
    description:
      "Chương trình thiện nguyện Warmth for Winter là một sự kiện để đội tình nguyện UEL tập hợp và phân phối quà tặng cho các bạn nghèo vào mùa đông. Các hoạt động bao gồm: tặng quà, khám bệnh miễn phí, và các hoạt động thiện nguyện khác.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia CHƯƠNG TRÌNH THIỆN NGUYỆN WARMTH FOR WINTER. Chi tiết sự kiện:\n- Thời gian: 10/12/2024\n- Địa điểm: Hội trường I\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image: "https://i.ytimg.com/vi/kgTzVmvlQrY/maxresdefault.jpg",
    category: "community",
    status: "approved",
    createdBy: "U001",
  },
  {
    id: 16,
    title: 'HỘI THẢO "AI IN EDUCATION - TƯƠNG LAI GIÁO DỤC"',

    date: "2025-01-22",
    endDate: "2025-01-22",
    location: "Hội trường J, Tòa nhà chính",
    limitNumber: 100,
    deadlineCancel: "2025-01-20",
    description:
      "Hội thảo nhằm giới thiệu và thảo luận về ứng dụng công nghệ AI trong giáo dục. Các chủ đề bao gồm: Ứng dụng AI trong việc tự động hóa các quá trình dạy học, tạo ra nội dung động và tương tác, và các vấn đề pháp lý liên quan.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia HỘI THẢO AI IN EDUCATION - TƯƠNG LAI GIÁO DỤC. Chi tiết sự kiện:\n- Thời gian: 22/01/2025\n- Địa điểm: Hội trường J\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://caohoc.fpt.edu.vn/wp-content/uploads/2024/03/1920x1080px-thumbnail-web.png",
    category: "academic",
    status: "approved",
    createdBy: "U001",
  },
  {
    id: 17,
    title: 'FESTIVAL ẨM THỰC "TASTE OF VIETNAM"',

    date: "2025-03-08",
    endDate: "2025-03-08",
    location: "Hội trường K, Tòa nhà chính",
    limitNumber: 300,
    deadlineCancel: "2025-03-06",
    description:
      "Festival ẩm thực Taste of Vietnam là một sự kiện để các bạn thưởng thức và khám phá các món ăn đặc sản của các vùng miền trong nước. Các hoạt động bao gồm: ăn uống, tham quan các trung tâm ẩm thực, và các trò chơi vui chơi.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia FESTIVAL ẨM THỰC TASTE OF VIETNAM. Chi tiết sự kiện:\n- Thời gian: 08/03/2025\n- Địa điểm: Hội trường K\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://i.pinimg.com/736x/93/ad/ea/93adeae4837e22c3a492324a4b7fb98e.jpg",
    category: "cultural",
    status: "approved",
    createdBy: "U001",
  },
  {
    id: 18,
    title: 'GIẢI MARATHON "RUN FOR HEALTH 2025"',

    date: "2025-02-16",
    endDate: "2025-02-16",
    location: "Sân vận động UEL",
    limitNumber: 150,
    deadlineCancel: "2025-02-14",
    description:
      "Giải Marathon Run for Health là một sự kiện thường niên giữa các bạn yêu thích chạy bộ. Đây là cơ hội để các bạn thể hiện khả năng chịu đựng và đội hình của mình.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia GIẢI MARATHON RUN FOR HEALTH 2025. Chi tiết sự kiện:\n- Thời gian: 16/02/2025\n- Địa điểm: Sân vận động UEL\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://file.hstatic.net/200000563747/file/-tet-run-mien-nam-2025-t1_e9e3cb9829114e519085c9e77d83a66c_grande.png",
    category: "sport",
    status: "approved",
    createdBy: "U001",
  },
  {
    id: 19,
    title: 'SEMINAR "STARTUP ECOSYSTEM IN VIETNAM"',

    date: "2025-01-30",
    endDate: "2025-01-30",
    location: "Hội trường L, Tòa nhà chính",
    limitNumber: 100,
    deadlineCancel: "2025-01-28",
    description:
      "Seminar nhằm giới thiệu và thảo luận về Ecosystem Startup trong Việt Nam. Các chủ đề bao gồm: Tổng quan về Ecosystem Startup, các cơ hội đầu tư, và các vấn đề pháp lý liên quan.",
    emailTemplate:
      "Kính chào Anh/Chị,\n\nChúng tôi xin gửi lời cảm ơn và xác nhận đăng ký tham gia SEMINAR STARTUP ECOSYSTEM IN VIETNAM. Chi tiết sự kiện:\n- Thời gian: 30/01/2025\n- Địa điểm: Hội trường L\n\nVui lòng có mặt đúng giờ.\n\nTrân trọng!",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.jmxSxVDSgghzDMfyArD84gHaDv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "academic",
    status: "approved",
    createdBy: "U001",
  },
];

// Category mapping for display
export const categoryLabels = {
  all: "All events",
  academic: "Academic",
  sport: "Sport",
  cultural: "Cultural and artistic",
  community: "Community",
  other: "Other",
};
