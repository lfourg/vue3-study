import {createStore} from 'vuex'

let store = createStore({
    state(){
        return {
            count:666
        }
    },
    getters:{
        double(state){
            return state.count * 2
        }
    },
    mutations:{
        add(state){
            state.count++
        }
    },
    actions:{
        asyncAdd({commit}){
            setTimeout(()=>{
                commit('add')
            },2000)
        }
    }
})

export default store