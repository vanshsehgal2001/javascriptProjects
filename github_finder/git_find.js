// //GIT JS FILE CONTENT

// class Github{
// 	constructor(){
// 		this.client_id='c7d34be080692168ce58'
// 		this.client_secret='d5c5e3e5c80d1dc123ce269e42f2a72f86d95389'
// 	}
// 	async getUser(userName){
// 		const profileResponse=await fetch(`https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

// 		//console.log(profileResponse)
// 		const profleData=await profileResponse.json();
// 		//console.log(profleData)

// 		return {
// 			profile:profleData
// 		}
// 	}
// }

// //UI JS FILE CONTENT

// class UI{
// 	constructor(){
// 		this.profile=getElementById('profile')
// 	}

// 	showProfile(data){
		
// 	}
// }

// //GIT_FIND JS FILE CONTENT(I MEAN THIS FILE ONLY)

// const git=new Github;
// const ui=new UI;
// const searchUser=document.getElementById('searchUser')

// searchUser.addEventListener('keyup',e =>{
// 	const text=e.target.value;

// 	if(text!==''){
// 		git.getUser(text)
// 		.then(data =>{
// 			if(data.profile.message === 'Not Found'){

// 			}
// 			else{
// 				ui.showProfile(data.profile)
// 			}
// 		})
// 	}
// 	else{

// 	}
// })
