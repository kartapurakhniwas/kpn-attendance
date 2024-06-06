import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttandanceService {

  private supabase!: SupabaseClient

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async add(formdata:any) {
    try {
      const {data, error} = await this.supabase.from('daily_progress').insert(formdata);
      if(error) {
        alert(error.message);
      }
      return data;
     } catch (error) {
      alert(error);
      return false;
    }
  } 

  async getAttandanceToday(startOfDay:any, endOfDay:any) {
    try {
      const {data, error} = await this.supabase
      .from('daily_progress')
      .select('*')
      // .eq('created_at', date);
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());
      if(error) {
        alert(error.message);
      }
      return data;
     } catch (error) {
      alert(error);
      return false;
    }
  } 

  async deleteStudent(id:number) {
    const data = await this.supabase
      .from('daily_progress')
      .delete()
      .eq('id', id);
      return data;
  } 

  async update(updates: any, id: number,): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('daily_progress')
        .update(updates)
        .eq('id', id);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }
}
