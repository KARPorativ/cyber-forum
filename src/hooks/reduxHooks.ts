import { AppDispatch, RootState } from "../store/store";
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
