var birthdayInp = document.querySelector("#birthday-date");
var checkBtn = document.querySelector("#check-btn");
var outputMessage = document.querySelector("#output");

function reverseString(str) {
  var splitString = str.split('');
  var charReverse = splitString.reverse();
  var joinString = charReverse.join('');

  return joinString;
}


function isPalindrome(str1) {
  var reverseStr = reverseString(str1);
  return str1 === reverseStr;
}

function convertingString(date) {
  var convertedStr = {
    day: '',
    month: '',
    year: ''
  };

  //day
  if (date.day < 10) {
    convertedStr.day = '0' + date.day;
  }
  else {
    convertedStr.day = date.day.toString();
  }

  //month
  if (date.month < 10) {
    convertedStr.month = '0' + date.month;
  }
  else {
    convertedStr.month = date.month.toString();
  }

  //year
  convertedStr.year = date.year.toString();

  return convertedStr;
}

function dateVariation(date) {
  var convertedDate = convertingString(date);

  var ddmmyyyy = convertedDate.day + convertedDate.month + convertedDate.year;
  var mmddyyyy = convertedDate.month + convertedDate.day + convertedDate.year;
  var yyyymmdd = convertedDate.year + convertedDate.month + convertedDate.day;
  var ddmmyy = convertedDate.day + convertedDate.month + convertedDate.year.slice(-2);
  var mmddyy = convertedDate.month + convertedDate.day + convertedDate.year.slice(-2);
  var yymmdd = convertedDate.year.slice(-2) + convertedDate.month + convertedDate.day;

  return dateArray = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];


}

function palindromeCheck(date) {
  var checkDate = dateVariation(date);

  var check = false;

  for (var index = 0; index < checkDate.length; index++) {
    if (isPalindrome(checkDate[index])) {
      check = true;
      break;
    }
  }

  return check;
}

function leapYear(year) {

  if (year % 400 === 0) {
    return true;
  } else
    if (year % 100 === 0) {
      return false;
    } else
      if (year % 4 === 0) {
        return true;
      } else {
        return false;
      }
}

function upcomingDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }


    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysOfMonth[month - 1]) {
      day = 1;
      month++
    }
  }

  if (month > 12){
    month = 1;
    year++;
  }

  return {
    day: day,
    month : month,
    year : year
  };

}


function nextPalindrome(date){
  var counter=0;
  var nextDate = upcomingDate(date);
  
  while(1){
    counter++;
    var palindrome =palindromeCheck(nextDate);
    if (palindrome){
      break;
    }
    nextDate = upcomingDate(nextDate);
  }

  return [counter, nextDate];
  }

var date = {
  day: 29,
  month: 2,
  year: 2016
};


function checkButtonHandler(e){
  var inputBirthday = birthdayInp.value;
  
  if (inputBirthday !== ''){
    var dateList = inputBirthday.split('-');
    
   
    var date = {
      day: Number(dateList[2]),
      month: Number(dateList[1]),
      year: Number(dateList[0])
    };

    var palindrome = palindromeCheck(date);

    if(palindrome){
      outputMessage.innerText = "Congratulations! Your birthday is a Palindrome";
    }
    else {
      var [counter, nextDate] = nextPalindrome(date);
      outputMessage.innerText= `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. Sorry, You missed by ${counter} days`;
    }
  }
}


checkBtn.addEventListener('click', checkButtonHandler);