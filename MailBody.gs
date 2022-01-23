class MailBody {
  constructor(name, todoTasks, taskInfoObj) {
    this.mailBody = this.buildBody_(name, todoTasks, taskInfoObj);
  }

  buildBody_(name, todoTasks, taskInfoObj) {

    // 目標
    // ※2022/01/22 23:00時点の案件対応状況についてお知らせします。空き時間に取組みましょう。
    // かにさん

    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日

    const now = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
    const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;

    const todos = todoTasks.filter(v => v.name === name);
    console.log(todos);
    const mailTodos = '';
  

    const mailBody = `${mailHeader}\n${name}さん\n\n${mailTodos}`;
    return mailBody;
  }

}

function buildBodyTest() {
  const tasks = new Tasks();
  const taskInfoObj = tasks.tasks;
  const todoTasks = tasks.getTodoTasks_();
  // console.log(todoTasks);

  const mailBody = new MailBody('Bob', todoTasks, taskInfoObj);
}