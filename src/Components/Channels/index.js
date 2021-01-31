import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {XYPlot, LineSeries, HorizontalBarSeries, XAxis, YAxis, Hint } from 'react-vis';

import { fetchDataLoading } from '../../Actions';
import { buildChart4 } from '../../Actions/middleware';

class ChannelChart extends Component {
    constructor (props) {
        super(props);
        this.renderBarChart = this.renderBarChart.bind(this);
    }

    componentDidMount () {
        this.props.fetchDataLoading(true);
        this.props.buildChart4();
        this.props.fetchDataLoading(false);
    }

    renderBarChart () {
        const { chartData: { data: chartData } } = this.props;
        let data = [];
        for(let item in chartData) {  
            data.push({ y: item, x: chartData[item].count })
        }
        data.sort((a, b) => b.x -a.x);
        const splicedChartData = data.slice(0, 10);
        return splicedChartData;
    }

    render() {
        const barChartData = this.renderBarChart();
        return (
            <>
                <XYPlot
                    yType="ordinal"
                    // stackBy="x"
                    width={800}
                    height={300}
                    margin={{left: 200, right: 10, top: 10, bottom: 40}}
                    >
                    <XAxis title='Number of videos' />
                    <YAxis />
                    <HorizontalBarSeries
                        animation={{damping: 9, stiffness: 300}}
                        // cluster="2015"
                        // marginLeft={240}
                        color="#f0f0f0"
                        data={barChartData}
                    />
                </XYPlot>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemLoading: state.itemLoading,
        chartData: state.chartReducer.chart4
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchDataLoading,
        buildChart4
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(ChannelChart);