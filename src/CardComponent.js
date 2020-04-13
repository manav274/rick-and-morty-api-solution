import React from 'react';

class CardComponent extends React.Component {
    render() {
        let cardData = this.props.list;
        return <div className="col-6 col-sm-6 col-md-3 px-0 bg-black">
            <div className="card bg-dark text-white card-set">
                <div className="card-header p-0">
                    <div className="card-image">
                        <img className="card-img-top" src={cardData.image}
                            alt={cardData.name} />
                    </div>
                    <div className="overlay-text px-2 text-truncate col-md-12">
                        <h4 className="text-white">{cardData.name}</h4>
                        <h6 className="text-secondary"><small>id: {cardData.id} - created 2 years ago</small></h6>
                    </div>
                </div>
                <div className="card-body small-fonts">
                    <div className="row">
                        <h6 className="col-md-4 pr-0 text-secondary"><small>STATUS</small></h6>
                        <h6 className="col-md-8 float-right orange-text pl-0"><small>{cardData.status}</small></h6>
                        <hr className="col-md-9 text-secondary hr-border mt-0 mb-2" />
                    </div>
                    <div className="row">
                        <h6 className="col-md-4 pr-0 text-secondary"><small>SPECIES</small></h6>
                        <h6 className="col-md-8 float-right orange-text pl-0"><small>{cardData.species}</small></h6>
                        <hr className="col-md-9 text-secondary hr-border mt-0 mb-2" />
                    </div>
                    <div className="row">
                        <h6 className="col-md-4 pr-0 text-secondary"><small>GENDER</small></h6>
                        <h6 className="col-md-8 float-right orange-text pl-0"><small>{cardData.gender}</small></h6>
                        <hr className="col-md-9 text-secondary hr-border mt-0 mb-2" />
                    </div>
                    <div className="row">
                        <h6 className="col-md-4 pr-0 text-secondary"><small>ORIGIN</small></h6>
                        <h6 className="col-md-8 float-right orange-text pl-0"><small>{cardData.origin.name}</small>
                        </h6>
                        <hr className="col-md-9 text-secondary hr-border mt-0 mb-2" />
                    </div>
                    <div className="row">
                        <h6 className="col-md-4 pr-0 text-secondary"><small>LAST LOCATION</small></h6>
                        <h6 className="col-md-8 float-right orange-text pl-0"><small>{cardData.location.name}</small>
                        </h6>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default CardComponent;