class Users {
  constructor() {
    this.sheet = SS.getSheetByName('users');
    this.values = this.sheet.getDataRange().getValues();

  }
  getUserNameList() {
    const [_header, ...plainValues] = this.values;
    const userNameList = plainValues.map(el => el[0]);
    return userNameList;
  }

  /**
   * 名前をキーにして、アドレスを取得するメソッド
   */
  getAddress(name) {

    const [_header, ...plainValues] = this.values;
    // console.log('plainValues', plainValues);

    const row = plainValues.find(row => row[0] === name);
    // console.log('row', row);
    const [_name, email] = row;
    return email;

  }

}


function testUsers() {
  const name = 'Bob';
  const users = new Users();
  console.log('email: ', users.getAddress(name));
}

function getUserNameListTest() {
  const list = new Users().getUserNameList();
  console.log(list);

}