/**
 * 対象者へ未対応タスクをまとめてメール通知
 * 
 * @trigger 毎日午前8 ~ 9時
 */
function Task_Management() {
    // 当日の日付取得
    const today = new Date();
    // 平日の場合のみ処理を実行
    if(isWeekDay_(today)) {
        // シートの各データ取得
        const ss          = SpreadsheetApp.getActiveSpreadsheet();
        const sh          = ss.getActiveSheet();
        const lastRow     = sh.getLastRow();
        const lastColumn  = sh.getLastColumn();
        // A-G列がタスク情報
        const _taskInfo   = sh.getRange(2, 1, lastRow, 7).getValues();
        // タスク情報を（二次元配列から）オブジェクトへ変換
        const taskInfo    = createObj_(_taskInfo);
        // 対象者とタスク対応状況の開始行と開始列を定義
        const startRow    = 1;
        const startColumn = 7;
        // メール送付の判定情報（対象者とタスク対応状況の表）を取得 G-J列
        const mailInfo    = sh.getRange(startRow, startColumn, lastRow, lastColumn - startColumn + 1).getValues();
        // 対象者へ未対応タスクをまとめてメール通知
        informTodoTask_(taskInfo, mailInfo);
    }   
}

/**
 * 
 * @param {object} 本日の日付（Date型）：date 
 * @return {Boolean} 判定結果
 */
function isWeekDay_(date) {
    // 週末判定
    if(date.getDay() === 0 || date.getDay() === 6) return false;
    // 祝日判定
    const calendar = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
    if(calendar.getEventsForDay(date).length > 0)  return false;
    // 週末、祝日以外であれば営業日ということでtrue返却
    return true;
}

/**
 * タスク情報の管理番号をキーとするオブジェクトに変換
 * 
 * @param {object[][]} タスク情報（二次元配列） array
 * @return {object} タスク情報（ステータス：CLOSE、開始日が未来は除外）
 */
function createObj_(array) {
    // タスク情報格納用のオブジェクト
    let taskInfoObj = {};
    for(let i = 1; i < array.length; i++) {         // 0 行目はタイトルだから??
        // ステータスがOPENで開始日以降のものをオブジェクトに格納
        if(array[i][0] === 'OPEN' && new Date() > array[i][4]) {
            // 各管理番号に対して、To_Do_Task、締切日、残日数を格納
            taskInfoObj[array[i][6]] = {
                task_name: array[i][2],     // To_Do_Task
                deadline: Utilities.formatDate(new Date(array[i][3]), 'JST', 'yyyy/MM/dd'),     // 締切日
                remainingDays: array[i][5]      // 残日数
            }
        }
    }
    return taskInfoObj;
}

/**
 * 各個人の未対応タスクをチェックして 対象タスクをまとめてメール通知
 * 
 * @param {object} タスク情報 obj 
 * @param {object[][]} 対象者のタスク対応状況 array 
 */
function informTodoTask_(obj, array) {
    // 1列(c)ずつメンバーの未対応タスクをチェック
    // 1件でも未対応タスクあればメール送付
    for(let c = 1; c < array[0].length; c++) {
        // mailInfo[0][c] 対象者のメアド
        // mailInfo[1][c] 対象者名
        // 未対応タスクを追記する変数
        let todoTask = '';
        // 1行(r)ずつ未対応タスクをチェックしてtodoTaskにタスク情報をセット
        for(let r = 3; r < array.length; r++) {
            // mailInfo[r][0] 管理番号
            // 管理番号がオブジェクトの中にあり、
            // かつ未対応であれば変数todoTaskにタスク情報をセット
            if(obj[array[r][0]] && array[r][c] === '未') {
                // 未対応タスクのTo_Do_Task、締切日、残日数をセット
                todoTask += `${obj[array[r][0]]['task_name']} ${obj[array[r][0]]['deadline']} ${obj[array[r][0]]['remainingDays']} \n`;
            }
        }
        // 未対応タスクがあればメール通知 ※ todoTaskが空の場合はfalse
        if(todoTask) {
            // 必要情報を準備してメール通知
            const mailTo     = array[0][c];
            const targetName = array[1][c];
            const mailTitle  = '未完了タスクのお知らせ';
            const now        = Utilities.formatDate(new Date(), 'JST', 'yyyy/mm/dd HH:mm');
            const mailHeader = `※${now}時点の案件対応状況についてお知らせします。空き時間に取組みましょう。`;
            const mailBody   = `${mailHeader}\n${targetName}さん\n\n${todoTask}`;
            GmailApp.sendEmail(mailTo, mailTitle, mailBody);
        }
    }
}