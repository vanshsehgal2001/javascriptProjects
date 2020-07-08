//GIT JS FILE CONTENT

window.onload=function(){
	document.getElementById('searchUser').value=''
}

class Github{
	constructor(){
		this.client_id='c7d34be080692168ce58'
		this.client_secret='d5c5e3e5c80d1dc123ce269e42f2a72f86d95389'
		this.repos_count=5;
		this.repos_sort='created: asc'
	}
	async getUser(userName){
		const profileResponse=await fetch(`https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

		const repoResponse=await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
		//console.log(profileResponse)
		const profleData=await profileResponse.json();
		const repos=await repoResponse.json()
		//console.log(profleData)

		return {
			profile: profleData,
			repos
		}
	}
}

//UI JS FILE CONTENT

class UI{
	constructor(){
		this.profile=document.getElementById('profile')
	}

	showProfile(data){
		this.profile.innerHTML=`
			<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${data.avatar_url}">
            <a href="${data.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${data.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${data.public_gists}</span>
            <span class="badge badge-success">Followers: ${data.followers}</span>
            <span class="badge badge-info">Following: ${data.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${data.company}</li>
              <li class="list-group-item">Website/Blog: ${data.blog}</li>
              <li class="list-group-item">Location: ${data.location}</li>
              <li class="list-group-item">Member Since: ${data.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
		`
	}
	clearProfile(){
		this.profile.innerHTML=''
	}

	showAlert(message,className){
		this.removeAlert();
		const err=document.createElement('div');
		const container=document.querySelector('.searchContainer')
		const card=document.querySelector('.search')

		err.className=className;
		err.appendChild(document.createTextNode(message))

		container.insertBefore(err,card)

		setTimeout(this.removeAlert,2000)
	}
	removeAlert(){
		const cAlert=document.querySelector('.alert');

		if(cAlert){
			cAlert.remove()
		}
	}
	showRepos(repos){
		let output=''

		repos.forEach(function(repo){
			output+=`
			<div class="card card-body mb-2">
         	 <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
			`
		})
		document.querySelector('#repos').innerHTML=output
	}
}

//GIT_FIND JS FILE CONTENT(I MEAN THIS FILE ONLY)

const git=new Github;
const ui=new UI;
const searchUser=document.getElementById('searchUser')

searchUser.addEventListener('keyup',e =>{
	const text=e.target.value;
	if(text!==''){
		git.getUser(text)
		.then(data =>{
			if(data.profile.message === 'Not Found'){
				ui.showAlert('User Not Found','alert alert-danger')	
			}
			else{
				ui.showProfile(data.profile)
				ui.showRepos(data.repos)
			}
		})
	}
	else{
		ui.clearProfile();
	}
})
