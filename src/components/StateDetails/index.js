import { Component } from "react";
import Popup from 'reactjs-popup'
import ShareGmail from "../ShareGmail";
import './index.css'
import 'reactjs-popup/dist/index.css'
import {Link} from 'react-router-dom'
import { TiDelete } from 'react-icons/ti';
class StateDetails extends Component{
        state = {
            stateDetails : [],
            searchStateInput: '',
            sort: false,
            onsearchState: false,
        }

    getStateWiseDetails = async () =>{
        const stateURL = 'https://data.covid19india.org/data.json'
        const options = {
            method: 'GET'
        }

        let response = await fetch(stateURL, options)
        let jsonData = await response.json()
        this.setState({
            stateDetails: jsonData.statewise		
        })
    }

    onChangeSearchInput = event => {
        this.setState({
            onsearchState: true,
            searchStateInput: event.target.value,
            
        })
      }

    sortStates = () =>{
        let {stateDetails} = this.state
        let sortdata = stateDetails.sort((a, b) => {
            return a.confirmed - b.confirmed;
        });

        this.setState({
            stateDetails:sortdata,
            sort: true
        })
    }

    normallOrder = () => {
        this.getStateWiseDetails()
        this.setState({
            sort: false
        }) 
    }

    componentDidMount(){
           this.getStateWiseDetails() 
    }

    render(){
        const {stateDetails, searchStateInput, sort, onsearchState} = this.state
        const searchStateResults = stateDetails.filter( each =>
            each.state.toUpperCase().includes(searchStateInput.toUpperCase())
          )
        console.log(searchStateResults)
        return(
           
            <div className="state-view">
                <input
                    type="search"
                    onChange={this.onChangeSearchInput}
                    value={searchStateInput}
                    placeholder="Search by State Name"
                    className="input-style"
                />
                {sort === false ? (<button type="button" onClick={this.sortStates} className='Sort-button'>Sort to Confirmed Cases</button>):
                (<button type="button" onClick={this.normallOrder} className='Sort-button'>Actually Order</button>)}
                <Link to={'/mapview'} className='link-style-map'>Map View</Link>
                <ul className="card-container">
                {searchStateResults.map( (each,i)  => {
                return(     
                <li className="list-container" key={i}>
                        <h1 className="state-heading">{each.state}</h1>
                        <div className='card-inside-container'>
                            <div className="card-top">
                                <h1 className="text-content">Active Cases: {each.active}</h1>
                                <h1 className="text-content">Confirmed Cases: {each.confirmed}</h1>
                            </div>
                            <div className="card-top">
                                <h1 className="text-content">Death Cases: {each.deaths}</h1>
                                <h1 className="text-content">Recovered Cases: {each.recovered}</h1>
                            </div>
                            <div className="card-top">
                            <Popup 
                                modal
                                trigger={
                                
                                    <button type="button" className="share-button">
                                        Share
                                    </button>                           
                                }
                            >
                                {close => (
                                    <div>
                                        <button
                                        type="button"
                                    className="close-popup"
                                    onClick={() => close()}
                                        >
                                        <TiDelete/>
                                        </button>
                                        <div>
                                            <ShareGmail Sharedetails={each} area='state'/>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                            {each.state === "Total" || each.state === "State Unassigned" ? (null):(<Link to={`/district/${each.state}`} className='link-style'  >View DistrictDetails</Link>)}
                            </div>
                        </div>
                    </li>
    
                    )
                })

                }
                </ul>
                {onsearchState === true && searchStateResults.length === 0 && <h1>No Data Found</h1>}
           </div>
         
           
        )
    }
}

export default StateDetails