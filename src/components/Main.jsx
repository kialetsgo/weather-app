import React from 'react'
import "./Main.css"

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
        // const result = await fetch(`api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${apiKey}`)
        await fetch(`api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${apiKey}`)
            // .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.response)
                    this.setState({
                        isLoaded: true,
                        weatherData: result
                    })
                    console.log(this.state.weatherData)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log('error')
                    console.log(this.state)
                }
            )
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

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h2>Today's Weather</h2>
                </div>
                <hr />
                <div className="search-area">
                    City: <input type="text" className="font-weight-bold inputs" id="input-city" value={this.state.city} onChange={e => { this.handleChange(e, 'city') }}></input>
                    Country: <input type="text" className="font-weight-bold inputs" id="input-country" value={this.state.country} onChange={e => { this.handleChange(e, 'country') }}></input>
                    <button onClick={this.fetchData}>Search</button>
                    <button onClick={this.clearInput}>Clear</button>
                </div>
                <div className="display-weather">
                    <h4 className="location-name">{this.state.city},</h4>
                    <h4 className="location-name">{this.state.country}</h4>
                    {/* <h1>{this.state.weatherData.weather.main}</h1> */}
                </div>
            </div>
        )
    }
}

export default Main
