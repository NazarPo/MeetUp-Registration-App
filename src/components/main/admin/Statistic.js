import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import '../../../components-styles/admin/HighchartStyles.css';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetups: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:4000/meetups')
            .then(res => res.json())
            .then(res => this.setState({
                meetups: res
            }))
    }

    getTitlesOfAll = (meetups) => {
        return meetups.map((item) => {
            return item.title;
        })
    };

    getCountOfMeetupGuests = (meetups) => {
        return meetups.map((item) => {
            return item.guests.length;
        })
    };

    render() {
        const config = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            yAxis: {
                title: {
                    text: 'К-ть реєстрацій'
                }
            },
            xAxis: {
                title: {
                    text: 'Meetups'
                },
                categories: this.getTitlesOfAll(this.state.meetups)
            },
            series: [{
                data: [1]
            }]
        };
        return(
            <div className="container highchart-container">
                <ReactHighcharts config={config}  />
            </div>
        );
    }
}

export default Statistic;