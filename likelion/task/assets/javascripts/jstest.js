let n1 = parseInt(prompt("첫번째 숫자를 입력하세요"));
let n2 = parseInt(prompt("두번째 숫자를 입력하세요"));

let result = prompt("연산자를 입력하세요 [1: +, 2: -, 3: *, 4: /]");

switch(result) {
    case "1":
        alert(n1 + n2);
        break;
    case "2":
        alert(n1 - n2);
        break;
    case "3":
        alert(n1 * n2);
        break;
    case "4":
        alert(n1 / n2);
        break;
}
