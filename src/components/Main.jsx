import React from 'react'
import "./Main.css"
import moment from 'moment'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            // set default to sg and componentdidmount it... will display
            country: "SG",
            city: "Singapore",
            weatherData: [],
            searchHistory: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        let apiKey = '0c4f6e87688f2e5be796c822e9aa6986'
        try {
            const fetchResult = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${apiKey}`)
            const result = await fetchResult.json() //parsing the response
            if (fetchResult.ok) {
                this.setState({
                    isLoaded: true,
                    weatherData: result,
                    searchHistory: { ...this.state.searchHistory, result }
                })
                console.log(result)
                console.log(this.state)
                return result
            }
        }
        catch (error) {
            return null
        }
    }

    handleChange(e, elemName) {
        this.setState({ [elemName]: e.target.value })
        console.log(this.state)
    }

    // binding needed, alternatively use arrow function
    clearInput = () => {
        this.setState({
            city: "",
            country: "",
        })
        console.log(this.state)
    }

    dateConverter(time) {
        let timeStamp = moment.unix(time).format("YYYY-MM-DD HH:mm")
        return timeStamp
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h2>Today's Weather</h2>
                </div>
                <hr />
                <div className="page-display">
                    <div className="search-area">
                        City: <input type="text" className="font-weight-bold inputs" id="input-city" value={this.state.city} onChange={e => { this.handleChange(e, 'city') }}></input>
                    Country: <input type="text" className="font-weight-bold inputs" id="input-country" value={this.state.country} onChange={e => { this.handleChange(e, 'country') }}></input>
                        <button onClick={this.fetchData}>Search</button>
                        <button onClick={this.clearInput}>Clear</button>
                    </div>
                    <div className="display-weather">
                        <h4 className="location-name">{this.state.weatherData.name},</h4>
                        <h4 className="location-name">{this.state.weatherData.sys && this.state.weatherData.sys.country}</h4>
                        <h2>{this.state.weatherData.weather && this.state.weatherData.weather[0].main}</h2>
                        <h4>Description: {this.state.weatherData.main && this.state.weatherData.weather[0].description}</h4>
                        <h4 className="temperature">Temperature: {this.state.weatherData.main && this.state.weatherData.main.temp_min}°C ~</h4>
                        <h4 className="temperature"> {this.state.weatherData.main && this.state.weatherData.main.temp_max}°C</h4>
                        <h4>Humidity: {this.state.weatherData.main && this.state.weatherData.main.humidity}%</h4>
                        <h4>Time: {this.dateConverter(this.state.weatherData.dt)} PM</h4>
                    </div>
                </div>
                <div className="search-history">
                    {/* {
                        this.state.searchHistory
                    } */}
                </div>
            </div>
        )
    }
}

export default Main
