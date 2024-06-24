import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

// const rootReduce = combineReducers({
// 	user: userReducer,
// });

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
