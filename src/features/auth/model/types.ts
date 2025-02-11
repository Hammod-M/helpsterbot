export interface AuthResponse {
   access_token: string;
   refresh_token?: string;
   user: {
      id: string;
      email?: string;
      telegram_id?: string;
      roles: string[];
   };
}

export interface AuthRequest {
   login?: string;
   password?: string;
   telegramData?: TelegramAuthData;
}

export interface TelegramAuthData {
   id: string;
   first_name: string;
   last_name?: string;
   username?: string;
   photo_url?: string;
   auth_date: number;
   hash: string;
}
