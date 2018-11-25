import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchData, fetchDataLoading, fetchDataSuccess, fetchDataFailure} from '../../Actions';
import { rootURL } from '../../Constants';

class Homepage extends React.PureComponent {
    componentDidMount() {
        this.props.fetchData(rootURL)
    }
    render() {
        const { itemReducer,itemLoading } = this.props
        if(itemLoading) {
            return <p> Loading......</p>
        }
        return (
            <div>
                Test page
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MSTP : ',state.itemLoading)
    return {
        itemReducer: state.items,
        itemLoading: state.itemLoading,
        itemLoadingError: state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchData,
        fetchDataLoading,
        fetchDataFailure
    },
    dispatch
)

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);