for (let i = 0; i < 6;++i){
    for (let j = 0; j < 6;++j){
        let a = document.createElement('div');
        document.body.appendChild(a);  // Добавляем клетку в текущую строку.
    }
    let b = document.createElement('br');   // Переходим на следующую строку.
    document.body.appendChild(b);
}
