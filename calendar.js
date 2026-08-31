
async function getCalendarEvents() {
  const events = await window.electronAPI.getCalendarEvents();
  console.log('raw events:', events)  // <- temporary
  displayEvents(events)
}

function displayEvents(events) {
  const todayList = document.getElementById('todayList')
  const upcomingList = document.getElementById('upcomingList')
  todayList.textContent = ""//clear and rewrite
  upcomingList.textContent = ""  //clear and rewrite
  events.forEach(event  => {
    const eventItem = document.createElement('div')
    eventItem.className = "eventItem"
    const startDate = new Date(event.start.dateTime)
    const eventTitle = event.summary // event.summary is the event's title
    const today = new Date
    const tomorrow = new Date;
    tomorrow.setDate(tomorrow.getDate()+1);

    if(event.start.dateTime != undefined)
    {
      if(startDate.toDateString() === today.toDateString())
      {
        let hours = startDate.getHours()
        let minutes = startDate.getMinutes()
        if(minutes < 10)
        {
          minutes = minutes.toString()
          minutes = "0" + minutes
        }    

        // 24 hr time to 12 hr time
        const amPm = hours >= 12 ? 'pm' : "am"
        hours = hours % 12
        hours = hours ? hours:12 //hour 0 should be 12
            
        eventItem.textContent = eventTitle + " " +'@'+ `${hours}:${minutes} ${amPm}`
        todayList.appendChild(eventItem)
      }
      else if(startDate.toDateString() === tomorrow.toDateString())
      {
        let hours = startDate.getHours()
        let minutes = startDate.getMinutes()
        if(minutes < 10)
        {
          minutes = minutes.toString()
          minutes = "0" + minutes
        }    

        // 24 hr time to 12 hr time
        const amPm = hours >= 12 ? 'pm' : "am"
        hours = hours % 12
        hours = hours ? hours:12 //hour 0 should be 12
            
        eventItem.textContent = eventTitle + " " +'@'+ `${hours}:${minutes} ${amPm}`
        upcomingList.appendChild(eventItem)
      }
   }
    else //all day events
    {
      const [year, month, day] = event.start.date.split('-').map(Number)
      const startDate = new Date(year, month - 1, day)  // month is 0-indexed
      const today = new Date()
      
      if (startDate.toDateString() === today.toDateString()) 
      {
        eventItem.textContent = eventTitle
        todayList.appendChild(eventItem)
      }
      else if(startDate.toDateString() === tomorrow.toDateString())
      {
        eventItem.textContent = eventTitle
        upcomingList.appendChild(eventItem)
      }
    }   
    const starIcon = document.createElement('i')
    starIcon.classList.add("fa-solid", "fa-star")
    eventItem.appendChild(starIcon)
  })
}

getCalendarEvents();
setInterval(getCalendarEvents, 1800000);  // refresh every 30 min, same as weather