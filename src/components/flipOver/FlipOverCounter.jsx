import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './flipOverCounter.less'

export class FlipOverCounter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            min: props.min,
            max: props.max,
            time: props.time,
            len: props.len,
            currentNums: this.zfill(props.min)
        }
        this.resetNo = this.resetNo.bind(this)
        this.run = this.run.bind(this)
    }

    componentDidMount() {
        this.resetNo()
    }

    //补0
    zfill(num) {
        var s = "000000000" + num;
        return s.toString().substr(s.length - this.props.len).split("");
    }

    //初始化数值填入
    resetNo() {
        const { min } = this.state;
        const currentNums = this.zfill(min)
        this.setState({ currentNums }, function () {
            this.run()
        })
    }

    //初始化执行
    run() {
        const { min, max, time, currentNums } = this.state;
        const difference = max - min;
        if (difference < 1) return;
        //每次要执行动画的时间
        let t = Math.round(time / difference);
        let speedTyp = 'normal'
        //执行速度class  定义了2种不同程度的速度控制样式
        if (t >= 300) {
            if (t > 1500) t = 1500;
            speedTyp = 'normal'
        } else {
            if (t < 100) t = 100;
            speedTyp = 'quick'
        }
        let newCount = min;
        //翻页
        function increase() {
            if (newCount === max || newCount > max) {
                clearInterval(this.timer1);
                return false;
            }
            //慢速一页页翻
            if (speedTyp === 'normal') {
                newCount++;
            } else {
                if (difference > 800 && t <= 200) {
                    t = 200;
                    //直接设置数字
                    newCount = newCount + Math.floor(difference / (time / 200))
                } else {
                    //快速翻
                    newCount = newCount + 2
                }
            }
            const newNums = this.zfill(newCount)
            this.setState({ speedTyp, currentNums: newNums })
        }
        //执行翻页
        if (this.timer1) clearInterval(this.timer1);
        this.timer1 = setInterval(increase.bind(this), t);
    }

    componentWillReceiveProps(props) {
        if (Object.keys(props)) {
            if (props.max !== this.state.max) {
                this.setState({
                    min: props.min>props.max ? max : props.min,
                    max: props.max,
                    time: props.time,
                    len: props.len
                }, function () {
                    this.resetNo()
                })
            }
        }
    }

    render() {
        const { len, currentNums } = this.state;
        const flipItems = currentNums.map((value, idx) => {
            let preIndx = value === "0" ? 9 : value * 1 - 1;
            return (
                <div key={idx} className='focount_box'>
                    <div className="focount_set" >
                        {Array.from({ length: 10 }, (key, j) => j.toString()).map((sval, sdx) => {
                            return (
                                <div key={sdx} className={value === sval ? 'active focount' : sval === preIndx.toString() ? 'previous focount' : 'focount'}>
                                    <div className="focount_top">
                                        <span className="focount_wrap">{sdx}</span>
                                    </div>
                                    <div className="shadow_top"></div>
                                    <div className="focount_bottom">
                                        <span className="focount_wrap">{sdx}</span>
                                    </div>
                                    <div className="shadow_bottom"></div>
                                </div>
                            )
                        })
                        }
                    </div>
                    {
                        (len - idx - 1) % 3 === 0 && (len - idx - 1) !== 0 ?
                            <div className='dotBox'>
                                <div className='dot'>
                                </div>
                            </div> : ''

                    }
                </div>)
        })
        return (
            <div className='flipOverCounter normal'>
                {flipItems}
            </div>
        )
    }
}

FlipOverCounter.propTypes = {
    min: PropTypes.number, //初始数值
    max: PropTypes.number, //最大数字
    time: PropTypes.number, //翻页总时长
    len: PropTypes.number //数字是几位数
}

FlipOverCounter.defaultProps = {
    min: 0,
    max: 0,
    time: 120000,
    len: 6
}


export default FlipOverCounter
