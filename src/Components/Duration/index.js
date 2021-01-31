import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';

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
        this.renderChart = this.renderChart.bind(this);
    }

    componentDidMount () {
        this.props.fetchDataLoading(true);
        this.props.buildChart1();
        this.props.fetchDataLoading(false);
    }

    renderChart() {
        let data = []
        const { chartData: { data: rawData } } = this.props;
        let chartData = groupBy(rawData, 'date')
        for(let item in chartData) {
            const itemDate = new Date(item);
            data.push({x: itemDate, y: parseInt(chartData[item]/60)})
        }
        return data;
    }
    
    render() {
        const chartData = this.renderChart()
        return (
            <>
                <XYPlot
                    xType="time"
                    width={800}
                    height={300}
                    margin={{left: 70, right: 10, top: 10, bottom: 40}}
                >
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis/>
                    <YAxis title='Minutes'/>
                    <LineSeries 
                        animation
                        data={chartData}/>
                </XYPlot> 
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