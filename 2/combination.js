const outputElement = document.getElementById('output'); // output内容
const processButton = document.getElementById('processCsv'); // process実行ボタン

// ボタン機能
processButton.addEventListener('click', () => {
  // ファイル読み込み、処理してoutputElementに出力
  fetch('separated_data.csv') 
    .then(response => response.text())
    .then(data => {
      const combinedData = combineCsvData(data);
      outputElement.textContent = combinedData;
    })
    .catch(error => {
      outputElement.textContent = `Error: ${error.message}`;
    });
});

// combine実施
function combineCsvData(csvData) {
  const rows = csvData.trim().split('\n');
  const groupedData = {};

  rows.forEach(row => {
    const columns = row.split(',');
    const groupId = columns[0];
    const value = columns[1];

    if (!groupedData[groupId]) {
      groupedData[groupId] = [];
    } // groupIDが存在しない場合、新たに配列作成
    groupedData[groupId].push(value);
  });

  // 
  const combinedRows = Object.keys(groupedData).map(groupId => {
    const combinedValue = groupedData[groupId].join(':'); // groupedDataを':'でjoin
    return `${groupId},${combinedValue}`;  // groupIdと':'でjoinしたvalueを組み合わせ
  });

  return combinedRows.join('\n');
}
