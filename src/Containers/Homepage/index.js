import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { fetchDataLoading, fetchDataSuccess, fetchDataFailure } from '../../Actions';
import { buildChart1, buildChart2, buildChart3, buildChart4 } from '../../Actions/middleware';
import Header from '../../Components/Header/Header';
import Card1 from '../../Components/Cards/Card1/Card1';
import DurationChart from '../../Components/Duration';
import ChannelChart from '../../Components/Channels';
import CategoryChart from '../../Components/Categories';
class Homepage extends React.Component {
    constructor (props) {
        super(props);
        this.ChartCategoryByNumber = this.ChartCategoryByNumber.bind(this);
        this.ChartTimeByDay = this.ChartTimeByDay.bind(this);
        this.ChartCategoryByTime = this.ChartCategoryByTime.bind(this);
        this.ChartChannels = this.ChartChannels.bind(this);
    }
    
    ChartCategoryByNumber () { 
        this.props.fetchDataLoading(true);
        this.props.buildChart1();
        this.props.fetchDataLoading(false);
    }

    ChartTimeByDay () {
        this.props.fetchDataLoading(true);
        this.props.buildChart2();
        this.props.fetchDataLoading(false);
    }

    ChartCategoryByTime () {
        this.props.fetchDataLoading(true);
        this.props.buildChart3();
        this.props.fetchDataLoading(false);
    }

    ChartChannels () {
        this.props.fetchDataLoading(true);
        this.props.buildChart4();
        this.props.fetchDataLoading(false);
    }

    render() {
        const { itemLoading } = this.props
        if(itemLoading) {
            return <p> Loading......</p>
        }
        return (
            <div style={{width: '80%', margin: 'auto'}}>
                <Header/>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card1 
                            // onClick={this.ChartCategoryByNumber}
                        >
                            <h1>Top 10 Most Watched Channels</h1>
                            <ChannelChart />
                            {/* Start plotting data. Consider naming charts as simply category, tags, channel, etc. and grouping data accordingly (duration, number together) */}
                        </Card1>
                    </Grid>
                    <Grid item xs={12}>
                        <Card1>
                            <h1>How much YT do you consume every day?</h1>
                            <DurationChart />
                        </Card1>
                    </Grid>
                    <Grid item xs={12}>
                        <Card1>
                            <h1>A Chart of your 10 Most Watched Categories</h1>
                            {/* <CategoryChart /> */}
                        </Card1>
                    </Grid>
                    <Grid item xs={6}>
                        <Card1 onClick={this.ChartChannels}>
                            Graph 4
                        </Card1>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemReducer: [...state.itemReducer.items],
        itemLoading: state.itemLoading,
        itemLoadingError: state,
        // chartReducer: state.chartReducer
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchDataLoading,
        fetchDataSuccess,
        fetchDataFailure,
        buildChart1,
        buildChart2,
        buildChart3,
        buildChart4
    },
    dispatch
)

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);