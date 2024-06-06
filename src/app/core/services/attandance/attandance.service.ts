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

  async addStudent(formdata:any) {
    try {
      const {data, error} = await this.supabase.from('attandance').insert(formdata);
      if(error) {
        alert(error.message);
      }
      return data;
     } catch (error) {
      alert(error);
      return false;
    }
  } 

  async getAttandance() {
    try {
      const {data, error} = await this.supabase
      .from('attandance')
      .select('*');
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
      .from('attandance')
      .delete()
      .eq('id', id);
      return data;
  } 

  async updateStudent(updates: any, id: number,): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('attandance')
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
