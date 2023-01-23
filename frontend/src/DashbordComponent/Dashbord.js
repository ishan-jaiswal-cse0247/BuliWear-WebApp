import './Dashbord.css';
function Dashbord() {
  const sesname = sessionStorage.getItem('usrname');
  console.log(sesname);

  if (sesname) {
    return (
      <div id="main1">
        <br />
        <h1>Dashbord</h1>
        <hr />
        <p>
          <h4>
            Hi' there <i>{sesname}</i>
            <br />
          </h4>
          <br />
          <br />
        </p>

        <p>
          <hr />
          <h6>Your Orders</h6>
          <br />
          <br />
          No Orders yet.....
          <br />
          <br />
        </p>
        <p>
          <hr />
          <h6>Wishlist Items</h6>
          <br />
          <br />
          Nothing in Wishlist....
          <br />
          <br />
        </p>
      </div>
    );
  } else {
    return (window.location.href = '/');
  }
}

export default Dashbord;
