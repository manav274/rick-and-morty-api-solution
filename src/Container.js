import React from 'react';
import FiltersView from './FiltersView';
import ContentView from './ContentView';
import './index.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterList: [],
            info: {},
            url: 'https://rickandmortyapi.com/api/character/',
            filter: {
                species: [],
                gender: [],
                origin: []
            }
        };
        this.getCharacters(this.state.url);
    }

    filter(el) {
        let newState = JSON.parse(JSON.stringify(this.state));
        let currentFilter = newState.filter[el[0]];
        let pos = currentFilter.indexOf(el[1]);
        if (pos < 0) {
            currentFilter.push(el[1]);
        } else {
            currentFilter.splice(pos, 1);
        }
        this.setState(newState);
    }

    getCharacters(url) {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Unable to fetch characters. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    console.log(data);
                    let newState = JSON.parse(JSON.stringify(this.state));
                    newState.characterList = data.results;
                    newState.info = data.info;
                    this.setState(newState);
                });
            })
            .catch(err => {
                console.log('Fetch Error: +', err);
            });
    }

    closeFilter(el, index) {
        let newState = JSON.parse(JSON.stringify(this.state));
        let currentFilter = newState.filter;

        for (let item in currentFilter) {
            let pos = currentFilter[item].indexOf(el);
            if (pos !== -1) {
                currentFilter[item].splice(pos, 1);
                break;
            }
        }
        this.setState(newState);
    }

    render() {
        let list = this.state.characterList;
        let filter = [];

        if (list && list.length) {
            // apply species filters
            if (this.state.filter.species.length) {
                filter = this.state.filter.species;
                if (filter.includes('other')) {
                    list = this.state.characterList.filter(item => (item.species.toLowerCase() !== 'human' && item.species.toLowerCase() !== 'alien'));
                } else {
                    list = [];
                }
                filter.forEach(el => {
                    list = list.concat(this.state.characterList.filter(item => (item.species.toLowerCase() === el)));
                });
            }

            // apply gender filter
            if (this.state.filter.gender.length) {
                let tempList = list.slice();
                list = [];
                filter = this.state.filter.gender;
                filter.forEach(item => {
                    list = list.concat(tempList.filter(el => el.gender.toLowerCase() === item));
                });
            }

            // apply origin filter
            if (this.state.filter.origin.length) {
                let tempList = list.slice();
                list = [];
                filter = this.state.filter.origin;
                if (filter.includes('otherOrigin')) {
                    list = list.concat(tempList.filter(item => (item.origin.name.toLowerCase() !== 'unknown' && item.origin.name.toLowerCase() !== 'post-apocalyptic earth' && item.origin.name.toLowerCase() !== 'nuptia 4')));
                }
                filter.forEach(el => {
                    list = list.concat(tempList.filter(item => (item.origin.name.toLowerCase() === el)));
                });
            }


            return <div className="container-fluid">
                <div className="row">
                    <FiltersView filters={this.state.filter} filter={(el) => this.filter(el)} />
                    <ContentView getData={url => this.getCharacters(url)} info={this.state.info} list={list} filters={this.state.filter} closeFilter={(el, index) => this.closeFilter(el, index)} />
                </div><br />

                <footer className="text-center text-small">
                    <p>@ 2020 Publicis Sapient</p>
                </footer>
            </div>
        } else {
            return <h1>LOADING</h1>
        }
    };
}

export default Container;