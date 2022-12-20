import { Component} from "react";
import emailjs from 'emailjs-com';
import './index.css'

class ShareGmail extends Component{
    state = {}
     sendEmail(e) {
        e.preventDefault();    
    
        emailjs.sendForm('service_6pcdnoa', 'template_9cxjs7d', e.target, 'PRdRi-DJha6bwA-5z')
          .then((result) => {
              window.location.reload()  
          }, (error) => {
              console.log(error.text);
          });
      }
    render(){
        const {Sharedetails, area} = this.props
        // let active =''
        // let state=''
        // let confirmed=''
        // let deaths=''
        // let recovered=''
        if (area === 'state'){
             var {active,state,confirmed,deaths,recovered} = Sharedetails
        }else{
            var {stateName} = this.props
        }
        // console.log(area, "area")
        // console.log(Sharedetails)
        
        return(
            <form className='form-container' onSubmit={this.sendEmail}>
            {area === 'state' ? (<>
                <input type="hidden" name='active' value={active}/>
                <input type="hidden" name='state' value={state}/>
                <input type="hidden" name='confirmed' value={confirmed}/>
                <input type="hidden" name='deaths' value={deaths}/>
                <input type="hidden" name='recovered' value={recovered}/>
            </>):(
            <>
                <input type="hidden" name='active' value={Sharedetails[1].active}/>
                <input type="hidden" name='state' value={stateName}/>
                <input type="hidden" name='district' value={Sharedetails[0]}/>
                <input type="hidden" name='confirmed' value={Sharedetails[1].confirmed}/>
                <input type="hidden" name='deceased' value={Sharedetails[1].deceased}/>
                <input type="hidden" name='recovered' value={Sharedetails[1].recovered}/>
            </>)}
            
            <div className="input-container">
                <label className="input-label" htmlFor="name">Name:</label>
                <input type="text" name="name" id='name'  className="input-type"/>
            </div>
            <div className="input-container">
                <label className="input-label" htmlFor="user_email">User Gmail:</label>
                <input type="email" name="User_email" id='user_email' className="input-type"/>
            </div>
            <div className="input-container">
                <label className="input-label" htmlFor="subject">Subject:</label>
                <input type="text" name="subject" id='subject'className="input-type"/>
            </div>
            <div>
                <label className="input-label" htmlFor="html_message">Message</label>
                <textarea name="message" id='html_message' className="input-type"/>
            </div>
            <input type="submit" value="Send" className="submit-button" />
          </form>
        )
    }
}

export default ShareGmail