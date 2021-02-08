import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { Button, ButtonGroup } from '@material-ui/core';

import { buildChart1 } from '../../Actions/middleware';
import { fetchDataLoading } from '../../Actions';

const timeUnit = (unit) => {
    switch (unit) {
        case 'MINUTES': return 60;
        case 'HOURS': return 3600;
        default: return 1;
    }
}


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
        
        this.renderChart(this.chartRef, rawData, 'MINUTES');
    }

    renderChart(chartRef, rawData, unit) {
        try {

            const myChartRef = chartRef.current.getContext("2d");
            const timeUnitNumber = timeUnit(unit);
            
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
                            label: unit,
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
                <ButtonGroup 
                    style={{ display: 'flex', justifyContent: 'center'}} 
                    size="large"
                    aria-label="large outlined primary button group">
                    <Button 
                        onClick={() => this.renderChart(this.chartRef, this.props.chartData.data, 'MINUTES')}
                    >
                        Minutes
                    </Button>
                    <Button 
                        onClick={() => this.renderChart(this.chartRef, this.props.chartData.data, 'HOURS')}
                    >
                        Hours
                    </Button>
                </ButtonGroup>
                
                <canvas id="MyChart" ref={this.chartRef} />
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