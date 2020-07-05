/* Global Variables */
let ZipCode,Feelings;
const GenButton =  document.getElementById('generate');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// API credentials
const apiKey = '&appid=b205288d70932f9796615322abc43326'; 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// client side code
GenButton.onclick = Action;

function Action(){
    if(document.getElementById('zip').value != '' && document.getElementById('feelings').value!=''){
        ZipCode =  document.getElementById('zip').value;
        Feelings = document.getElementById('feelings').value;
        document.getElementById('zip').value = '';
        document.getElementById('feelings').value='';
        
        // const TempData =  getDataFromSite(baseURL,ZipCode,apiKey);//then
    
        getDataFromSite(baseURL,ZipCode,apiKey) // zipcode 
        .then(function(data){ // async function
            console.log(data);
            // console.log(data.weather[0].description);
            let dic = {date:newDate,temp:data.main.temp, City:data.name, weather: data.weather[0].description ,Feeling:Feelings};
            PostData('/all',dic); // push data
            // console.log(dic);
        })
        .then(upDateUI) // get data then update ui
    }
    else {alert('Empty Fields\nPlease Set Values'); return '';}
}

const getDataFromSite = async (URL,CityId,key)=>{

    const res = await fetch(URL+CityId+key);
    try{
        const data = res.json();
        // console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }

}

const PostData = async (url = '',data = {}) => {
    
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        // convert json to string
        body: JSON.stringify(data),
        // construct json
    });
    try{
        console.log('json response', response.json());
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error",error);
    }
}

// update ui depend on date from openWeatherMap API
const upDateUI = async ()=> {
    const results = await fetch('/all');
    try{
        const dataFetched  = await results.json();
        console.log('data fetched ',dataFetched);
        // console.log(' dd' , dataFetched.date);
        document.getElementById('date').innerHTML = 'Date today: '+ dataFetched.date + ' in ' + dataFetched.City + ' City ';
        document.getElementById('temp').innerHTML = 'Current Temperature '+ dataFetched.temp + ' Weather is ' + dataFetched.weather ;
        document.getElementById('content').innerHTML = 'Your Feelings ' + dataFetched.Feeling;

    }catch(err){console.log('updateui fetch error ',err);}
}