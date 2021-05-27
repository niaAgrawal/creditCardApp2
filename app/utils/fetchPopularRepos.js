import { Profiler } from "react"

const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
  if(message === 'Not found'){
    return `${username} doesn't exist`
  }
  return message
}

function getProfile (username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username))
      }
      return profile
    })
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos)=>{
      if(repos.message){
        throw new Error(getErrorMsg(repos.message, username))
      }
      return repos
    })
}

function getStartCount(repos){
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
}
function calculateScore(followers, repos) {
  return (followers * 3) + getStartCount(repos)
}

function getUserData(player){
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos])=>({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}

function sortPlayer(results){
  return results.sort((a,b )=> a.score - b.score)
}
export function BattleBtn (playerOne, playerTwo) {
  return Promise.all([
    getUserData(playerOne),
    getUserData(playerTwo)
  ]).then((results)=> sortPlayer(results))
}
export function fetchPopularRepos (language) {

  const pathUrl = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return fetch(pathUrl)
    .then((res)=> res.json())
    .then(data => {
      if(!data.items){
         throw new Error(data.message) 
      }
      return data.items
    })
}