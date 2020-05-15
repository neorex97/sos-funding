import Vue from 'vue'
import Vuex from 'vuex'
import ApiServices from '@/services/ApiServices'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sosfunding: [],
    others: [],
  },
  mutations: {
    SET_SOSFUNDING: (state,sos)=>{
      state.sosfunding=sos
    },
    SET_OTHERFUNDS: (state,others)=>{
      state.others=others
    },
    ADD_NEW:(state,newItem)=>{
      state.others.push(newItem)
    },
    REMOVE_ITEM:(state,index)=>{
      state.others.splice(index, 1)
    },
  },
  actions: {
    
    GetSos: (context,sos)=> {
      context.commit('SET_SOSFUNDING',sos)
      },

      GetOtherFunds: (context,others)=> {
        context.commit('SET_OTHERFUNDS',others)
        },

    removeItem:(context,index)=>{
      
      context.commit('REMOVE_ITEM',index)
    },
    addNewItem:(context,newItem)=>{
      context.commit('ADD_NEW',newItem)
    }
  },

  modules: {
  },
  getters:{
//Calculate subtotal
    countSubtotal:(state)=>{
      var subtotal=0,i;
      if(state.others.length==0 && state.sosfunding[0].sosamount==''){
        return '';
      }else{
        for (i = 0; i < state.others.length; i++) { 
          subtotal += parseInt(state.others[i].amount);
      }
      return isNaN(subtotal) ? '' : subtotal;
      }
      
},
// Calculate total contributions
    countTotal:(state)=>{
      var total=parseInt(state.sosfunding[0].sosamount),
      i;
      for (i = 0; i < state.others.length; i++) { 
        total += parseInt(state.others[i].amount);
      }
      return  isNaN(total) ? '' : total;
    },
// calculate total percentage of sos contribution
    sosPercentage:(state)=>{
      var total=parseInt(state.sosfunding[0].sosamount),
      i;
      for (i = 0; i < state.others.length; i++) { 
        total += parseInt(state.others[i].amount);
      }
      const sosPercent = parseFloat((parseInt(state.sosfunding[0].sosamount)*100)/total).toFixed(2); 
      return isNaN(sosPercent) ? '' : '['+sosPercent+'%]';
    },
// Percentage of other contributions
    subPercent:(state)=>{
      var total=parseInt(state.sosfunding[0].sosamount),
      i;
      for (i = 0; i < state.others.length; i++) { 
        total += parseInt(state.others[i].amount);
      }
      const percentage=parseFloat(100-(parseInt(state.sosfunding[0].sosamount)*100)/total).toFixed(2); 
      return isNaN(percentage) ? '' : '['+percentage+'%]';
    },
  
    },
  
})
