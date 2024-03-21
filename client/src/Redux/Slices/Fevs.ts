import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 


export interface FevList {
    _id: string
}

type FevItem = {
    List: FevList[]
}

const initialState : FevItem = {
    List: []
}

const FevReducer = createSlice({
    name: "FevList",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<FevList[]> )=>{
            state.List = action.payload
        },
        addOneMore: (state, action: PayloadAction<FevList>)=>{
            const id = action.payload
            state.List.push(id);
        },
        // remove: (state, action: PayloadAction<FevList>)=>{
            
        // }
    }
})

export const { add, addOneMore } = FevReducer.actions;
export default FevReducer.reducer;