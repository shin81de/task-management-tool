class MailBody {
  constructor(name) {
    this.mailBody = this.buildBody_(name);
  }

  buildBody_(name) {
    const tasks = new Tasks();
    const todoTasks = tasks.getTodoTasks_();
    const taskInfoObj = tasks.tasks;

    // 目標
    // ※2022/01/22 23:00時点の案件対応状況についてお知らせします。空き時間に取組みましょう。
    // かにさん

    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日
    // タスク管理ツールの作成 2021/10/20 あと-95日

    const now = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
    const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;

    const taskIds = todoTasks.filter(v => v.name === name)[0].todos;
    // console.log(todos);

    const strTodoInfos = taskIds.map(taskId => {

      const obj = taskInfoObj[taskId];
      if(!obj) return; 
      return `${obj.task_name} ${obj.deadline} ${obj.remainingDays}\n`;
    });
    // console.log(strTodoInfos);

    const mailBody = `${mailHeader}\n${name}さん\n\n${strTodoInfos.join('')}`;
    return mailBody;
  }

}

function buildBodyTest() {

  const mailBody = new MailBody('Bob');
  console.log(mailBody.mailBody);
}