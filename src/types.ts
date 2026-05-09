export interface Dish {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  gradient: string;
  image?: string;
  ingredients?: string[];
  style?: string;
  origin?: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface Table {
  id: string;
  label: string;
  position: [number, number, number];
  seats: number;
  status: 'available' | 'reserved';
  area: string;
  note: string;
  floor?: number;
}

export interface Award {
  icon: string;
  number: string;
  title: string;
  description: string;
}
