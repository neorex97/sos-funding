
import Api from '@/services/api'
export default {
  //api service to get data from sosfunds table
    getsosfunds () {
      return Api().get('sourcefunding')  
    },
  //api service get data from otherfunds table
    getotherfunds () {
      return Api().get('sourcefunding/others')
    },
  // api service to update sosamount in sosfund table
    updateSos(id,item){
      return Api().put('sourcefunding/sos' +id ,item)
    },
  // api service to create a new data in otherfunds table
    addNewcontribution (data){
      return Api().post('sourcefunding',data)
    },
  //api service to delete item using its 'id' in otherfunds table
    deleteItem (id){
      return Api().delete('sourcefunding/delete' +id)
    },
  //api service to update an item in otherfunds table 
    updateItem (id,item){
      return Api().put('sourcefunding/update' +id ,item)
    },
  }