import React from 'react';

import ToolBar from './ToolBar';
import { Card } from './Card';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          id: 1,
          source: "Alexis",
          counterparty: "Lampiris",
          amount: 52.39,
          currency: '€'
        },
        {
          id: 2,
          source: "Alexis",
          counterparty: "SWDE",
          amount: 12.46,
          currency: "€"
        },
        {
          id: 3,
          source: "Alexis",
          counterparty: "Loyer",
          amount: 695,
          currency: "€"
        },
        {
          id: 4,
          source: "Alexis",
          counterparty: "Scarlet",
          amount: 39,
          currency: "€"
        },
        {
          id: 5,
          source: "Alexis",
          counterparty: "Annabelle",
          amount: 3600.43,
          currency: "€",
          communication: "Visa"
        }
      ]
    };
  }

  render() {
    return (
      <div className="row">
        <ToolBar/>

        <div className="col-md-12">
          {/** Content Tab **/}
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="open">
              <div className="row">
                { this.state.cards.map((card) =>
                    <div key={card.id} className="col-md-3">
                      <Card {...card}/>
                    </div>
                ) }

              </div>
            </div>

            {/* Other panels*/}
            <div role="tabpanel" className="tab-pane" id="planned">
              <p>Nothing yet</p>
            </div>

            <div role="tabpanel" className="tab-pane" id="paid">
              <p className="alert alert-info"><strong>Hey!</strong> you've got no card "PAID"</p>

            </div>

            <div role="tabpanel" className="tab-pane" id="closed">
              <p>Nothing yet</p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
