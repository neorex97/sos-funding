<template>
<v-card>
  <!-- OUTER TABLE -->
  <v-data-table
    :headers="headers"
    :items="sosfunding"
  >
  <!-- Custom headers -->
   <template v-slot:header.sos="{ header }">
      {{ header.text.toUpperCase()}}
    </template>
    <template v-slot:header.others="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.subtotal="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.total="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.actions="{ header }">
      {{ header.text.toUpperCase() }}
    </template>

  <template v-slot:item="props">
    <tr>
          <!-- Tooltip message on sos -->

       
      <td>
<!-- Textfied on dialog for editing sosamount -->
       <v-edit-dialog
          :return-value.sync="props.item.sosamount"
        > {{ props.item.sosamount }} {{sosPercentage}}
          <template v-slot:input >
            <v-form @submit="editsos(props.item)">
            <v-text-field
              
              v-model="props.item.sosamount"
              :rules="[max25chars]"
              label="sos contribution"
              single-line
              counter
            ></v-text-field>
            </v-form>
          </template>
        </v-edit-dialog>
        </td>
     

  <!-- INNER TABLE  -->

     <v-data-table 
     :headers="innerheaders"
     :items="others"
     
      hide-default-footer>
      <!-- Custom headers -->
      <template v-slot:header.name="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.description="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.amount="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    <template v-slot:header.actions="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
    
      <template v-slot:item="props">
      <tr>
        <!-- Data from other contributions -->

        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.amount }}</td>

    <!-- Edit delete actions     -->
    <td> 
       <v-icon
        small
        class="mr-2"
        @click="editItem(props.item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(props.item.id,props.item)"
      >
        mdi-delete
      </v-icon>
      </td>
          </tr>  
 
 
      </template>

    <!-- Pop-up form to edit and add a item -->

      <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add new contribution</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="newItem.name" label="Name of the organization" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="newItem.description" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="newItem.amount" label="Amount"></v-text-field>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    </v-data-table>
      <td class="text-xs-right">{{ countSubtotal }} {{subPercent}} </td> 
      <td class="text-xs-right">{{ countTotal }}</td>
      
      </tr>
  </template>
  

  </v-data-table>
  
  </v-card>
</template>

<script>
import ApiServices from '@/services/ApiServices'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false, //to control pop-up form
      headers: [
        {
          text: 'SOS contribution sought in this application',
          align: 'start',
          sortable: false,
          value: 'sos',
        },
        { text: 'Other contributions', value: 'others' },
        { text: 'Subtotal of other contributions', value: 'subtotal' },
        { text: 'Total contributions', value:'total' },
        
      ],
       innerheaders: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'amount (EUR)', value: 'amount' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
      editedIndex: -1,
      defaultsos:{
          sosid:'',
        sosamount:''
      },
      newsos:{
        sosid:'',
        sosamount:''
      },
      newItem: {
        id: '',
        name: '',
        description:'',
        amount:'',
      },
      defaultItem: {
        id : '',
        name: '',
        description:'',
        amount:'',
        
      },
    }),
  
    computed: {
     ...mapState([
        'sosfunding',
        'others',
    ]),
     ...mapGetters([
  'countSubtotal',
  'countTotal',
  'sosPercentage',
  'subPercent'
  
  ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Add new' : 'Edit Item'
      },
      
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
//invoke methods to get data from server when component is mounted
    mounted: function () {
    this.Sos()
    this.Others()
    },
  methods: {
     ...mapActions([
      'removeItemAction',
      'addItemAction',
      'getSosAction',
      'getOtherAction'
    ]),
  //GET DATA FROM SERVER
    Sos(){
      ApiServices.getsosfunds()
      .then(response => {
        console.log(response.data)
        this.getSosAction(response.data)
      }).catch(e => {
        console.log(e);
        });
    },
    Others(){
     ApiServices.getotherfunds()
      .then(response => {
        console.log(response.data)
        this.getOtherAction(response.data)  
      }).catch(e => {
          console.log(e);
        });
    },
    //Update sosamount
    editsos(item){
        this.newsos = Object.assign({}, item)
        var id = this.newsos.sosid
        console.log(id)
        ApiServices.updateSos(id,this.newsos)
        this.newsos = Object.assign({}, this.defaultsos)   
    },
    //store edit data to newItem and set editIndex to determine which action to perform edit/create
     editItem (item) {
        this.editedIndex = this.others.indexOf(item)
        this.newItem = Object.assign({}, item)
        this.dialog = true
      },
    // Delete selected row using its id 
    deleteItem (id,item) {
        var index = this.others.indexOf(item)
        var r = confirm('Are you sure you want to delete this item?')
        if(r==true){
          console.log(id)
           ApiServices.deleteItem(id)
           this.removeItemAction(index)
        }  
      },
    close () {
        this.dialog = false
        setTimeout(() => {
          this.newItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    save () {
          var id = this.newItem.id
          console.log(id)
        if (this.editedIndex > -1) {
          Object.assign(this.others[this.editedIndex], this.newItem)
          ApiServices.updateItem(id,this.newItem)
        } 
        else {
          ApiServices.addNewcontribution(this.newItem)
          .then(response => {
          console.log(response.data)
          this.addItemAction(response.data) 
        }).catch(e => {
          console.log(e);
        });
        }
        this.close()
      },
    },
  }
</script>

// Data is stored inside store/index.js vuex is used for state management and accessing data   