let input = document.querySelector(".inputbtn");
let buttons = document.querySelectorAll("button");
let string = "";

let arr=Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnText = e.target.innerHTML;  //btnText store the input enter by deepak

        if(btnText == "="){
            string = eval(string);
            input.value = string;
        }
        else if(btnText == "AC"){
            string = "";
            input.value = string;
        }
        else if(btnText == "DE"){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
       else {
            //  Check if last character and current value are operators
            let operators = ["+", "-", "*", "/", "%"];
            if (operators.includes(btnText)) {
                if (operators.includes(string[string.length - 1])) {
                    // replace last operator with new one
                    string = string.slice(0, -1) + btnText;
                } else {
                    string += btnText;
                }
            } else {
                string += btnText;
            }
            input.value = string;
        }
    })
})