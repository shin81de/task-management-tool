class Tasks {
  constructor() {
    this.tasks = this.createObj_();
  }

  createObj_() {
    // タスク情報格納用のオブジェクト
    const sheet = SS.getSheetByName('tasks');
    const values = sheet.getDataRange().getValues();
    let taskInfoObj = {};
    for (let i = 1; i < values.length; i++) {         // 0 行目はタイトルだから??
      // ステータスがOPENで開始日以降のものをオブジェクトに格納
      if (values[i][0] === 'OPEN' && new Date() > values[i][4]) {
        // 各管理番号に対して、To_Do_Task、締切日、残日数を格納
        taskInfoObj[values[i][6]] = {
          task_name: values[i][2],     // To_Do_Task
          deadline: Utilities.formatDate(new Date(values[i][3]), 'JST', 'yyyy/MM/dd'),     // 締切日
          remainingDays: values[i][5]      // 残日数

        }
      }
    }
    return taskInfoObj;
  }

  getToDosByUserName(name) {


  }

  getTaskStates() {
    const sheet = SS.getSheetByName('tasks');
    const values = sheet.getDataRange().getValues();
    const taskStates = values.map(row => row.slice(6));
    return taskStates;
  }

  getTodoTasks_() {

    // 元データ：taskStates
    // [ [ '管理番号', 'Bob', 'Tom', 'Ivy' ],
    //   [ '', '済', '済', '済' ],
    //   [ 'A001', '未', '対象外', '対象外' ],
    //   [ 'A002', '未', '未', '未' ],
    //   [ 'A003', '未', '未', '未' ],
    //   [ 'A004', '済', '未', '対象外' ],
    //   [ 'A005', '未', '未', '未' ],
    //   [ '', '', '', '' ] ]

    // 目標：todoTasks
    // [
    //    {name: 'Bob',   todos: [A001, A002, A003]},
    //    {name: 'Tom',   todos: [A001, A002, A003]},
    //    {name: 'Ivy',   todos: [A001, A002, A003]}
    // ]

    const taskStates = this.getTaskStates();
    const header = taskStates.shift();
    const names = header.slice(1);

    const todoTasks = {};




    console.log(taskStates);
  }


  //   /**
  //  * タスク情報の管理番号をキーとするオブジェクトに変換
  //  * 
  //  * @param {object[][]} タスク情報（二次元配列） array
  //  * @return {object} タスク情報（ステータス：CLOSE、開始日が未来は除外）
  //  */
  //   createObj_(array) {
  //     // タスク情報格納用のオブジェクト
  //     let taskInfoObj = {};
  //     for (let i = 1; i < array.length; i++) {         // 0 行目はタイトルだから??
  //       // ステータスがOPENで開始日以降のものをオブジェクトに格納
  //       if (array[i][0] === 'OPEN' && new Date() > array[i][4]) {
  //         // 各管理番号に対して、To_Do_Task、締切日、残日数を格納
  //         taskInfoObj[array[i][6]] = {
  //           task_name: array[i][2],     // To_Do_Task
  //           deadline: Utilities.formatDate(new Date(array[i][3]), 'JST', 'yyyy/MM/dd'),     // 締切日
  //           remainingDays: array[i][5]      // 残日数
  //         }
  //       }
  //     }
  //     return taskInfoObj;
  //   }

  //   /**
  //  * タスク情報の管理番号をキーとするオブジェクトに変換
  //  * 
  //  * @param {object[][]} タスク情報（二次元配列） array
  //  * @return {object} タスク情報（ステータス：CLOSE、開始日が未来は除外）
  //  */
  // function createObj_(array) {
  //   // タスク情報格納用のオブジェクト
  //   let taskInfoObj = {};
  //   for (let i = 1; i < array.length; i++) {         // 0 行目はタイトルだから??
  //     // ステータスがOPENで開始日以降のものをオブジェクトに格納
  //     if (array[i][0] === 'OPEN' && new Date() > array[i][4]) {
  //       // 各管理番号に対して、To_Do_Task、締切日、残日数を格納
  //       taskInfoObj[array[i][6]] = {
  //         task_name: array[i][2],     // To_Do_Task
  //         deadline: Utilities.formatDate(new Date(array[i][3]), 'JST', 'yyyy/MM/dd'),     // 締切日
  //         remainingDays: array[i][5]      // 残日数
  //       }
  //     }
  //   }
  //   return taskInfoObj;
  // }
}



function objDataTest() {
  const objData = new Tasks().createObj_();
  console.log(objData);
}

function getTaskStatesTest() {
  const tasks = new Tasks();
  console.log(tasks.getTaskStates_());
}

function getTodoTasksTest() {
  const tasks = new Tasks();
  console.log(tasks.getTodoTasks_());
}