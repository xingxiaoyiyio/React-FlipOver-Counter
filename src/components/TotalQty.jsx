import React, { Component } from 'react'
import './totalQty.less'
import FlipOverCounter from './flipOver/FlipOverCounter'
export class TotalQty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            min: 50,
            max: 0,
            time: 60000,
            len: 7
        }
    }

    componentDidMount() {
        const a = 100;
        const ths = this;
        ths.setState({
            max: ths.state.max + a
        })
        this.time1 = setInterval(function () {
            ths.setState({
                max: ths.state.max + a,
                min: ths.state.max
            })
        }, 60000)

    }

    render() {
        const { min, max, time, len } = this.state;
        return (
            <div className='totalQty'>
                <div className='box'>
                    <FlipOverCounter
                        min={min}
                        max={max}
                        time={time}
                        len={len}
                    />
                </div>

            </div>
        )
    }
}

export default TotalQty
