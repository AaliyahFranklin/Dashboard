
async function getCalendarEvents() {
  const events = await window.electronAPI.getCalendarEvents()
  console.log('raw events:', events)  // <- temporary
  displayEvents(events)
}

function displayEvents(events) {
  const eventList = document.getElementById('eventList')
  eventList.textContent = ""  //clear and rewrite
  events.forEach(event  => {
    
    const eventItem = document.createElement('div')
    eventItem.className = "eventItem"

    const eventTitle = event.summary// event.summary is the event's title
    const eventTime = event.start.dateTime // event.start.dateTime (or event.start.date for all-day events) is when it starts
    if(event.start.dateTime != undefined)
    {
      const startDate = new Date(event.start.dateTime)
      const today = new Date

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
        eventList.appendChild(eventItem)
        
      }            
   }
    else
    {
      const [year, month, day] = event.start.date.split('-').map(Number)
      const startDate = new Date(year, month - 1, day)  // month is 0-indexed
      const today = new Date()
      
      if (startDate.toDateString() === today.toDateString()) 
      {
        eventItem.textContent = eventTitle
        eventList.appendChild(eventItem)
      }
    }   
    const starIcon = document.createElement('i')
    starIcon.classList.add("fa-solid", "fa-star")
    eventItem.appendChild(starIcon)
  })
}

getCalendarEvents()
setInterval(getCalendarEvents, 1800000)  // refresh every 30 min, same as weather