import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Radar } from 'react-chartjs-2';
import { ButtonGroup, Button } from '@material-ui/core';

import { buildChart2, buildChart3 } from '../../Actions/middleware';
import {fetchDataLoading } from '../../Actions';

class CategoryChart extends Component {
    constructor (props) {
        super(props);
        this.renderPieChart = this.renderPieChart.bind(this);
        this.state = {
            factor: 'COUNT'
        }
    }

    componentDidMount() {
        this.props.fetchDataLoading(true);
        this.props.buildChart2();
        this.props.fetchDataLoading(false);
    }

    renderPieChart () {
        const { chartData: { data: rawData} } = this.props;
        const factor = this.state.factor.toLowerCase()
        const arrayOfCategories = [];
        for(let item in rawData) {
            arrayOfCategories.push({ name: item, number: Number(rawData[item][factor]) })
        }
        arrayOfCategories.sort((a,b) => b.y - a.y);
        const topCategories = arrayOfCategories.slice(0, 10);
        const [labels, data] = [[], []]
        for(let category of topCategories) {
            labels.push(category.name);
            data.push(category.number);
        }

        const chartData = {
            labels,
            datasets: [{
                label: 'Category',
                data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }]
        }
        return chartData;
    }

    render() {
        const options = {
            scale: {
                ticks: { beginAtZero: true },
            },
        }
        const categoryChartData = this.renderPieChart();
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
               <Radar data={categoryChartData} options={options}/> 
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP : ',state)
    return {
        itemLoading: state.itemLoading,
        chartData: state.chartReducer.chart2
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