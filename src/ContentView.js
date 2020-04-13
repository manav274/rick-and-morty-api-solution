import React from 'react';
import CardComponent from './CardComponent';

class ContentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            holder: [],
            currentOrder: 'asc',
            search: false
        };
    }
    sortList(type) {
        this.setState({
            searchText: this.state.searchText,
            holder: this.state.holder,
            currentOrder: type
        });
    }
    searchField(e) {
        this.setState({
            searchText: e.target.value,
            holder: this.state.holder,
            currentOrder: this.state.currentOrder,
            search: false
        })
    }
    searchFunction() {
        let tempList = this.state.holder.filter(item => {
            return item.name.toLowerCase().includes(this.state.searchText.toLowerCase())
        });
        this.setState({
            searchText: this.state.searchText,
            holder: tempList,
            currentOrder: this.state.currentOrder,
            search: true
        });
    }
    keyPress(e) {
        if (e.charCode === 13) {
            this.searchFunction();
        }
    }

    render() {
        if (!this.state.search && this.props.list && this.props.list.length) {
            if (this.state.currentOrder === 'desc') {
                this.state.holder = this.props.list.sort((a, b) => (b.id - a.id));
            }
            else {
                this.state.holder = this.props.list.sort((a, b) => (a.id - b.id));
            }
        }
        const filterList = Object.values(this.props.filters).flat();
        // markup for filters selected
        const filtersMarkup = filterList.map((el, index) => {
            return <button type="button" className="btn btn-secondary mr-2 mb-2" key={index}>
                {el} <span className="badge badge-light" onClick={() => this.props.closeFilter(el, index)}>X</span>
            </button>
        });


        const cards = this.props.list.length ? this.state.holder.map((element, index) => <CardComponent key={index} list={element} />) : [<div className="col-md-12"><p className="text-center">Nothing to show</p></div>];
        return <div className="col-md-10">
            <h4 className="my-3">Selected Filters</h4>
            <div className="row">
                <div className="col-md-12">{filtersMarkup}</div>
            </div>
            <div className="row">
                <div className="col-md-10 col-sm-12 mb-3">
                    <div className="input-group">
                        <input type="text" className="form-control col-md-6" placeholder="Enter name" onChange={e => this.searchField(e)} onKeyPress={e => this.keyPress(e)} />
                        <div className="input-group-append">
                            <button className={`btn btn-secondary ${this.state.search ? "disabled" : ""}`} onClick={() => this.searchFunction()}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-12 mb-3">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle col-sm-12 text-left" type="button"
                            id="sortmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort by ID
                                </button>
                        <div className="dropdown-menu col-sm-12 text-left" aria-labelledby="sortmenu">
                            <button className="dropdown-item" type="button" onClick={() => this.sortList('asc')}>Ascending</button>
                            <button className="dropdown-item" type="button" onClick={() => this.sortList('desc')}>Descending</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- cards --> */}
            <div className="row">
                {cards}
            </div><br />
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${this.props.info.prev ? "" : "disabled"}`}>
                        <span className="page-link" onClick={() => this.props.getData(this.props.info.prev)}>Previous</span>
                    </li>
                    <li className={`page-item ${this.props.info.next ? "" : "disabled"}`}>
                        <span className="page-link" onClick={() => this.props.getData(this.props.info.next)}>Next</span>
                    </li>
                </ul>
            </nav><br />
        </div>;
    }
}

export default ContentView;