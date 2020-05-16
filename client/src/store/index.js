import Vue from 'vue'
import Vuex from 'vuex'
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
    
    getSosAction: (context,sos)=> {
      context.commit('SET_SOSFUNDING',sos)
    },
    getOtherAction: (context,others)=> {
        context.commit('SET_OTHERFUNDS',others)
    },
    removeItemAction:(context,index)=>{   
      context.commit('REMOVE_ITEM',index)
    },
    addItemAction:(context,newItem)=>{
      context.commit('ADD_NEW',newItem)
    }
  },

  modules: {
  },
  getters:{
//Calculate subtotal by adding each otherfunds amounts
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
// Calculate total contributions by adding subtotal and sosamount
    countTotal:(state)=>{
      var total=parseInt(state.sosfunding[0].sosamount),
      i;
      for (i = 0; i < state.others.length; i++) { 
        total += parseInt(state.others[i].amount);
      }
      return  isNaN(total) ? '' : total;
    },
// calculate percentage of sosamount 
    sosPercentage:(state)=>{
      var total=parseInt(state.sosfunding[0].sosamount),
      i;
      for (i = 0; i < state.others.length; i++) { 
        total += parseInt(state.others[i].amount);
      }
      const sosPercent = parseFloat((parseInt(state.sosfunding[0].sosamount)*100)/total).toFixed(2); 
      return isNaN(sosPercent) ? '' : '['+sosPercent+'%]';
    },
// Calculate percentage of subtotal of other contributions
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
