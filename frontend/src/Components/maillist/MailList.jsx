import "./MailList.css"

const MailList = () => {
 
  const handleClick = ()=> {
      alert('You have subscribed Successfully!')
  }
    return (
      <div className="mail">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sign up to receive exclusive deals and offers</span>
        <div className="mailInputContainer">
          <input type="text"  placeholder="Your Email" />
          <button onClick={handleClick}>Subscribe</button>
        </div>
      </div>
    )
  }

export default MailList
