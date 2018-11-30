import React from 'react'
import PackageImage from '../package.jpeg'

class ListingCard extends React.Component {

  render() {
    return (
      <div className="ui column">

        <div className="ui card" onClick={() => {this.props.handleClick(this.props.listing)}}>
          <div className="content">
            <div className="Medium Header">
              <h3>Tracking #{((this.props.listing.id * 12345) + 54321)}</h3>


            </div>
          </div>
          <div className="image">
            <img alt={PackageImage} src={this.props.listing.image} />
          </div>

          <div className="extra content">
            <span>
              <h3>Status</h3>
              <h4>{this.props.listing.status}</h4>
            </span>

            <span>
              <p>
                {this.props.listing.pickupLocal}
              </p>
            </span>
            <span>
              <p>
                {this.props.listing.dropoffLocal}
              </p>
            </span>
          </div>
        </div>
      </div>
    );
  }

};

export default ListingCard;
