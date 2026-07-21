
async function getCalendarEvents() {
  const events = await window.electronAPI.getCalendarEvents()
  displayEvents(events)
}

function displayEvents(events) {
  const calendarContainer = document.getElementById('calendarContainer')
  calendarContainer.textContent = ""  //clear and rewrite
  events.forEach(event => {
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
        const amPm = hours > 12 ? 'pm' : "am"
        hours = hours % 12
        hours = hours ? hours:12 //hour 0 should be 12
            
        eventItem.textContent = eventTitle + " " +'@'+ `${hours}:${minutes} ${amPm}`
        calendarContainer.appendChild(eventItem)
      }            
   }
    else
    {
      const startDate = new Date(event.start.date)
      const today = new Date()

      if (startDate.toDateString() === today.toDateString()) 
      {
        eventItem.textContent = eventTitle
        calendarContainer.appendChild(eventItem)
      }
    }   
    const starIcon = document.createElement('i')
    starIcon.classList.add("fa-solid", "fa-star")
    eventItem.appendChild(starIcon)
  })
}

getCalendarEvents()