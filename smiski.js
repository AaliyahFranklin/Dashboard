function displaySmiski(){
    let randomNum = Math.random % 2 // random int between 0-2
    const smiski0 = document.createElement('img')
    const smiski1 = document.createElement('img')
    const smiski2 = document.createElement('img')
    const smiski3 = document.createElement('img')
    const smiski4 = document.createElement('img')
    const smiski5 = document.createElement('img')
    const smiski6 = document.createElement('img')
    const smiski7 = document.createElement('img')

    smiski0.src = "smiskis/approveSmiski.png"
    smiski1.src = "smiskis/laptopSmiski.png"
    smiski2.src = "smiskis/pillowSmiski.png"
    smiski3.src = "smiskis/splatSmiski.png"
    smiski4.src = "smiskis/teacherSmiski.png"
    smiski5.src = "smiskis/wootSmiski.png"
    smiski6.src = "smiskis/workSmiski.png"
    smiski7.src = "smiskis/yogaSmiski.png"
    
    const imgArray = [smiski0, smiski1,smiski2,smiski3,smiski4,smiski5,smiski6,smiski7]
    
    const container = document.getElementById("smiskiContainer")
    container.appendChild(imgArray[0])
}
displaySmiski() 