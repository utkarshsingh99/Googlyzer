import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@material-ui/core';
import {XYPlot, LineSeries, HorizontalBarSeries, XAxis, YAxis, Hint } from 'react-vis';

import { fetchDataLoading } from '../../Actions';
import { buildChart4 } from '../../Actions/middleware';

class ChannelChart extends Component {
    constructor (props) {
        super(props);
        this.renderBarChart = this.renderBarChart.bind(this);
        this.state = {
            factor: 'COUNT'
        }
    }

    componentDidMount () {
        this.props.fetchDataLoading(true);
        this.props.buildChart4();
        this.props.fetchDataLoading(false);
    }

    renderBarChart () {
        const factor = this.state.factor.toLowerCase();
        const { chartData: { data: chartData } } = this.props;
        const data = [];
        for(let item in chartData) {
            data.push({ y: item, x: chartData[item][factor] })
        }
        data.sort((a, b) => b.x-a.x);
        const splicedChartData = data.slice(0, 10);
        return splicedChartData.reverse();
    }

    render() {
        const barChartData = this.renderBarChart();
        const XAxisTitle = this.state.factor === 'COUNT' ? 'Number of Videos' : 'Seconds Watched';
        console.log(XAxisTitle);
        return (
            <>
                <ButtonGroup 
                    style={{ display: 'flex', justifyContent: 'center'}} 
                    size="large"
                    aria-label="large outlined primary button group">
                    <Button onClick={() => this.setState({factor: 'COUNT'})}>
                        By Number
                    </Button>
                    <Button onClick={() => this.setState({factor: 'DURATION'})}>
                        By Duration
                    </Button>
                </ButtonGroup>
                <XYPlot
                    yType="ordinal"
                    // stackBy="x"
                    width={800}
                    height={300}
                    margin={{left: 200, right: 10, top: 10, bottom: 40}}
                    >
                    <XAxis title={XAxisTitle} />
                    <YAxis />
                    <HorizontalBarSeries
                        animation='gentle'
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