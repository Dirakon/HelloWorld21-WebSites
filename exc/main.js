for (let i = 0; i < 6;++i){
    for (let j = 0; j < 6;++j){
        let a = document.createElement('div');
        // Добавляем клетку в текущую строку.
        document.body.appendChild(a);
    }

    // Переходим на следующую строку.
    let b = document.createElement('br');
    document.body.appendChild(b);
}
