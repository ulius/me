export default function users(state = {}, action) {
 let new_state;
 switch(action.type) {
   case 'users.modalDeleteShow':
     new_state = JSON.parse(JSON.stringify(state));
     return reducerClass.modalDeleteShow(new_state, action);


   case 'users.modalDeleteHide':
     new_state = JSON.parse(JSON.stringify(state));
     return reducerClass.modalDeleteHide(new_state, action);

   case 'users.delete':
     new_state = JSON.parse(JSON.stringify(state));
     return reducerClass.deleteUser(new_state, action);


   default:
     return state;
 }
}

class reducerClass {
  static modalDeleteShow(new_state, action) {
    new_state.modal = new_state.modal ? new_state.modal : {};
    new_state.modal.list_delete = {
      show: true,
      id: action.id,
      username: action.username
    };
    return new_state;
  }

  static modalDeleteHide(new_state, action) {
     new_state.modal.list_delete = {
       show: false,
       id: 0,
       username: ''
     };
     return new_state;
  }

  static deleteUser(new_state, action) {
    for (const index in new_state.list) {
      if (new_state.list[index].id === action.id) {
        new_state.list.splice(index, 1);
        break;
      }
    }
    return new_state;
  }
}
