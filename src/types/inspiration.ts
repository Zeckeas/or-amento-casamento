export interface InspirationItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  description?: string;
  tags: string[];
  favorite: boolean;
}

export type InspirationCategory = {
  id: string;
  name: string;
  slug: string;
};