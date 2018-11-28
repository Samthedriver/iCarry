import React from 'react'
import PackageImage from '../package.jpeg'

class TransactionCard extends React.Component {

  render() {
    return (
      <div className="ui column">

        <div className="ui card" onClick={() => {this.props.handleClick(this.props.recipe)}}>
          <div className="content">
            <div className="Medium Header">
              <h1>Tracking Number</h1>
              <h3>{((this.props.transaction.id * 12345) + 54321)}</h3>
            </div>
          </div>
          <div className="image">
            <img alt={PackageImage} src={this.props.transaction.image} />
          </div>

          <div className="extra content">
            <span>
              <h3>Status</h3>
              <h4>{this.props.transaction.status}</h4>
            </span>

            <span>
              <p>
                {this.props.transaction.pickupLocal}
              </p>
            </span>
            <span>
              <p>
                {this.props.transaction.dropoffLocal}
              </p>
            </span>
          </div>
        </div>
      </div>
    );
  }

};

export default TransactionCard;
