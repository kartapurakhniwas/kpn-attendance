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

  async getStudents() {
    try {
      const {data, error} = await this.supabase
      .from('students')
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
      .from('students')
      .delete()
      .eq('id', id);
      return data;
  } 

  async updateStudent(updates: any, id: number,): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('students')
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
