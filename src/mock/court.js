export const courtList = [
  {
    id: 1,
    name: 'Sân cầu lông VA Pro',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    openHours: '06:00 - 22:00',
    logo: 'https://cdn-icons-png.flaticon.com/128/5968/5968507.png',
    thumbnail: 'https://n7media.coolmate.me/image/June2025/san-cau-long-hoang-mai-5.jpg',
  },
  {
    id: 2,
    name: 'Sân cầu lông Mini Star',
    address: '456 Đường Nguyễn Trãi, Quận 5, TP.HCM',
    openHours: '07:00 - 23:00',
    logo: 'https://cdn-icons-png.flaticon.com/128/1051/1051277.png',
    thumbnail: 'https://www.decathlon.vn/blog/wp-content/uploads/2025/05/11-san-cau-long-quan-7.png',
  },
  {
    id: 3,
    name: 'Sân cầu lông Victory',
    address: '789 Đường Phạm Văn Đồng, Quận Thủ Đức, TP.HCM',
    openHours: '05:00 - 21:00',
    logo: 'https://cdn-icons-png.flaticon.com/128/919/919826.png',
    thumbnail: 'https://static.fbshop.vn/wp-content/uploads/2024/06/image-83-1024x576.png',
  },
  {
    id: 4,
    name: 'Sân cầu lông Hoàng Gia',
    address: '321 Đường Trần Hưng Đạo, Quận 3, TP.HCM',
    openHours: '06:30 - 22:30',
    logo: 'https://cdn-icons-png.flaticon.com/128/3884/3884552.png',
    thumbnail: 'https://thethaophongson.vn/image/images/VBA03810.jpg',
  }
];

export const courtItem = {
  id: 1,
  name: 'Sân cầu lông VA Pro',
  address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
  phone: '0909123456',
  rating: 4.8,
  openHours: '06:00 - 22:00',
  logo: 'https://cdn-icons-png.flaticon.com/128/5968/5968507.png',
  thumbnail: 'https://n7media.coolmate.me/image/June2025/san-cau-long-hoang-mai-5.jpg',
  imgs: [
    'https://hvshop.vn/wp-content/uploads/2024/10/san-cau-long-duc-thao-6.webp',
    'https://hvshop.vn/wp-content/uploads/2024/10/san-cau-long-duc-thao-7.webp',
    'https://hvshop.vn/wp-content/uploads/2024/10/san-cau-long-duc-thao.webp'
  ],
  rental: `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th>Thứ</th>
          <th>Khung giờ</th>
          <th>Cố định</th>
          <th>Vãng lai</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td rowspan="2"><strong>Thứ 2</strong></td>
          <td>05:00 - 16:00</td>
          <td>60.000 đ</td>
          <td>70.000 đ</td>
        </tr>
        <tr>
          <td>16:00 - 22:00</td>
          <td>90.000 đ</td>
          <td>100.000 đ</td>
        </tr>
        <tr>
          <td rowspan="2"><strong>Thứ 3</strong></td>
          <td>05:00 - 16:00</td>
          <td>60.000 đ</td>
          <td>70.000 đ</td>
        </tr>
        <tr>
          <td>16:00 - 22:00</td>
          <td>90.000 đ</td>
          <td>100.000 đ</td>
        </tr>
        <tr>
          <td rowspan="2"><strong>Thứ 7</strong></td>
          <td>05:00 - 16:00</td>
          <td>80.000 đ</td>
          <td>90.000 đ</td>
        </tr>
        <tr>
          <td>16:00 - 22:00</td>
          <td>120.000 đ</td>
          <td>140.000 đ</td>
        </tr>
      </tbody>
    </table>`,
  services:`
  <table style="width:100%; border-collapse:collapse;">
    <tr>
      <td style="padding-block:8px;">
        Ống cầu Yonex
      </td>
      <td style="padding-block:8px; text-align:right;">
        320.000đ
      </td>
    </tr>
    <tr>
      <td style="padding-block:8px;">
        Ống cầu Victor
      </td>
      <td style="padding-block:8px; text-align:right;">
        290.000đ
      </td>
    </tr>
    <tr>
      <td style="padding-block:8px;">
        Thuê vợt cầu lông
      </td>
      <td style="padding-block:8px; text-align:right;">
        30.000đ / trận
      </td>
    </tr>
    <tr>
      <td style="padding-block:8px;">
        Nước suối / Trà đá
      </td>
      <td style="padding-block:8px; text-align:right;">
        10.000đ
      </td>
    </tr>
  </table>`,
  rules: 'Badminton rules involve hitting a shuttlecock over a net, aiming to land it in the opponent\'s court; matches are best-of-three games to 21 points, with rally scoring (a point on every serve) and needing a two-point lead to win (or first to 30 if tied at 29-29). Key rules include serving diagonally, hitting the shuttle only once, not touching the net or lines during the serve, and players changing ends at intervals, with the shuttle not allowed to bounce. ',
  rates: {
    average: 4.8,
    totalRates: 3,
    ratings: [
      { id: 1, avatar: 'https://cdn-icons-png.flaticon.com/128/4727/4727424.png', user: 'Nguyen Van A', score: 5.0, comment: 'Sân rất đẹp và nhân viên thân thiện!' },
      { id: 2, avatar: 'https://cdn-icons-png.flaticon.com/128/4727/4727424.png', user: 'Tran Thi B', score: 4.5, comment: 'Giá cả hợp lý, sẽ quay lại.' },
      { id: 3, avatar: 'https://cdn-icons-png.flaticon.com/128/4727/4727424.png', user: 'Le Van C', score: 3, comment: 'Sân cầu lông sạch sẽ, trần cao, ánh sáng tốt. Sàn không trơn trượt, đánh lâu không bị mỏi chân. Có chỗ để xe rộng, nước uống đầy đủ. Mình đánh ở đây thường xuyên. Sân ổn định, giờ cao điểm hơi đông nhưng quản lý sắp xếp khá tốt. Sẽ quay lại.' },
    ]
  }
};