import type { Product } from '../types/Product';

const fallbackCatalog: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'A durable backpack for everyday travel and work with room for a laptop and essentials.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description:
      'Lightweight slim fit tee that works well on its own or layered under a jacket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'Classic cotton jacket with multiple pockets and a versatile everyday fit.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'Soft v-neck knit with a slim silhouette made for casual daily wear.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      'Statement bracelet with gold and silver details inspired by traditional dragon motifs.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave',
    price: 168,
    description:
      'Delicate solid gold ring accented with micropave stones for a refined finish.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 9,
    title: 'SanDisk SSD PLUS 1TB Internal SSD',
    price: 109,
    description:
      'Fast SATA solid state drive with improved boot speed and responsive storage performance.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 10,
    title: 'Silicon Power 256GB SSD 3D NAND A55',
    price: 109,
    description:
      'Reliable internal SSD designed for desktop or laptop upgrades with solid endurance.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      'Water resistant winter jacket with a layered design for comfort in cold weather.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      'Moto jacket with a removable hood, soft lining, and a fitted casual silhouette.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    rating: { rate: 2.9, count: 340 },
  },
];

export default fallbackCatalog;
