import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import '../../../components-styles/admin/HighchartStyles.css';

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
            text: 'Meetup'
        },
        categories: ['1', '2', '3', '4', '5']
    },
    series: [{
        data: [20, 10, 5, 15, 23, 27, 16, 17, 46, 32]
    }]
};

class Statistic extends Component {
    render() {
        return(
            <div className="container highchart-container">
                <ReactHighcharts config={config} />
            </div>
        );
    }
}

export default Statistic;