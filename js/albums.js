var listAlbum = [
  {
      name: "Golden Hour",
      image: "img/albums/album1.jpg",
      margin: "ms-0",
  },
  {
      name: "Boycold (Mini Album)",
      image: "img/albums/album2.jpg"
  },
  {
      name: "Red",
      image: "img/albums/album3.jpg"
  },
  {
      name: "Người Yêu Cũ (Gửi Cho Anh 2) (Mini Album)",
      image: "img/albums/album4.jpg"
  },
  {
      name: "Querencia (Mini Album)",
      image: "img/albums/album5.jpg"
  },
  {
      name: "Justice (Mini Album)",
      image: "img/albums/album6.jpg"
  },
  {
      name: "Teenage Dream",
      image: "img/albums/album7.jpg"
  },
  {
      name: "The Off Season",
      image: "img/albums/album8.png"
  },
  {
      name: "The Album",
      image: "img/albums/album9.jpg"
  },
  {
      name: "Random Access Memories",
      image: "img/albums/album10.jpg"
  },
  {
      name: "Map of the Soul: 7",
      image: "img/albums/album11.png"
  },
  {
      name: "Chromatica",
      image: "img/albums/album12.jpg"},
   {
       name: "My Turn",
      image: "img/albums/album13.jpg"
  },
  {
      name: "Meet the Woo 2",
      image: "img/albums/album14.jpg"
  },
  {
      name: "Lemonade",
      image: "img/albums/album15.jpg"
  },
];

const ALBUM_STORAGE_KEY = 'VIK_ALBUM';

localStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(listAlbum));
