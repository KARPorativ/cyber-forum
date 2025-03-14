import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.password = action.payload.password;
      },
    resetUser: (state) => {
      state.userName = '';
      state.email = '';
      state.password = '';
    },
  },
});


// Экспортируем действия, которые могут быть использованы в компоненте
export const { setUserName, setEmail, setPassword, resetUser,setUser } = userSlice.actions;

// Экспортируем редьюсер, который будет добавлен в хранилище
export default userSlice.reducer;