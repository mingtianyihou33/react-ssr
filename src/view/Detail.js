import React, {useEffect, useState} from "react";
import {getUserDetail} from "../store/detail";
import {connect} from "react-redux";

function About(props) {
    useEffect(() => {
        console.log(props.detail)
        if (!props.detail || Object.keys(props.detail).length === 0) {
            props.getUserDetail()
        }
        console.log('Detail componentDidMount')
        return () => {
            console.log('Detail componentWillUnmount')
        }
    }, [])
    let liArr = []
    for (const key in props.detail) {
        liArr.push(<li key={key}>{key}：{props.detail[key]}</li>)
    }
    return (
        <div>
            <hr/>
            详情
            <ul>
                {liArr.length?liArr: <span style={{color: 'red'}}>数据请求失败</span>}
            </ul>
        </div>
    )
}

About.loadData = (store) => {
    return store.dispatch(getUserDetail())
}
export default connect(state => ({detail: state.detail}), {
    getUserDetail
})(About)
