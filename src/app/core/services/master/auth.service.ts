import { Router, RouterModule } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase!: SupabaseClient;
  // private router = Inject(RouterModule)

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session:any) => {
      console.log('event', event);
      console.log('session', session);

      localStorage.setItem('session', JSON.stringify(session?.user));
      if(session?.user) {
        this.router.navigateByUrl('/students');
      }

    });
  }

  get isLoggedIn():boolean {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }

  async signInWithPassword(email:any, password:any) {
    await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    .then((m) => {
      console.log(m,'m');
    })
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

}