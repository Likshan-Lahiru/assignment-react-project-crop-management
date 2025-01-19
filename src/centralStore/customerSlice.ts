import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}


const dataSlice = createSlice({
    name:"customer_slice",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.data.push(action.payload)
        }
    }

})

export default dataSlice.reducer;