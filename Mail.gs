class Mail {
  constructor(name) {
    this.name = name;
    this.mailTo = this.getAddressByWorkerName(name);
    this.mailTitle = '未完了タスクのお知らせ';
  }


  /**
   * 名前をキーにして、アドレスを取得するメソッド
   */
  getAddressByWorkerName(name) {
    const values = SH_EMAILS.getDataRange().getValues();
    const header = values.shift();
    console.log('values', values);
    const row = values.find(row => row[0] === name);
    console.log('row',row);
    return row[1];
  }

  sendEmail(todoTask) {
    const mailBody = this.buildBody(todoTask);
    console.log('mailBody', mailBody);
    // GmailApp.sendEmail(this.mailTo, this.mailTitle, mailBody);

  }

  buildBody(todoTask) {
    const now = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
    const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;
    const mailBody = `${mailHeader}\n${this.name}さん\n\n${todoTask}`;
    return mailBody;
  }
}

function mailTester() {
  const m = new Mail('Bob');
  console.log(m);

}