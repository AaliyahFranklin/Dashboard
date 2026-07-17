

function getTime(){   
   const now = new Date;
   let hours = now.getHours()  //0-23
   let minutes = now.getMinutes()//0-59
   if(minutes < 10)
   {
    minutes = minutes.toString()
    minutes = "0" + minutes
   }

   // 24 hr time to 12 hr time
   hours = hours % 12
   hours = hours ? hours:12 //hour 0 should be 12

   let timeElement = document.getElementById('time')
   timeElement.textContent = `${hours}:${minutes}`

}

function getDate()
{
  const now = new Date;
  let month = now.getMonth()
  let date = now.getDate()
  let day = now.getDay()
  const dayNames = {
    0:'Sun',
    1:'Mon',
    2:'Tue',
    3:'Wed',
    4:'Thu',
    5:'Fri',
    6:'Sat'
  }
  const monthNames ={
    0:'Jan',
    1:'Feb',
    2:'Mar',
    3:'Apr',
    4:'May',
    5:'Jun',
    6:'Jul',
    7:'Aug',
    8:'Sep',
    9:'Oct',
    10:'Nov',
    11:'Dec',
  }
  let dayName = dayNames[day]
  let monthName = monthNames[month]

  let dateElement = document.getElementById('date')
  dateElement.textContent = `${dayName} ${monthName} ${date}`
}


getTime()
getDate()
setInterval(getTime, 1000) //updates every sec