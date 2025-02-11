export interface PricingPlan {
   id: string;
   title: string;
   description: string;
   price: number;
   features: string[];
   is_active: boolean;
}
