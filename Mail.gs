class Mail {
  constructor() {

  }

  /**
   * 名前をキーにして、アドレスを取得するメソッド
   */
  getAddressByWorkerName(name) {
    const values = SH_EMAILS.getDataRange().getValues();
    const header = values.shift();

    values.find( row => row);
  }
}

function mailTester() {
  const m = new Mail();
  m.getAddressesFormSheet();
}