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
  rental: [
    {
      id: 1,
      content: `
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th>Thứ</th>
            <th>Khung giờ</th>
            <th>Cố định</th>
            <th>Vãng lai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2"><strong>Thứ 2</strong></td>
            <td>05:00 - 16:00</td>
            <td align="right">60.000 đ</td>
            <td align="right">70.000 đ</td>
          </tr>
          <tr>
            <td>16:00 - 22:00</td>
            <td align="right">90.000 đ</td>
            <td align="right">100.000 đ</td>
          </tr>
          <tr>
            <td rowspan="2"><strong>Thứ 3</strong></td>
            <td>05:00 - 16:00</td>
            <td align="right">60.000 đ</td>
            <td align="right">70.000 đ</td>
          </tr>
          <tr>
            <td>16:00 - 22:00</td>
            <td align="right">90.000 đ</td>
            <td align="right">100.000 đ</td>
          </tr>
          <tr>
            <td rowspan="2"><strong>Thứ 7</strong></td>
            <td>05:00 - 16:00</td>
            <td align="right">80.000 đ</td>
            <td align="right">90.000 đ</td>
          </tr>
          <tr>
            <td>16:00 - 22:00</td>
            <td align="right">120.000 đ</td>
            <td align="right">140.000 đ</td>
          </tr>
        </tbody>
      </table>`
    }
  ],
  service: [
    { id: 1, name: 'Thuê vợt cầu lông', price: '20.000 đ' },
    { id: 2, name: 'Thuê giày cầu lông', price: '30.000 đ' },
    { id: 3, name: 'Bán cầu lông', price: '50.000 đ/ hộp' },
  ],
  rules: 'Badminton rules involve hitting a shuttlecock over a net, aiming to land it in the opponent\'s court; matches are best-of-three games to 21 points, with rally scoring (a point on every serve) and needing a two-point lead to win (or first to 30 if tied at 29-29). Key rules include serving diagonally, hitting the shuttle only once, not touching the net or lines during the serve, and players changing ends at intervals, with the shuttle not allowed to bounce. ',
  rates: {
    average: 4.8,
    totalRates: 124,
    ratings: [
      { id: 1, user: 'Nguyen Van A', score: 5, comment: 'Sân rất đẹp và nhân viên thân thiện!' },
      { id: 2, user: 'Tran Thi B', score: 4, comment: 'Giá cả hợp lý, sẽ quay lại.' },
      { id: 3, user: 'Le Van C', score: 5, comment: 'Tuyệt vời cho những buổi chơi cầu lông cuối tuần.' },
    ]
  }
};