import type { MenuItem } from './types';

export const MENU: MenuItem[] = [
  { id: 's1', cat: 'Starters', name: 'Chicken Malai Tikka', desc: 'Tender chicken in cream marinade, tandoor grilled', price: 950, tag: 'sig' },
  { id: 's2', cat: 'Starters', name: 'Crispy Calamari', desc: 'Lemon aioli, sea salt, fresh herbs', price: 780, tag: '' },
  { id: 's3', cat: 'Starters', name: 'Paneer Tikka', desc: 'Cottage cheese, bell pepper, spiced glaze', price: 720, tag: 'veg' },
  { id: 's4', cat: 'Starters', name: 'Mutton Seekh', desc: 'Minced lamb, coriander, charcoal smoke', price: 1100, tag: 'spicy' },
  { id: 's5', cat: 'Starters', name: 'Garlic Mushrooms', desc: 'Sautéed, cream, toasted sourdough', price: 650, tag: 'veg' },
  { id: 'm1', cat: 'Mains', name: 'Kaya Signature Karahi', desc: 'Slow-cooked lamb, fresh tomatoes, whole spices', price: 2200, tag: 'sig' },
  { id: 'm2', cat: 'Mains', name: 'Grilled Sea Bass', desc: 'Lemon caper butter, sautéed greens, herbed rice', price: 2800, tag: '' },
  { id: 'm3', cat: 'Mains', name: 'Butter Chicken', desc: 'Classic, rich tomato fenugreek sauce', price: 1800, tag: '' },
  { id: 'm4', cat: 'Mains', name: 'Daal Makhani', desc: 'Black lentils, cream, overnight cooked', price: 1200, tag: 'veg' },
  { id: 'm5', cat: 'Mains', name: 'Mutton Raan', desc: 'Slow-roasted whole leg, saffron glaze', price: 3500, tag: 'sig' },
  { id: 'm6', cat: 'Mains', name: 'Vegetable Biryani', desc: 'Fragrant basmati, whole spices, raita', price: 1100, tag: 'veg' },
  { id: 'b1', cat: 'Breads', name: 'Garlic Naan', desc: 'Fresh from the tandoor, garlic butter', price: 180, tag: 'veg' },
  { id: 'b2', cat: 'Breads', name: 'Laccha Paratha', desc: 'Layered, pan-fried, whole wheat', price: 160, tag: 'veg' },
  { id: 'b3', cat: 'Breads', name: 'Peshwari Naan', desc: 'Coconut, almond, raisin stuffed', price: 220, tag: 'veg' },
  { id: 'b4', cat: 'Breads', name: 'Tandoori Roti', desc: 'Whole wheat, clay oven', price: 120, tag: 'veg' },
  { id: 'd1', cat: 'Desserts', name: 'Gulab Jamun', desc: 'Warm, rose syrup, vanilla ice cream', price: 480, tag: '' },
  { id: 'd2', cat: 'Desserts', name: 'Shahi Tukra', desc: 'Bread pudding, condensed milk, pistachios', price: 520, tag: 'sig' },
  { id: 'd3', cat: 'Desserts', name: 'Chocolate Lava Cake', desc: 'Dark chocolate, vanilla gelato', price: 680, tag: '' },
  { id: 'd4', cat: 'Desserts', name: 'Kulfi', desc: 'Traditional frozen, malai, cardamom', price: 380, tag: 'veg' },
  { id: 'dr1', cat: 'Drinks', name: 'Fresh Lime Soda', desc: 'Sweet / salty / mix', price: 280, tag: '' },
  { id: 'dr2', cat: 'Drinks', name: 'Mango Lassi', desc: 'Fresh mango, yogurt, cardamom', price: 320, tag: 'veg' },
  { id: 'dr3', cat: 'Drinks', name: 'Rose Sharbat', desc: 'House-made, chilled', price: 250, tag: 'veg' },
  { id: 'dr4', cat: 'Drinks', name: 'Mineral Water', desc: 'Still or sparkling, 500ml', price: 150, tag: '' },
  { id: 'dr5', cat: 'Drinks', name: 'Masala Chai', desc: 'Spiced milk tea, pot', price: 280, tag: 'veg' },
];

export const CATEGORIES = ['All', ...new Set(MENU.map(m => m.cat))];
export const TAX_RATE = 0.17;
export const SERVICE_CHARGE = 0.05;
