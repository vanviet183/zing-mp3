const listThemes = [
  {
      type: 'Chủ đề',
      themes: [
          {
              name: 'Zing Music Awards',
              image: 'img/modalThemes/modalTheme1/theme1.jpg'
          },
          {
              name: 'Tháp Eiffel',
              image: 'img/modalThemes/modalTheme1/theme2.jpg'
          },
      ]
  },
  {
      type: 'Nghệ Sĩ',
      themes: [
          {
              name: 'Rosé',
              image: 'img/modalThemes/modalTheme2/theme1.jpg'
          },
          {
              name: 'IU',
              image: 'img/modalThemes/modalTheme2/theme2.jpg'
          },
          {
              name: 'Ji Chang Wook',
              image: 'img/modalThemes/modalTheme2/theme3.jpg'
          },
          {
              name: 'Lisa',
              image: 'img/modalThemes/modalTheme2/theme4.jpg'
          },
          {
              name: 'Jennie Kim',
              image: 'img/modalThemes/modalTheme2/theme5.jpg'
          },
          {
              name: 'Jisoo',
              image: 'img/modalThemes/modalTheme2/theme6.jpg'
          },
      ]
  },
  {
      type: 'Màu Tối',
      themes: [
          {
              name: 'Tối',
              image: 'img/modalThemes/modalTheme3/theme1.jpg'
          },
          {
              name: 'Tím',
              image: 'img/modalThemes/modalTheme3/theme2.jpg'
          },
          {
              name: 'Xanh Đậm',
              image: 'img/modalThemes/modalTheme3/theme3.jpg'
          },
          {
              name: 'Xanh Biển',
              image: 'img/modalThemes/modalTheme3/theme4.jpg'
          },
          {
              name: 'Xanh Lá',
              image: 'img/modalThemes/modalTheme3/theme5.jpg'
          },
          {
              name: 'Nâu',
              image: 'img/modalThemes/modalTheme3/theme6.jpg'
          },
          {
              name: 'Hồng',
              image: 'img/modalThemes/modalTheme3/theme7.jpg'
          },
          {
              name: 'Đỏ',
              image: 'img/modalThemes/modalTheme3/theme8.jpg'
          },
      ]
  },
  {
      type: 'Màu Sáng',
      themes: [
          {
              name: 'Sáng',
              image: 'img/modalThemes/modalTheme4/theme1.jpg'
          },
          {
              name: 'Xám',
              image: 'img/modalThemes/modalTheme4/theme2.jpg'
          },
          {
              name: 'Xanh Nhạt',
              image: 'img/modalThemes/modalTheme4/theme3.jpg'
          },
          {
              name: 'Hồng Cánh Sen',
              image: 'img/modalThemes/modalTheme4/theme4.jpg'
          },
      ]
  },
]


const THEME_LIST_STORAGE_KEY = 'VIK_THEME_LIST';

localStorage.setItem(THEME_LIST_STORAGE_KEY, JSON.stringify(listThemes));
