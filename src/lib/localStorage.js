export const getAuthToken = () =>{
    try{
        let token = localStorage.getItem('token')
        return token
    }catch(err){
        console.log(err,'getAuthToken__errr')
    }
}