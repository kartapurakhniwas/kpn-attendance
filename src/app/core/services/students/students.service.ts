import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private supabase!: SupabaseClient

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async addStudent(formdata:any) {
    try {
      const {data, error} = await this.supabase.from('students').insert(formdata);
      if(error) {
        alert(error.message);
      }
      return data;
     } catch (error) {
      alert(error);
      return false;
    }
  } 
}
