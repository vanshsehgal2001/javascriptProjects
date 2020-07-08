const apiKey='cdb9f3975f4e4fa18bb3a9b0c4ab6161'
const country='us'

const xhr=new XMLHttpRequest();
xhr.open('GET',`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`,true)

xhr.onload=function(){
  if(this.status===200){
    const data=JSON.parse(this.responseText);
    const articles=data.articles;
    
    let output='';
    articles.forEach(function(item,index){
      output+=`
      <div class="accordion" id="accordionExample">
       <div class="card">
        <div class="card-header" id="heading${index}">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left" data-toggle="collapse"  data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
              <h6><span class="badge badge-danger"># ${index+1}</span></h6>${item.title}
            </button>
          </h2>
        </div>

        <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample" >
          <div class="card-body">
            ${item.description}.<a target="_blank" href="${item.url}">Read More....</a>
          </div>
        </div>
      </div>

      `
      document.querySelector('#accordionExample').innerHTML=output;
    })
  }
  else{
    console.log('Error!!!!')
  }
}

xhr.send();

const button=document.getElementById('btn-search');
// const data=document.getElementById('accordionExample')

button.addEventListener('input',searchByTitle);

function searchByTitle(e){

  let input=e.target.value.toLowerCase();
  let cards=document.getElementsByClassName('card');
  cards=Array.from(cards)

  cards.forEach(function(card){
    let cardHeading=card.getElementsByTagName('h2');
    let array=cardHeading[0].innerText.split("\n")
    let fContent=array[1].toLowerCase();

    if(fContent.includes(input)){
      card.style.display='block'
    }
    else{
      card.style.display='none'  
    }
  })

  e.preventDefault()
}


