class User {
  constructor(name) {
    this.name = name;

  }


  /**
   * 名前をキーにして、アドレスを取得するメソッド
   */
  getAddress() {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('users');
    const values = sheet.getDataRange().getValues();
    const [_header, ...plainValues] = values;
    // console.log('plainValues', plainValues);

    const row = plainValues.find(row => row[0] === this.name);
    // console.log('row', row);
    const [_name, email] = row;
    return email;

  }

}


function testUsers() {
  const name = 'Bob';
  const user = new User(name);
  console.log('email: ', user.getAddress());
}