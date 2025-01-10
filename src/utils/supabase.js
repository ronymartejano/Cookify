import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccgponarqclcbzzpjkyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZ3BvbmFycWNsY2J6enBqa3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzODk0NDcsImV4cCI6MjA1MTk2NTQ0N30.uNVzQ2b6pbSNwXZRt31-HTWQ1YhkBz8f4_X8-1NGVl0';

export const supabase = createClient(supabaseUrl, supabaseKey);


export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSucces: '',
}
