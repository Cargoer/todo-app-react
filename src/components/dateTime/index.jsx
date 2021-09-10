import React from 'react'
import style from './index.module.scss'
import classnames from 'classnames/bind'

const cls = classnames.bind(style);

export default class DateTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {datetime: new Date()}
    }
    componentDidMount() {
        console.log("componentDidMount worked!")
        this.dateTimer = setInterval(() => {
            this.setState({
                datetime: new Date()
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.dateTimer)
    }
    getDate() {
        var year = this.state.datetime.getFullYear()
        var month = this.state.datetime.getMonth()+1
        var day = this.state.datetime.getDate()
        return `${year}/${month}/${day}`
    }
    getTime() {
        var hour = this.state.datetime.getHours()
        var minute = this.state.datetime.getMinutes()
        minute = minute < 10? '0'+minute: minute
        return `${hour} : ${minute}`
    }
    render() {
        return (
            <div className={cls("datetime")}>
                <div className={cls("date")}>
                    {this.getDate()}
                </div>
                <div className={cls("time")}>
                    {this.getTime()}
                </div>
            </div>
        )
    }
}