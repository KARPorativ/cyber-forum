import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// Определяем интерфейс для состояния пользователя
interface UserState {
    _id: string;
    userName: string;
    email: string;
    quote: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    city: string;
    about: string;
    avatar: string;
    loading: boolean;
    error: string | null;
}
// Начальное состояние
const initialState: UserState = {
    _id: '',
    userName: '',
    email: '',
    quote: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    city: '',
    about: '',
    avatar: '',
    loading: false,
    error: null,
};
// Создаем slice пользователя
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
    const { _id, userName, email, quote, firstName, lastName, middleName, phone, city, about, avatar } = action.payload;
            state._id = _id;
            state.userName = userName;
            state.email = email;
            state.quote = quote;
            state.firstName = firstName;
            state.lastName = lastName;
            state.middleName = middleName;
            state.phone = phone;
            state.city = city;
            state.about = about;
    state.avatar = avatar;
},
        resetUser: (state) => {
            state._id = '';
            state.userName = '';
            state.email = '';
            state.quote = '';
            state.firstName = '';
            state.lastName = '';
            state.middleName = '';
            state.phone = '';
            state.city = '';
            state.about = '';
            state.avatar = '';
        },
    }
});
// Экспортируем действия
export const { setUser, resetUser } = userSlice.actions;
// Экспортируем редюсер
export default userSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Initial state
// const initialState = {
//     userId: '',
//     userName: '',
//     email: '',
//     quote: '',
//     firstName: '',
//     lastName: '',
//     middleName: '',
//     phone: '',
//     city: '',
//     about: '',
//     loading: false,
//     error: null,
// };
// // Create user slice
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             const { userId, userName, email, quote, firstName, lastName, middleName, phone, city, about } = action.payload;
//             state.userId = userId;
//             state.userName = userName;
//             state.email = email;
//             state.quote = quote;
//             state.firstName = firstName;
//             state.lastName = lastName;
//             state.middleName = middleName;
//             state.phone = phone;
//             state.city = city;
//             state.about = about;
//         },
//         resetUser: (state) => {
//             state.userId = '';
//             state.userName = '';
//             state.email = '';
//             state.quote = '';
//             state.firstName = '';
//             state.lastName = '';
//             state.middleName = '';
//             state.phone = '';
//             state.city = '';
//             state.about = '';
//         },
//     }
    
    
// });
// // Export actions
// export const { setUser, resetUser } = userSlice.actions;
// // Export the reducer
// export default userSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userName: '',
//   email: '',
//   password: '',
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserName: (state, action) => {
//       state.userName = action.payload;
//     },
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//     setPassword: (state, action) => {
//       state.password = action.payload;
//     },
//     setUser: (state, action) => {
//         state.userName = action.payload.userName;
//         state.email = action.payload.email;
//         state.password = action.payload.password;
//       },
//     resetUser: (state) => {
//       state.userName = '';
//       state.email = '';
//       state.password = '';
//     },
//   },
// });


// // Экспортируем действия, которые могут быть использованы в компоненте
// export const { setUserName, setEmail, setPassword, resetUser,setUser } = userSlice.actions;

// // Экспортируем редьюсер, который будет добавлен в хранилище
// export default userSlice.reducer;