export interface Article {
   id: string;
   title: string;
   content: string;
   published_at: string;
   is_published: boolean;
}

export interface PricingPlan {
   id: string;
   title: string;
   description: string;
   price: number;
   features: string[];
   is_active: boolean;
}
