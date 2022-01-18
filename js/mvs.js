
var listMV = [
  {
      name: "Một Bước Yêu Vạn Dặm Đau",
      author: ["Mr. Siro"],
      time: "11:54",
      authorAvatar: "img/mvArtists/artist1.jpg",
      image: "img/MVs/mv1.jpg",
      margin: "ms-0",
  },
  {
      name: "Simple Love",
      author: ["Obito", "Seachains", "Davis"],
      time: "03:54",
      authorAvatar: "img/mvArtists/artist2.jpg",
      image: "img/MVs/mv2.jpg"
  },
  {
      name: "Lời Yêu Ngây Dại",
      author: ["Kha"],
      time: "04:33",
      authorAvatar: "img/mvArtists/artist3.png",
      image: "img/MVs/mv3.jpeg"
  },
  {
      name: "24H",
      author: ["LyLy", "Magazine"],
      time: "04:18",
      authorAvatar: "img/mvArtists/artist4.jpg",
      image: "img/MVs/mv4.jpg"
  },
  {
      name: "Nước Mắt Em Lau Bằng Tình Yêu Mới",
      author: ["Da LAB", "Tóc Tiên"],
      time: "05:45",
      authorAvatar: "img/mvArtists/artist5.jpg",
      image: "img/MVs/mv5.jpg"
  },

  {
      name: "Yêu Đơn Phương",
      author: ["OnlyC", "Karik"],
      time: "05:02",
      authorAvatar: "img/mvArtists/artist6.jpg",
      image: "img/MVs/mv6.jpg"
  },
  {
      name: "Phía Sau Em",
      author: ["Kay Trần", "Binz"],
      time: "04:06",
      authorAvatar: "img/mvArtists/artist7.jpg",
      image: "img/MVs/mv7.jpg"
  },
  {
      name: "Mình Yêu nhau đi",
      author: ["Bích Phương"],
      time: "03:52",
      authorAvatar: "img/mvArtists/artist8.jpg",
      image: "img/MVs/mv8.jpg"
  },
  {
      name: "Đừng Về Trễ (Acoustic Version)",
      author: ["Sơn Tùng MTP"],
      time: "04:41",
      authorAvatar: "img/mvArtists/artist9.jpg",
      image: "img/MVs/mv9.jpg"
  },
  {
      name: "Hơn Cả Yêu",
      author: ["Đức Phúc"],
      time: "05:43",
      authorAvatar: "img/mvArtists/artist10.jpg",
      image: "img/MVs/mv10.jpg"
  },
  {
      name: "Vì Yêu Cứ Đâm Đầu",
      author: ["MIN", "Đen", "JustaTee"],
      time: "04:01",
      authorAvatar: "img/mvArtists/artist11.jpg",
      image: "img/MVs/mv11.jpg"
  },
  {
      name: "Sao Anh Chưa Về Nhà",
      author: ["AMEE", "Ricky Star"],
      time: "04:36",
      authorAvatar: "img/mvArtists/artist12.jpg",
      image: "img/MVs/mv12.jpg"},
  {
      name: "Bigcityboi",
      author: ["Binz", "Touliver"],
      time: "03:43",
      authorAvatar: "img/mvArtists/artist13.jpg",
      image: "img/MVs/mv13.jpg"
  },
  {
      name: "Em Không Sai Chúng Ta Sai",
      author: ["ERIK"],
      time: "06:28",
      authorAvatar: "img/mvArtists/artist14.jpg",
      image: "img/MVs/mv14.jpg"
  },
];

const MV_STORAGE_KEY = 'VIK_MV';

localStorage.setItem(MV_STORAGE_KEY, JSON.stringify(listMV));