import { Dish, Award, MenuCategory, Table } from './types';

export const DISHES: Dish[] = [
  {
    id: '1',
    name: 'DRY-AGED WAGYU A5',
    category: 'Signature Entrée',
    description: '45-day aged A5 Wagyu ribeye, roasted bone marrow, truffle jus, wood-fire char',
    price: '$185',
    gradient: 'from-[#1A0F0A] via-[#3D1E14] to-[#6B3020]',
    image: '/images/ember_steak.png',
  },
  {
    id: '2',
    name: 'DOVER SOLE EN PAPILLOTE',
    category: 'Seafood',
    description: 'Whole Dover sole, preserved lemon beurre blanc, caviar, young herbs from our garden',
    price: '$145',
    gradient: 'from-[#0A1015] via-[#1A2835] to-[#2B4A5E]',
    image: '/images/ember_lobster.png',
  },
  {
    id: '3',
    name: 'BLACK TRUFFLE RISOTTO',
    category: 'Tasting Menu',
    description: 'Carnaroli, aged Parmigiano, Périgord black truffle shaved tableside, 36-month Comté',
    price: '$95',
    gradient: 'from-[#100A05] via-[#2A1A0A] to-[#4A2E12]',
  },
  {
    id: '4',
    name: 'HEIRLOOM BEETROOT',
    category: 'Vegetarian',
    description: 'Roasted heritage beet, aged goat cheese mousse, walnut praline, elderflower gel',
    price: '$68',
    gradient: 'from-[#0A100A] via-[#152615] to-[#2A4A2A]',
  },
  {
    id: '5',
    name: 'VALRHONA DARK SPHÈRE',
    category: 'Dessert',
    description: '70% Guanaja chocolate sphere, tonka bean ice cream, blackcurrant coulis, gold leaf',
    price: '$48',
    gradient: 'from-[#150A15] via-[#2A1530] to-[#4A2055]',
    image: '/images/ember_dessert.png',
  },
  {
    id: '6',
    name: 'SMOKED SCALLOPS',
    category: 'Seafood',
    description: 'Hokkaido scallops, citrus glaze, smoked butter, delicate edible flowers',
    price: '$55',
    gradient: 'from-[#1A1A15] via-[#2A2A20] to-[#4A4A35]',
    image: '/images/kaya_scallops.png',
  },
];

export const AWARDS: Award[] = [
  {
    icon: '★',
    number: '3',
    title: 'MICHELIN STARS',
    description: 'Awarded consistently since 2003, recognising cuisine of exceptional quality',
  },
  {
    icon: '◆',
    number: '#4',
    title: 'WORLD\'S BEST',
    description: 'World\'s 50 Best Restaurants — highest ranked American establishment',
  },
  {
    icon: '⚑',
    number: '37',
    title: 'YEARS OPEN',
    description: 'An unbroken legacy of excellence across four decades of fine dining',
  },
  {
    icon: '✦',
    number: '5',
    title: 'JAMES BEARD',
    description: 'Outstanding Restaurant Award — five separate nominations, two wins',
  },
  {
    icon: '◉',
    number: '98',
    title: 'WINE SPECTATOR',
    description: 'Grand Award — cellar of 3,200 labels across 22 wine-producing regions',
  },
  {
    icon: '▲',
    number: '4.9',
    title: 'ZAGAT RATING',
    description: 'Near-perfect score across food, service, décor and overall experience',
  },
];

export const MENU: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Starters & Amuse-Bouche',
    items: [
      { name: 'Oscietra Caviar & Blini', description: '30g Oscietra caviar, warm buckwheat blini, crème fraîche, chives', price: '$145', tags: ['Signature'] },
      { name: 'Foie Gras Torchon', description: '48-hour duck foie gras, Sauternes gelée, brioche toast, smoked salt', price: '$88', tags: ["Chef's Choice"] },
      { name: 'Tuna Crudo', description: 'Bluefin tuna, ponzu, micro shiso, Maldon sea salt, yuzu foam', price: '$72' },
      { name: 'Burrata e Tartufo', description: 'Stracciatella burrata, white truffle oil, heirloom tomato, aged balsamic, basil', price: '$64', tags: ['Vegetarian'] },
    ]
  },
  {
    id: 'mains',
    title: 'Main Courses',
    items: [
      { name: 'Wagyu A5 Ribeye', description: '45-day dry-aged A5, roasted marrow, truffle jus, wood-fired char', price: '$185', tags: ['Signature', 'Bestseller'] },
      { name: 'Dover Sole en Papillote', description: 'Whole Dover sole, preserved lemon beurre blanc, caviar, garden herbs', price: '$145', tags: ['Signature'] },
      { name: 'Rack of Lamb', description: 'Colorado rack, pistachio-herb crust, spring pea purée, rosemary jus', price: '$118' },
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Valrhona Dark Sphère', description: '70% Guanaja chocolate sphere, tonka bean ice cream, blackcurrant coulis, gold leaf', price: '$48', tags: ['Signature'] },
      { name: 'Mille-Feuille', description: 'Caramelised puff pastry, Tahitian vanilla mousseline, salted caramel', price: '$36' },
    ]
  },
  {
    id: 'wines',
    title: 'Wines',
    items: [
      { name: 'Château Margaux 2010', description: 'Premier Grand Cru Classé, Margaux, Bordeaux, France', price: '$1,200', tags: ['Sommelier Selection'] },
      { name: 'Opus One 2018', description: 'Cabernet Sauvignon blend, Napa Valley, California', price: '$650' },
      { name: 'Dom Perignon 2012', description: 'Vintage Champagne, Épernay, France', price: '$450' },
    ]
  },
  {
    id: 'tasting-menu',
    title: 'Tasting Menu',
    items: [
      { name: 'The KAYA Experience', description: 'A 9-course journey through fire and flavor, featuring our most prized ingredients.', price: '$325', tags: ['Signature'] },
      { name: 'Wine Pairing', description: 'Curated wine pairings for each course of The KAYA Experience.', price: '$175' },
    ]
  }
];

export const TABLES: Table[] = [
  // Floor 1
  { id: '1', label: 'T1', position: [-4, 0, -4], seats: 2, status: 'available', area: 'Window', note: 'Romantic window seat, city view', floor: 1 },
  { id: '2', label: 'T2', position: [-1.5, 0, -4], seats: 2, status: 'reserved', area: 'Window', note: 'Reserved for this evening', floor: 1 },
  { id: '3', label: 'T3', position: [-4, 0, -1], seats: 4, status: 'available', area: 'Main', note: 'Central main hall, 4 guests', floor: 1 },
  { id: '4', label: 'T4', position: [-1.5, 0, -1], seats: 4, status: 'available', area: 'Main', note: 'Central main hall, 4 guests', floor: 1 },
  { id: '5', label: 'T5', position: [1, 0, -1], seats: 4, status: 'reserved', area: 'Main', note: 'Reserved for this evening', floor: 1 },
  { id: '6', label: 'T6', position: [3, 0, -4], seats: 6, status: 'available', area: 'Alcove', note: 'Private alcove, 6 guests', floor: 1 },
  { id: '7', label: 'T7', position: [5.5, 0, -4], seats: 6, status: 'reserved', area: 'Alcove', note: 'Reserved for this evening', floor: 1 },
  { id: '8', label: 'T8', position: [4, 0, 1.5], seats: 8, status: 'available', area: 'Private', note: 'Semi-private booth, 8 guests', floor: 1 },
  { id: '9', label: 'T9', position: [1, 0, 4], seats: 2, status: 'available', area: 'Bar', note: "Chef's counter, bar seating", floor: 1 },
  { id: '10', label: 'T10', position: [-2, 0, 4], seats: 4, status: 'available', area: 'Garden', note: 'Near the garden entrance', floor: 1 },
  // Floor 2
  { id: '11', label: 'T11', position: [-4, 0, -4], seats: 2, status: 'available', area: 'Balcony', note: 'Balcony view', floor: 2 },
  { id: '12', label: 'T12', position: [-1.5, 0, -4], seats: 2, status: 'reserved', area: 'Balcony', note: 'Reserved', floor: 2 },
  { id: '13', label: 'T13', position: [-4, 0, -1], seats: 4, status: 'available', area: 'Lounge', note: 'VIP Lounge', floor: 2 },
  { id: '14', label: 'T14', position: [-1.5, 0, -1], seats: 4, status: 'available', area: 'Lounge', note: 'VIP Lounge', floor: 2 },
  { id: '15', label: 'T15', position: [1, 0, -1], seats: 6, status: 'reserved', area: 'Lounge', note: 'Reserved', floor: 2 },
  { id: '16', label: 'T16', position: [3, 0, -4], seats: 2, status: 'available', area: 'Corner', note: 'Quiet corner', floor: 2 },
];
