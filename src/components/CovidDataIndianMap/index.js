import React from 'react'
import DatamapsIndia from 'react-datamaps-india'

const CovidDataIndianMap = () => {
    let obj = {}
    const covidDetails = async() =>{
        const stateURL = 'https://data.covid19india.org/data.json'
        const options = {
            method: 'GET'
        }

        let response = await fetch(stateURL, options)
        let jsonData = await response.json()
        let stateWiseData = jsonData?.statewise
        console.log(jsonData?.statewise)
        stateWiseData.forEach( eachstate =>{
            let stateName = ''
            if(eachstate.state === 'Andaman and Nicobar Islands'){
                    stateName = 'Andaman & Nicobar Island'
            }else if(eachstate.state === 'Arunachal Pradesh'){
                stateName = 'Arunanchal Pradesh'
            }else if(eachstate.state === 'Jammu and Kashmir'){
                stateName = 'Jammu & Kashmir'
            }
            else{
                stateName = eachstate.state
            }
            obj[stateName] = {
                     name: stateName,
                    value: eachstate.active,
                    deaths: eachstate.deaths,
                    Confirmed: eachstate.confirmed,
                    recovered: eachstate.recovered,

            }
          })
        console.log(obj)
    }

    covidDetails()
    
  return (
    <div>
        <h1>Covid Report State Wise</h1>
        <DatamapsIndia style={{backgroundColor:'blue'}}
      regionData={obj}
      hoverComponent={({ value }) => {
        return (
          <>
            <p>{value.name}</p>
            <p>Active: {value.value}</p>
            <p>Death's: {value.deaths}</p>
            <p>Confirmed: {value.Confirmed}</p>
            <p>Recovered: {value.recovered}</p>
          </>
        )
      }}
      mapLayout={{
        legendTitle: '',
        startColor: '#FFDAB9',
        endColor: '#FF6347',
        hoverTitle: 'Count',
        noDataColor: '#f5f5f5',
        borderColor: '#8D8D8D',
        hoverBorderColor: '#8D8D8D',
        hoverColor: 'green',
      }}
    />
    </div>
  )
}

export default CovidDataIndianMap