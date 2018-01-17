import superagent from 'superagent'

// API Users static class
export default class ApiUsers {
  // get a list of users
  // static getList() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       // build some dummy users list
  //       let users = [];
  //       for (let x = 1; x <= 28; x++) {
  //         users.push({
  //           id: x,
  //           username: 'Johny ' + x,
  //           job: 'Employee ' + x,
  //         });
  //       }
  //       resolve(users);
  //     }, 1000);
  //   });
  // }

  // static getList() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       // build some dummy users list
  //       let users = [];
  //       for (let x = 1; x <= 10; x++) {
  //         let user = {"name":"Chicken breast (baked)","protein":5.610000133514404,"carbs":0.0,"fat":1.4700000286102295,"servingSize":{},"amount":1.0}
  //         users.push(user)
  //       }
  //       resolve(users);
  //     }, 1000);
  //   });
  // }

  static getList() {
    return superagent.get("http://192.168.0.115:8081/foods")
  }

  // add/edit a user
  static addEdit() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 1000);
    });
  }

  // delete a user
  static delete() {
    return new Promise(resolve => {
      setTimeout(() => {
        // do something here
        resolve();
      }, 500);
    });
  }
}
