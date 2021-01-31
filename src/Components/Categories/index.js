import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { buildChart2, buildChart3 } from '../../Actions/middleware';
import {fetchDataLoading } from '../../Actions';
import { XYPlot, ArcSeries, VerticalBarSeries, YAxis, XAxis } from 'react-vis';

const PI = 3.14;

class CategoryChart extends Component {
    constructor (props) {
        super(props);
        this.renderPieChart = this.renderPieChart.bind(this);
    }

    componentDidMount() {
        this.props.fetchDataLoading(true);
        this.props.buildChart2();
        this.props.fetchDataLoading(false);
    }

    renderPieChart () {
        const { chartData: { data: chartData} } = this.props;
        let arrayOfCategories = [];
        let cout = 0;
        for(let item in chartData) {
            arrayOfCategories.push({ x: item, y: Number(chartData[item]) })
        }
        arrayOfCategories.sort((a,b) => b.y - a.y);
        const topCategories = arrayOfCategories.slice(0, 10);
        // const totalTopVideos = topCategories.reduce((value, item) => value+item.number, 0);
        // let startAngle = 0
        // const pieChartData = topCategories.map(category => {
        //     const angle = (2*PI*category.number)/totalTopVideos;
        //     startAngle += angle; 
        //     const innerRadius = parseInt(Math.random()*100);
        //     const outerRadius = innerRadius + parseInt(Math.random()*100);
        //     return {
        //         angle0: startAngle,
        //         angle,
        //         radius0: 2,
        //         radius: 5,
        //         color: Math.random
        //     }
        // })
        // console.log(pieChartData)
        return topCategories;
    }

    render() {
        const categoryChartData = this.renderPieChart();
        console.log(categoryChartData)
        return (
            <>
                <XYPlot
                    yType="ordinal"
                    width={800}
                    height={400}
                >
                    <YAxis />
                    <XAxis />
                    <VerticalBarSeries 
                        className="vertical-bar-series-example"
                        data={categoryChartData}
                    />
                </XYPlot>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP : ',state)
    return {
        itemLoading: state.itemLoading,
        chartData: state.chartReducer.chart2,
        // chartLoaded: state.chartDataLoaded.chart1
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchDataLoading,
        buildChart2,
        buildChart3,
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CategoryChart);