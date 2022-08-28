import React from 'react';
import axios from 'axios';
class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      display_name:'',
      lat:'',
      lon:'',
      error : 'sorry something',
      errorFlag : false,
      imgerrorFlag : false
    }
  }

  gitLocData = async (e)=>{
    e.preventDefault();
    const cityName = e.target.city.value;
    let key = 'pk.1ed11f75d75e6a8c33f7c8e4afae6908';
    const Url =`https://eu1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`
    try{
      let resResult = await axios.get(Url)
      
      
      this.setState({
        display_name : resResult.data[0].display_name,
        lat : resResult.data[0].lat,
        lon : resResult.data[0].lon,
        image : `https://maps.locationiq.com/v3/staticmap?key=pk.1ed11f75d75e6a8c33f7c8e4afae6908&center=${resResult.data[0].lat},${resResult.data[0].lon}`
      })
    }catch{
      console.log('Error')
      this.setState({
        errorFlag:true
      })
    }

  }
  render(){
    
    return(
      <div>
        <h1>loc</h1>
        <form onSubmit={this.gitLocData}>
          <input type="text" name="city" placeholder='Enter a city' ></input>
          <button type='submit'>Submit</button> 
        </form>
        <h3>Display name: {this.state.display_name} </h3>
        <p>Lon : {this.state.lon}</p>
        <p>Lat : {this.state.lat}</p>

        {this.state.errorFlag && <h4>Error 404 : {this.state.error}</h4>}
        <img src= {this.state.image} />

      </div>
    )
  }
}
export default App;