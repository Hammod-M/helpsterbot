export interface UserProfile {
   id: number;
   telegram_id: string | null;
   subscribe: string;
   subscribe_time: string;
   model_using: string;
   prefix: string | null;
   voice_model: string;
   created_at: string;
   updated_at: string;
   message_count: string;
   message_month: string;
   email?: string;
   username?: string;
}

export interface PromoResponse {
   is_valid: boolean;
   discount: number;
   code: string;
}

export interface UpdateProfileDto {
   subscribe?: string;
   model_using?: string;
   subscribe_time?: string;
   prefix?: string;
   voice_model?: string;
   email?: string;
   username?: string;
}
