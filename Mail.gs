class Mail {
  constructor() {

  }

  /**
   * 名前をキーにして、アドレスを取得するメソッド
   */
  getAddressByWorkerName(name) {
    const values = SH_EMAILS.getDataRange().getValues();
    const header = values.shift();
    const row = values.find(row => row[0] === name);
    return row[1];
  }
}

function mailTester() {
  const m = new Mail();
  console.log(m.getAddressByWorkerName('Bob'));

}


// [ [ 'Bob', 'Bob@xxx.co.jp' ],
//   [ 'Tom', 'tom@xxx.co.jp' ],
//   [ 'Ivy', 'ivy@xxx.co.jp' ] ]