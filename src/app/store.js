import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {navReducer} from "../features/header/headerSlice";
import { authReducer } from '../features/auth/authSlice';
import {countryReducer} from "../features/country/countrySlice.js";
import {cityReducer} from "../features/city/citySlice.js";
import {inboxReducer} from "../features/inbox/inboxSlice.js";
import { editProfileReducer } from '../features/editProfile/editProfileSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    nav : navReducer,
    auth : authReducer,
    country : countryReducer,
    city : cityReducer,
    inbox : inboxReducer,
    editProfile : editProfileReducer
  },
});
