import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}


const dataSlice = createSlice({
    name:"test_slice",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.data.push(action.payload)
        }
    }

})

export default dataSlice.reducer;