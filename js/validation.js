
function NameValidation() {
    var RegName = /^[a-zA-Z]+\s+[a-zA-Z]{4,}$/;
    var fname = document.getElementById("full-name").value;
    var ind = fname.indexOf(' ');
    if (!RegName.test(fname)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("namemsg").style="color:red";
        document.getElementById("namemsg").innerHTML='only alphabets and spaces allowed, min two words each with min 4 characters';
    }
    else if (ind<4)) {
        document.getElementById('submit').disabled = true; 
        document.getElementById("namemsg").style="color:red";
        document.getElementById("namemsg").innerHTML='only alphabets and spaces allowed, min two words each with min 4 characters';
    }
    else{
        document.getElementById("namemsg").style="color:blue";
        document.getElementById("namemsg").innerHTML='Done';
        enableSubmitButton();
    }
    
    var [first, last] = fname.split(' ');
    sessionStorage.setItem("nameout", first);
}

function PanValidation() {
    var regpan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    var panId = document.getElementById('pan').value;
    if (!regpan.test(panId)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("panmsg").style="color:red";
        document.getElementById("panmsg").innerHTML='Pan Number should be in the form: "AAAAA 1234 B" \nNOTE: No spaces allowed in between';
    }
    else{
        document.getElementById("panmsg").style="color:blue";
        document.getElementById("panmsg").innerHTML='Done';
        enableSubmitButton();
    }
}

function EmailValidation() {
    var regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,4})+$/;
    var mailId = document.getElementById('email').value;
    if (!regMail.test(mailId)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("emailmsg").style="color:red";
        document.getElementById("emailmsg").innerHTML='Please enter valid email Id';
    }
    else{
        document.getElementById("emailmsg").style="color:blue";
        document.getElementById("emailmsg").innerHTML='Done';
        enableSubmitButton();
    }
    sessionStorage.setItem("mailout", mailId);
}

function LoanAmtValidation() {
    var regamt = /\d{1,9}$/;
    var lamt = document.getElementById("loanAmt").value;
    if (!regamt.test(lamt)) {
        document.getElementById('submit').disabled = true;
    }
    else if (lamt.length > 9) {
        document.getElementById('submit').disabled = true;
    }
    else {
    enableSubmitButton();
    }
}


function toWords() {
    document.getElementById('words').innerHTML = inWords(document.getElementById('loanAmt').value);  
}
function inWords(num) {
    //2D Array of unit and 11 to 19
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    //2D array of tens places but 2nd row is empty --arranged such that it matches the index position.
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if ((num = num.toString()).length > 9)
    {
        document.getElementById('words').style="color:red";
        return 'Amount is Out of Range';
    }
    //getting number from backward direction
    n = ('000000000' + num).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);     //spaces and alphabets are not allowed
    if (!n) 
    {
        document.getElementById('words').style="color:red";
        return 'Enter Valid Amount!!'; 
    }
    
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';        
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees only ' : '';
    document.getElementById('words').style="color:green";
    return str;
}

function CaptchaGenerate() {
    var Rnum1 = Math.floor((Math.random() * 100));
    var Rnum2 = Math.floor((Math.random() * 10));
    var opNum = Math.floor((Math.random() * 3) + 1);

    var userResult = document.getElementById("result").value;
    document.getElementById("num1").innerHTML = Rnum1;
    document.getElementById("num2").innerHTML = Rnum2;
    var operator;
    var ActualResult;
    switch (opNum) {
        case 1:
            operator = "+";
            ActualResult = Rnum1 + Rnum2;
            break;
        case 2:
            operator = "-";
            ActualResult = Rnum1 - Rnum2;
            break;
        case 3:
            operator = "x";
            ActualResult = Rnum1 * Rnum2;
            break;
    }
    document.getElementById("operator").innerHTML = operator;
    sessionStorage.setItem("ActualResult",ActualResult);
}

function CaptchaValidation()
{
    var userResult = document.getElementById("result").value;
    var ActualResult=sessionStorage.getItem("ActualResult");
    if (ActualResult == userResult) {
        document.getElementById("captchamsg").innerHTML = "Captcha validation Successful";
        document.getElementById("captchamsg").style = "color:green";
        document.getElementById("result").value= ""; 
        enableSubmitButton();
        NameValidation();
        EmailValidation();
        PanValidation();
        LoanAmtValidation();
    }
    else {
        document.getElementById('submit').disabled = true;
        document.getElementById("captchamsg").innerHTML = "Try Again";
        document.getElementById("captchamsg").style = "color:red";
        document.getElementById("result").value = "";
        CaptchaGenerate();
    }
}
function enableSubmitButton()
{
    if((document.getElementById("full-name").value.length > 0) &&
    (document.getElementById("email").value.length > 0) &&
    (document.getElementById("pan").value.length > 0) &&
    (document.getElementById("loanAmt").value.length > 0) )
    {
    document.getElementById('submit').disabled = false;
    }
}

function generateOtp() {
    const val = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("otpout").value = val;
    document.getElementById("otpmsg").innerHTML="";
}

var count=0;
function ValidateOTP() {
    count+=1;
    if(count>=3)
    {
        count=0;
        window.location.replace("http://pixel6.co/error.html");
    }
    var a = document.getElementById("otpin").value;
    var b = document.getElementById("otpout").value;
    if (a == b && b.length>0) {
        document.getElementById("otp").disabled="true";
        window.location.replace("http://pixel6.co/");
    }
    else {
         document.getElementById("otpmsg").innerHTML='Invalid OTP !!! ';
    }
}

document.getElementById('namein').innerHTML = sessionStorage.getItem("nameout");
document.getElementById('mailin').innerHTML = sessionStorage.getItem("mailout");
