import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';
import Chart from 'chart.js';

import { buildChart1 } from '../../Actions/middleware';
import { fetchDataLoading } from '../../Actions';
import { LineSeries, VerticalGridLines, HorizontalGridLines, XYPlot, XAxis, YAxis } from 'react-vis';

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    // (rv[x[key]] = (rv[x[key]] || 0) + x.duration)
    if (rv[x[key]] === undefined) {
        rv[x[key]] = 0;
    } else {
        rv[x[key]] += x.duration
    }
    return rv;
  }, {});
};

class DurationChart extends Component {
    constructor(props) {
        super(props);
        this.renderChart = this.renderChart.bind(this)
    }

    chartRef = React.createRef();

    componentDidMount () {
        this.props.fetchDataLoading(true);
        this.props.buildChart1();
        this.props.fetchDataLoading(false);
    }

    componentDidUpdate () {
        const { chartData: { data: rawData } } = this.props;
        
        
        this.renderChart(this.chartRef, rawData, 'HOURS');
        // new Chart(myChartRef, {
        //     type: "line",
        //     data: {
        //         //Bring in data
        //         labels,
        //         datasets: [
        //             {
        //                 label: "Minutes",
        //                 data
        //             }
        //         ]
        //     },
        //     options: {
        //         //Customize chart options
        //     }
        // });
    }

    renderChart(chartRef, rawData, timeUnit) {
        console.log('Function called')
        try {

            const myChartRef = chartRef.current.getContext("2d");
            const timeUnitNumber = timeUnit === 'MINUTES' ? 60 : 3600;
            
            let data = [], labels = [];
            let chartData = groupBy(rawData, 'date')
            for(let item in chartData) {
                const itemDate = new Date(item);
                labels.push(itemDate.getDate() + ' ' + itemDate.getFullMonth())
                data.push(parseInt(chartData[item]/timeUnitNumber));
            }
            data.reverse();
            labels.reverse();
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels,
                    datasets: [
                        {
                            label: "Minutes",
                            data
                        }
                    ]
                },
                options: {
                    //Customize chart options
                }
            });
        } catch (e) {
            console.log('Data not ready')
        }
    }
    
    render() {
        return (
            <>
                <button 
                    onClick={() => this.renderChart(this.chartRef, this.props.chartData.data, 'MINUTES')}
                >
                    Minutes
                </button>
                <button
                    onClick={() => this.renderChart(this.chartRef, this.props.chartData.data, 'HOURS')}
                >
                    Hours
                </button>
                {this.props.chartData.data.length !== 0 ? <canvas id="MyChart" ref={this.chartRef} /> : <p>Loading</p>}
            </>
        )
    }
}

// const DurationChart = ({ buildChart}) => {
//     buildChart();
//     // const dispatch = useDispatch();
//     // dispatch(buildChart1);
//     const chartData = useSelector(state => state.chartReducer.chart1)
//     console.log('Props of functional component', chartData)
// }

const mapStateToProps = (state) => {
    return {
        itemLoading: state.itemLoading,
        chartData: state.chartReducer.chart1,
        // chartLoaded: state.chartDataLoaded.chart1
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchDataLoading,
        buildChart1
    },
    dispatch
)


export default connect(mapStateToProps, mapDispatchToProps)(DurationChart);