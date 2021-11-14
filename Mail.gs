class Mail {
  constructor(name) {
    this.name = name;
    this.mailTo = this.getAddressByWorkerName(name);

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

  sendEmail(array, c, todoTask) {
    // const mailTo = 
    const targetName = array[1][c];
    const mailTitle = '未完了タスクのお知らせ';
    const now = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
    const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;
    const mailBody = `${mailHeader}\n${targetName}さん\n\n${todoTask}`;

    console.log(mailTo, mailTitle, mailBody);
    // GmailApp.sendEmail(mailTo, mailTitle, mailBody);

  }
}

function mailTester() {
  const m = new Mail('Bob');
  console.log(m);

}


// [ [ 'Bob', 'Bob@xxx.co.jp' ],
//   [ 'Tom', 'tom@xxx.co.jp' ],
//   [ 'Ivy', 'ivy@xxx.co.jp' ] ]

// function sendEmail_(array, c, todoTask) {
//   // 必要情報を準備してメール通知
//   const mailTo = array[0][c];
//   const targetName = array[1][c];
//   const mailTitle = '未完了タスクのお知らせ';
//   const now = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
//   const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;
//   const mailBody = `${mailHeader}\n${targetName}さん\n\n${todoTask}`;

//   console.log(mailTo, mailTitle, mailBody);
//   // GmailApp.sendEmail(mailTo, mailTitle, mailBody);
// }