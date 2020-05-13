import Api from '@/services/api'
export default {
  //get data from sosfunds table
    getsos () {
      return Api().get('sourcefunding')  
    },
    //get data from otherfunds table
    getotherfunds () {
      return Api().get('sourcefunding/others')
    },
    // post new data to server for creating new row
    addNewcontribution (data){
      return Api().post('sourcefunding',data)
    },
    //post id of selected item to be deleted
    deleteItem (id){
      return Api().delete('sourcefunding/delete' +id)
    },
    // post id and edited data of selected item
    updateItem (id,item){
      return Api().put('sourcefunding/update' +id ,item)
    },
    updateSos(id,item){
      return Api().put('sourcefunding/sos' +id ,item)
    }
  }