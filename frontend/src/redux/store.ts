import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer } from "./data/reducer";
import thunk from "redux-thunk";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = legacy_createStore(combineReducers({item:reducer}), applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch :()=>AppDispatch = useDispatch;

export type rootstate = ReturnType<typeof store.getState>;

export const UseAppSelector :TypedUseSelectorHook<rootstate> = useSelector;
