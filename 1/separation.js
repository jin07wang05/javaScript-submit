const outputElement = document.getElementById('output'); // output内容
const processButton = document.getElementById('processCsv'); // process実行ボタン

// ボタン機能
processButton.addEventListener('click', () => {
  // ファイル読み込み、処理してoutputElementに出力
  fetch('combined_data.csv') 
    .then(response => response.text())
    .then(data => {
      const sepratedData = seprateCsv(data);
      outputElement.textContent = sepratedData;
    })
    .catch(error => {
      outputElement.textContent = `Error: ${error.message}`;
    });
});

// seprate実施
function seprateCsv(csvData) {
  const rows = csvData.trim().split('\n');
  const result = [];

  rows.forEach(row => {
    const columns = row.split(','); // apple,fruit:sale -> ['apple','fruit:sale']
    const combinations = columns.map(col => col ? col.split(':') : [""]); // ['apple','fruit:sale'] -> [['apple'], ['fruit', 'sale']]

    // デカルト積
    // [['apple'], ['fruit', 'sale']] -> [] -> ['apple'] -> ['apple', 'fruit'] -> [['apple', 'fruit'], ['apple', 'sale']]
    const cartesianProduct = (arr) => {
      return arr.reduce((acc, curr) => {
        const temp = [];
        acc.forEach(a => {
          curr.forEach(b => {
            temp.push([...a, b]);
          });
        });
        return temp;
      }, [[]]);
    };

    const normalizedRows = cartesianProduct(combinations);
    normalizedRows.forEach(newRow => result.push(newRow.join(',')));  // [['apple', 'fruit'], ['apple', 'sale']] -> ['apple,fruit', 'apple,sale'] resultにpush
  });

  return result.join('\n');
}
