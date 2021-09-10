export const orderAZ = (a,b) => {
    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
    return 0
}


const orderDifficulty = (n) =>{
    if(n==="Fácil"){
        return 1
      }
      if(n==="Moderado"){
        return 2
      }else{
        return 3
      }
}

export const orderDifficultyAsc = (a,b) => {
    if(orderDifficulty(a.difficulty) > orderDifficulty(b.difficulty)) return 1
    if(orderDifficulty(a.difficulty) < orderDifficulty(b.difficulty)) return -1
    return 0
}