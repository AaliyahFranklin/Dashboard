

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
async function getWeather(){
const city = 'Eugene'; 
const units = 'imperial'; 

// Construct the secure api.openweathermap.org endpoint URL
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
try{
  const response = await fetch(url)
   if (!response.ok) { 
    throw new Error(`City not found or server error (Status: ${response.status})`);
    }
  const data = await response.json()
  displayWeather(data)
}
catch(error)
{
  console.error('failed to do the thing:',error.message)
}
}


function displayWeather(data)
{
  //parent container
  const weatherContainer = document.getElementById("weatherContainer")

  //get data
  const cityName = data.name
  let temp = data.main.temp;
  temp = Math.round(temp) //temp rounded to the nearest integer
  const description = data.weather[0].description;

  //display icon
  const iconCode = data.weather[0].icon;
  const weatherIcon = document.createElement('img')
  weatherIcon.className ='weatherIcon'
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherContainer.appendChild(weatherIcon)

  //display descripton
  const weatherDiscription = document.createElement('p')
  weatherDiscription.className = 'weatherDescription'
  weatherDiscription.textContent = description
  weatherContainer.appendChild(weatherDiscription)

  //display temp
  const weatherTemp = document.createElement('p')
  weatherTemp.className ='weatherTemp'
  weatherTemp.textContent = `${temp}°F`
  weatherContainer.appendChild(weatherTemp)
  console.log(`Weather in ${cityName}:`);
  console.log(`Temperature: ${temp}°F`);
  console.log(`Condition: ${description}`);
}
getWeather()
getTime()
getDate()
setInterval(getTime, 1000) //updates every sec