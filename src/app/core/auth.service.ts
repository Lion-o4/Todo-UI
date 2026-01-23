import { Injectable } from '@angular/core';
import { supabase } from './supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async getAccessToken(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }
}
