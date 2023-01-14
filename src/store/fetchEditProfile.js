import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEditProfile = createAsyncThunk(
  'editProfile/fetchEditProfile',
  async function(userData, {rejectWithValue}) {
    try{
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${userData.user.token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Не удачное изменение профиля');
      }
      const data = await response.json();
      return data;
    } catch(error) {
      return rejectWithValue(error.message);
    }
  }
);