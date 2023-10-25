document.addEventListener("DOMContentLoaded", ()=>{

    const grid= document.querySelector(".grid")
    const scoreDisplay= document.querySelector("#score");
    const width=8
    const squares=[]
    const candyImages = [
        'url(candies/candy1.png)',
        'url(candies/candy2.png)',
        'url(candies/candy3.png)',
        'url(candies/candy4.png)',
        'url(candies/candy5.png)',
        'url(candies/candy6.jpeg)']
    
    let imageBeingDragged
    let imageBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    let score= 540
    
    scoreDisplay.innerHTML = score

    setInterval(() => {
        moveDown()
    },100)

    //create board
    function createBoard(){
        for (let i=0; i<width*width; i++){
            const square = document.createElement("div")
            //making the squares draggable
            square.setAttribute("draggable",true)
            //give id to each square
            square.setAttribute("id",i)
            //generating  a random candyImage after a square has been created
            let randomImage =Math.floor(Math.random()*candyImages.length)
            square.style.backgroundImage =candyImages[randomImage]
            grid.appendChild(square)
            squares.push(square)

            // removing background repeat for the images in each square
        for (let i = 0; i < candyImages.length; i++) {
            let imageUrl = candyImages[i].slice(4, -1); // remove 'url(' and ')' from the string
            square.style.backgroundImage = imageUrl;
            square.style.backgroundRepeat = 'no-repeat';
        }

        }
    }
    createBoard()

    //drag the candies
    squares.forEach(square => {
        square.addEventListener('dragstart',dragstart)
    })
    squares.forEach(square => {
        square.addEventListener('dragend',dragend)
    })
    squares.forEach(square => {
        square.addEventListener('dragover',dragover)
    })
    squares.forEach(square => {
        square.addEventListener('dragenter',dragenter)
    })
    squares.forEach(square => {
        square.addEventListener('dragleave',dragleave)
    })
    squares.forEach(square => {
        square.addEventListener('drop',dragDrop)
    })

   
    function dragstart(){
        imageBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
    }
    
   function dragDrop(){
        imageBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced= parseInt(this.id)
        this.style.backgroundImage = imageBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = imageBeingReplaced
   }

   function dragover(event) {
       event.preventDefault();
   }

   function dragenter(event) {
       event.preventDefault();
   }
   
   function dragleave(event) {
       event.preventDefault();
   }
   
   function dragend(){
       let validMoves=[
           squareIdBeingDragged-1,
           squareIdBeingDragged-width,
           squareIdBeingDragged+1,
           squareIdBeingDragged+width
       ]
       let validMove= validMoves.includes(squareIdBeingReplaced)

       if (squareIdBeingReplaced && validMove){
           squareIdBeingReplaced= null

       }else if (squareIdBeingReplaced && !validMove){
           squares[squareIdBeingReplaced].style.backgroundImage= imageBeingReplaced
           squares[squareIdBeingDragged].style.backgroundImage= imageBeingDragged
       }else{
           squares[squareIdBeingDragged].style.backgroundImage= imageBeingDragged
       }
   }
   
   // add some candies once others have been cleared

   function moveDown() {
       for (let i = 0; i < 56; i++) {
           if (squares[i + width].style.backgroundImage === '') {
               squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
               squares[i].style.backgroundImage = '';
           }
       }

       // Add new random images to the squares in the first row if they are blank
       for (let i = 0; i < width; i++) {
           if (squares[i].style.backgroundImage === '') {
               let randomImage = Math.floor(Math.random() * candyImages.length);
               squares[i].style.backgroundImage = candyImages[randomImage];
           }
       }
   }

    //checking for matches

    //check row for four matches

    function checkRowOfFour(){
        for (i=0; i<60; i++){
            let rowOfFour= [i, i+1, i+2,i+3]
            let decidedImage= squares[i].style.backgroundImage
    
            const notValid= [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
            if (notValid.includes(i)) continue
    
            if (rowOfFour.every(index=> squares[index].style.backgroundImage == decidedImage && squares[index].style.backgroundImage != '')){
                score+= 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index=> {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    
    function checkColumnOfFour(){
        for (let i=0; i < width * width - width * 3; i++){
            let columnOfFour= [i, i+width,i+width*2,i+width*3]
            let decidedImage= squares[i].style.backgroundImage
    
            if (columnOfFour.every(index=> squares[index].style.backgroundImage == decidedImage && squares[index].style.backgroundImage != '')){
                score+= 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index=> {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    
    
    function checkRowOfThree(){
        for (i=0; i<61; i++){
            let rowOfThree= [i, i+1, i+2]
            let decidedImage= squares[i].style.backgroundImage
    
            const notValid=[ 6,7,14,15,22,23,30,31,39,46,47,54,55]
            if (notValid.includes(i)) continue
    
            if (rowOfThree.every(index=> squares[index].style.backgroundImage == decidedImage && squares[index].style.backgroundImage != '')){
                score+= 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index=> {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    
    function checkColumnOfThree(){
        for (i=0; i<47; i++){
            let columnOfThree= [i, i+width,i+width*2]
            let decidedImage= squares[i].style.backgroundImage
    
            if (columnOfThree.every(index=> squares[index].style.backgroundImage == decidedImage && squares[index].style.backgroundImage != '')){
                score+= 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index=> {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    
    
    
    window.setInterval(function(){
        checkRowOfFour()
        checkColumnOfFour()
        checkRowOfThree()
        checkColumnOfThree()
    },100)
    
    
})
    





